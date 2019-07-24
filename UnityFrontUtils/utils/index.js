"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require('path');
var fs = require("fs");
exports.default = {
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
     * @param ServerConfig 服务配置
     * @param data 模板内容
     * @param TemplateData 模板苏剧
     * @param space 数据格式化缩进数量
     */
    replaceUrlVars: function (ServerConfig, data, TemplateData, space) {
        if (typeof space != "number") {
            space = space || 4;
        }
        if (ServerConfig.Template.urlVars && typeof ServerConfig.Template.urlVars == "object") {
            for (var v in ServerConfig.Template.urlVars) {
                data = data.replace(new RegExp(v, "g"), ServerConfig.Template.urlVars[v]);
            }
        }
        if (TemplateData && typeof TemplateData == "object") {
            for (var v in TemplateData) {
                var value = TemplateData[v];
                if (typeof value != 'string') {
                    value = JSON.stringify(value, null, space);
                }
                data = data.replace(new RegExp("\\{\\{\\$td\\." + v + "\\}\\}", "g"), value);
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
            'Content-Type': 'text/html; charset=utf-8',
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
    },
    /**
     * 路由数组转换
     * @param $$url 需要转换的url字符串
     */
    getUrlArrs: function ($$url) {
        var urlArrs = $$url.replace(/^\/{1}/, "").split("/");
        urlArrs[1] = urlArrs[1] || "Index";
        urlArrs[2] = urlArrs[2] || "index";
        try {
            urlArrs[2] = urlArrs[2].replace(/\/(.|\n)*$|\?(.|\n)*$|/img, "");
        }
        catch (e) { }
        return urlArrs;
    },
    /**
     * 时间格式转化
     * @param newDate 时间数据
     * @param Format 时间格式
     */
    dateFormat: function (newDate, Format) {
        newDate = newDate || new Date();
        Format = Format || "YYYY-MM-DD HH:mm:ss week sc";
        switch (Object.prototype.toString.call(newDate)) {
            case "[object Number]":
                var now = new Date();
                now.setTime(newDate);
                var nowTime = now.toLocaleString();
                var week = now.getDay(); //星期
                var hour = now.getHours(); //小时
                //判断星期几
                var weeks = ["日", "一", "二", "三", "四", "五", "六"];
                var getWeek = "星期" + weeks[week];
                var sc = void 0;
                //判断是AM or PM
                if (hour >= 0 && hour < 5) {
                    sc = '凌晨';
                }
                else if (hour > 5 && hour <= 7) {
                    sc = '早上';
                }
                else if (hour > 7 && hour <= 11) {
                    sc = '上午';
                }
                else if (hour > 11 && hour <= 13) {
                    sc = '中午';
                }
                else if (hour > 13 && hour <= 18) {
                    sc = '下午';
                }
                else if (hour > 18 && hour <= 23) {
                    sc = '晚上';
                }
                //"YYYY-MM-DD HH:mm:ss week sc"
                //{ nowTime: '2019-7-7 13:18:29', getWeek: '星期日', sc: '中午' }
                var nowTimeArr = nowTime
                    .replace(/\s/, "-")
                    .split("-")
                    .map(function (e) { return e.split(":").map(function (item) {
                    if (item.length == 1) {
                        return "0" + item;
                    }
                    return item;
                }); });
                Format = Format.replace(/week/g, getWeek);
                Format = Format.replace(/sc/g, sc);
                Format = Format.replace(/Y{4}/g, nowTimeArr[0].slice(0, 4));
                Format = Format.replace(/Y{3}/g, nowTimeArr[0].slice(0, 3));
                Format = Format.replace(/Y{2}/g, nowTimeArr[0].slice(0, 2));
                Format = Format.replace(/Y{1}/g, nowTimeArr[0].slice(0, 1));
                Format = Format.replace(/M{2}/g, nowTimeArr[1].slice(0, 2));
                Format = Format.replace(/M{1}/g, nowTimeArr[1].slice(0, 1));
                Format = Format.replace(/D{2}/g, nowTimeArr[2].slice(0, 2));
                Format = Format.replace(/D{1}/g, nowTimeArr[2].slice(0, 1));
                Format = Format.replace(/H{2}/g, nowTimeArr[3][0].slice(0, 2));
                Format = Format.replace(/H{1}/g, nowTimeArr[3][0].slice(0, 1));
                Format = Format.replace(/m{2}/g, nowTimeArr[3][1].slice(0, 2));
                Format = Format.replace(/m{1}/g, nowTimeArr[3][1].slice(0, 1));
                Format = Format.replace(/s{2}/g, nowTimeArr[3][2].slice(0, 2));
                Format = Format.replace(/s{1}/g, nowTimeArr[3][2].slice(0, 1));
                break;
            case "[object Date]":
                return this.dateFormat(newDate.getTime(), Format);
                break;
            case "[object String]":
                return this.dateFormat(new Date(newDate).getTime(), Format);
                break;
        }
        return Format;
    }
};
