"use strict";
exports.__esModule = true;
var path = require('path');
var fs = require("fs");
exports["default"] = {
    /**
     * 获取目录所有文件
     * @param fileDirPath
     * @param callback
     */
    getJsonFiles: function (fileDirPath, callback) {
        var jsonFiles = [];
        function findJsonFile(filePath) {
            var files = fs.readdirSync(filePath);
            files.forEach(function (item, index) {
                try {
                    var fPath = path.join(filePath, item);
                    var stat = fs.statSync(fPath);
                    if (stat.isDirectory() === true) {
                        findJsonFile(fPath);
                    }
                    if (stat.isFile() === true) {
                        if (callback) {
                            callback(fPath);
                        }
                        ;
                        jsonFiles.push(fPath);
                    }
                }
                catch (e) { }
            });
        }
        findJsonFile(fileDirPath);
        return jsonFiles;
    },
    /**
     * 替换模板url变量
     * @param ServerConfig
     * @param data
     */
    replaceUrlVars: function (ServerConfig, data) {
        if (ServerConfig.Template.urlVars && typeof ServerConfig.Template.urlVars == "object") {
            for (var v in ServerConfig.Template.urlVars) {
                data = data.replace(new RegExp(v, "g"), ServerConfig.Template.urlVars[v]);
            }
        }
        return data;
    },
    /**
     * 渲染错误模板
     * @param filPath 错误模板路径
     * @param TemplateData 错误模板数据
     * @param $_send 发送方法
     * @constructor
     */
    RenderTemplateError: function (filePath, TemplateData) {
        var _this = this;
        this.setHeaders({
            'Content-Type': 'text/html; charset=utf-8'
        });
        fs.readFile(filePath, 'utf8', function (terr, tdata) {
            if (terr) {
                _this.$_send("\n                            <title>\u670D\u52A1\u5668\u9519\u8BEF</title>\n                            <h1>\u670D\u52A1\u5668\uFF1A500</h1>\n                            <hr>\n                            <div>" + terr + "</div>\n                        ");
                return;
            }
            ;
            for (var k in TemplateData) {
                var value = TemplateData[k];
                if (typeof value != "string") {
                    value = "<pre>" + JSON.stringify(value, null, 4) + "</pre>";
                }
                tdata = tdata.replace(new RegExp("\\{\\{" + k + ".*\\}\\}", "g"), value);
            }
            _this.$_send(tdata);
        });
    },
    /**
     * 注入控制器类公共的初始数据及方法,this上下文为当前控制器解析实体
     * @param ControllerInitData 控制器数据
     * @param ControllerClassObj 控制器实体
     * @param $methodName 当前执行的控制器方法名称
     * @param ServerConfig 服务配置
     * @param __dir 当前执行的控制器路径
     * @param bool 是否是其他控制器渲染
     * @constructor
     */
    ControllerInitData: function (ControllerInitData, ControllerClassObj, $methodName, ServerConfig, __dir, bool) {
        var _loop_1 = function (keyName) {
            switch (keyName) {
                case "$_send":
                    if (bool) {
                        ControllerClassObj.prototype[keyName] = ControllerInitData[keyName];
                        break;
                    }
                    ControllerClassObj.prototype[keyName] = function (data) {
                        var RequestData = "";
                        if (this.$_RequestHeaders && this.$_RequestHeaders['Content-Type'] && this.$_RequestHeaders['Content-Type'].indexOf("text/json") > -1) {
                            RequestData = JSON.stringify(data);
                        }
                        else {
                            RequestData = data;
                        }
                        ;
                        var headers = JSON.parse(JSON.stringify(ServerConfig.headers));
                        for (var k in this.$_RequestHeaders) {
                            headers[k] = this.$_RequestHeaders[k];
                        }
                        ;
                        var sendData = {
                            data: RequestData,
                            RequestStatus: this.$_RequestStatus || ServerConfig.RequestStatus,
                            headers: headers
                        };
                        ControllerInitData[keyName](sendData);
                    };
                    break;
                case "index":
                    break;
                default:
                    ControllerClassObj.prototype[keyName] = ControllerInitData[keyName];
                    break;
            }
        };
        for (var keyName in ControllerInitData) {
            _loop_1(keyName);
        }
        ;
        ControllerClassObj.prototype.__dir = __dir;
        ControllerClassObj.prototype.$methodName = $methodName;
    }
};
