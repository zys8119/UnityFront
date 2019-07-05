"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("../UnityFrontUtils/config");
var utils_1 = require("../UnityFrontUtils/utils");
var fs = require('fs');
var path = require('path');
var applicationController = /** @class */ (function () {
    function applicationController() {
    }
    /**
     * 设置header头
     * @param Headers
     */
    applicationController.prototype.setHeaders = function (Headers) {
        if (Headers === void 0) { Headers = {}; }
        this.$_RequestHeaders = Headers;
    };
    /**
     * 设置http 状态码
     * @param Status 状态码
     */
    applicationController.prototype.setRequestStatus = function (Status) {
        this.$_RequestStatus = Status;
    };
    /**
     * $mysql实例化
     * @constructor
     */
    applicationController.prototype.DB = function (optionsConfig, isEnd) {
        return this.$mysql(optionsConfig, isEnd);
    };
    /**
     * 渲染模板
     * @param TemplatePath 模板路径
     * @param TemplateData 模板数据
     * @constructor
     */
    applicationController.prototype.Render = function (TemplatePath, TemplateData) {
        var _this = this;
        TemplateData = TemplateData || {};
        var fileNameArr = this.__dir.replace(/^(.|\n).*application\\/img, "").split(path.sep);
        var filePath = path.resolve(config_1.ServerConfig.Template.pablicPath, fileNameArr[0], fileNameArr[2], this.$methodName + config_1.ServerConfig.Template.suffix);
        fs.readFile(filePath, 'utf8', function (err, data) {
            if (err) {
                _this.setHeaders({
                    'Content-Type': 'text/html; charset=utf-8',
                });
                fs.readFile(path.resolve(__dirname, "../UnityFrontUtils/Template/TemplateError.html"), 'utf8', function (terr, tdata) {
                    if (terr) {
                        _this.$_send("\n                            <title>\u670D\u52A1\u5668\u9519\u8BEF</title>\n                            <h1>\u670D\u52A1\u5668\uFF1A500</h1>\n                            <hr>\n                            <div>" + terr + "</div>\n                        ");
                        return;
                    }
                    ;
                    TemplateData = {
                        tpn: _this.$methodName + config_1.ServerConfig.Template.suffix,
                        ERROR: {
                            "控制器 -> ": _this.__dir,
                            "方法 -> ": _this.$methodName,
                            "error": "模板【" + filePath + "】不存在",
                        }
                    };
                    for (var k in TemplateData) {
                        var value = TemplateData[k];
                        if (typeof value != "string") {
                            value = "<pre>" + JSON.stringify(value, null, 4) + "</pre>";
                        }
                        tdata = tdata.replace(new RegExp("\\{\\{" + k + ".*\\}\\}", "g"), value);
                    }
                    _this.$_send(tdata);
                });
                return;
            }
            ;
            if (config_1.ServerConfig.Template.suffix == ".html") {
                _this.setHeaders({
                    'Content-Type': 'text/html; charset=utf-8',
                });
            }
            ;
            _this.$_send(utils_1.default.replaceUrlVars(config_1.ServerConfig, data));
        });
    };
    return applicationController;
}());
exports.default = applicationController;
