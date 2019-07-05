"use strict";
exports.__esModule = true;
var config_1 = require("../config");
var utils_1 = require("../utils");
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
        var filePath = path.resolve(this.__dir, "../../Template/", this.$methodName + config_1.ServerConfig.Template.suffix);
        fs.readFile(filePath, 'utf8', function (err, data) {
            if (err) {
                utils_1["default"].RenderTemplateError.call(_this, path.resolve(__dirname, "../Template/TemplateError.html"), {
                    title: "\u6A21\u677F\u3010" + (_this.$methodName + config_1.ServerConfig.Template.suffix) + "\u3011\u4E0D\u5B58\u5728",
                    error: {
                        "控制器 -> ": _this.__dir,
                        "方法 -> ": _this.$methodName,
                        "error": "模板【" + filePath + "】不存在"
                    }
                });
                return;
            }
            ;
            if (config_1.ServerConfig.Template.suffix == ".html") {
                _this.setHeaders({
                    'Content-Type': 'text/html; charset=utf-8'
                });
            }
            ;
            _this.$_send(utils_1["default"].replaceUrlVars(config_1.ServerConfig, data));
        });
    };
    return applicationController;
}());
exports["default"] = applicationController;
