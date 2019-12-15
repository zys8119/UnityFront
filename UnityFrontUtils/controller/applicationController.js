"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("../config");
var utils_1 = require("../utils");
var fs = require('fs');
var path = require('path');
var pug = require('pug');
var applicationController = /** @class */ (function () {
    function applicationController() {
    }
    applicationController.prototype.setHeaders = function (Headers) {
        if (Headers === void 0) { Headers = {}; }
        this.$_RequestHeaders = Headers;
    };
    applicationController.prototype.setRequestStatus = function (Status) {
        this.$_RequestStatus = Status;
    };
    applicationController.prototype.DB = function (optionsConfig, isEnd) {
        return this.$mysql(optionsConfig, isEnd);
    };
    applicationController.prototype.Render = function (TemplatePath, TemplateData, bool) {
        var _this = this;
        TemplateData = TemplateData || {};
        if (TemplatePath && typeof TemplatePath == "object") {
            TemplateData = TemplatePath;
            TemplatePath = null;
        }
        ;
        var $methodName = this.$methodName;
        //自定义控制器模板配置
        var $$ServerConfig = JSON.parse(JSON.stringify(config_1.ServerConfig));
        try {
            var $$AppServerConfig = require(path.resolve(config_1.ServerConfig.Template.applicationPath, this.$urlArrs[0], "conf/index"));
            if ($$AppServerConfig && $$AppServerConfig.default && typeof $$AppServerConfig.default == 'object' && $$AppServerConfig.default.Template && typeof $$AppServerConfig.default.Template == 'object') {
                Object.assign($$ServerConfig.Template, $$AppServerConfig.default.Template);
            }
        }
        catch (e) { }
        //默认其他控制器模板路径
        var publicFilePath = "";
        if (bool) {
            //UnityFront主模板渲染路径
            publicFilePath = path.resolve($$ServerConfig.Template.TemplatePath);
        }
        else {
            //其他模块控制器视图渲染路径
            if (this.$urlArrs.length >= 2) {
                publicFilePath = path.resolve($$ServerConfig.Template.viewsPath, this.$urlArrs[0], this.$urlArrs[1]);
            }
        }
        var filePath = path.resolve(publicFilePath, this.$methodName + $$ServerConfig.Template.suffix);
        //自定义模板渲染路径
        if (TemplatePath && TemplatePath.length > 0) {
            filePath = path.resolve($$ServerConfig.Template.viewsPath, TemplatePath + $$ServerConfig.Template.suffix);
            $methodName = utils_1.default.getUrlArrs(TemplatePath)[2];
        }
        this.setHeaders({
            'Content-Type': 'text/html; charset=utf-8',
        });
        if (!fs.existsSync(filePath)) {
            utils_1.default.RenderTemplateError.call(this, $$ServerConfig.Template.TemplateErrorPath, {
                title: "\u6A21\u677F\u3010" + ($methodName + $$ServerConfig.Template.suffix) + "\u3011\u4E0D\u5B58\u5728",
                error: {
                    "错误来源 -> ": $$ServerConfig.Template.ErrorPathSource,
                    "控制器 -> ": this.__dir,
                    "方法 -> ": this.$methodName,
                    "error": "模板【" + filePath + "】不存在",
                }
            });
            return;
        }
        fs.readFile(filePath, 'utf8', function (err, data) {
            if (err) {
                utils_1.default.RenderTemplateError.call(_this, $$ServerConfig.Template.TemplateErrorPath, {
                    title: "\u6A21\u677F\u3010" + ($methodName + $$ServerConfig.Template.suffix) + "\u3011\u4E0D\u5B58\u5728",
                    error: {
                        "错误来源 -> ": $$ServerConfig.Template.ErrorPathSource,
                        "控制器 -> ": _this.__dir,
                        "方法 -> ": _this.$methodName,
                        "error": "模板【" + filePath + "】不存在",
                    }
                });
                return;
            }
            ;
            switch ($$ServerConfig.Template.suffix) {
                //传统html模板渲染
                case ".html":
                    _this.$_send(utils_1.default.replaceUrlVars($$ServerConfig, data, TemplateData));
                    break;
                //pug模板渲染
                case ".pug":
                    _this.$_send(pug.render(utils_1.default.replaceUrlVars($$ServerConfig, data, TemplateData, 0), {
                        pretty: true,
                        filename: filePath,
                    }));
                    break;
                default:
                    break;
            }
        });
    };
    applicationController.prototype.UrlParse = function () {
        //todo 首页渲染
        var $$url = this.$_url;
        //自定义路由配置===start
        //应用路由配置
        try {
            var $appRouteConfig = require(path.resolve(config_1.ServerConfig.Template.applicationPath, "conf/route"));
            if ($appRouteConfig && $appRouteConfig.default && $appRouteConfig.default[this.$_url]) {
                $$url = $appRouteConfig.default[this.$_url];
            }
        }
        catch (e) { }
        var urlArrs = utils_1.default.getUrlArrs($$url);
        //控制器路由配置
        try {
            var $moduleRouteConfig = require(path.resolve(config_1.ServerConfig.Template.applicationPath, urlArrs[0], "conf/route"));
            if ($moduleRouteConfig && $moduleRouteConfig.default && $moduleRouteConfig.default[this.$_url]) {
                $$url = $moduleRouteConfig.default[this.$_url];
                try {
                    urlArrs = utils_1.default.getUrlArrs($$url);
                }
                catch (e) { }
            }
        }
        catch (e) { }
        //==================end
        if ($$url == "/") {
            this.Render(null, null, true);
        }
        else {
            //todo ========【其他路径】=======
            //todo 判断模块1
            var ModulePath = path.resolve(config_1.ServerConfig.Template.applicationPath, urlArrs[0]);
            if (!fs.existsSync(ModulePath)) {
                utils_1.default.RenderTemplateError.call(this, config_1.ServerConfig.Template.TemplateErrorPath, {
                    title: "\u6A21\u5757\u3010" + urlArrs[0] + "\u3011\u4E0D\u5B58\u5728",
                    error: {
                        "错误来源 -> ": config_1.ServerConfig.Template.ErrorPathSource,
                    }
                });
                return;
            }
            ;
            //todo 判断控制器2
            var ControllerPath = path.resolve(config_1.ServerConfig.Template.applicationPath, urlArrs[0], "Controller", urlArrs[1] + "Controller.js");
            if (!fs.existsSync(ControllerPath)) {
                utils_1.default.RenderTemplateError.call(this, config_1.ServerConfig.Template.TemplateErrorPath, {
                    title: "\u63A7\u5236\u5668\u3010" + urlArrs[1] + "\u3011\u4E0D\u5B58\u5728",
                    error: {
                        "错误来源 -> ": config_1.ServerConfig.Template.ErrorPathSource,
                        "模块 -> ": urlArrs[0],
                    }
                });
                return;
            }
            ;
            //todo 判断控制器类3
            //清除控制器缓存，以保证最新控制器
            delete require.cache[ControllerPath];
            var ControllerClass = require(ControllerPath);
            var ControllerClassName = urlArrs[1] + "Controller";
            if (Object.keys(ControllerClass).indexOf(ControllerClassName) == -1) {
                utils_1.default.RenderTemplateError.call(this, config_1.ServerConfig.Template.TemplateErrorPath, {
                    title: "\u63A7\u5236\u5668\u3010" + urlArrs[1] + "\u3011\u7C7B\u540D\u4E0E\u63A7\u5236\u5668\u540D\u79F0\u4E0D\u4E00\u81F4",
                    error: {
                        "错误来源 -> ": config_1.ServerConfig.Template.ErrorPathSource,
                        "模块 -> ": urlArrs[0],
                        "控制器 -> ": urlArrs[1],
                    }
                });
                return;
            }
            //todo 判断控制器类方法4
            var ControllerClassObj = ControllerClass[ControllerClassName];
            //注入控制器类公共的初始数据及方法
            utils_1.default.ControllerInitData.call(this, this, ControllerClassObj, urlArrs[2], config_1.ServerConfig, ControllerPath, true);
            //扩展公共数据及方法
            ControllerClassObj.prototype.$urlArrs = urlArrs;
            //自定义配置文件===start
            var $ControllerConfig = {};
            //应用配置
            try {
                $ControllerConfig = require(path.resolve(config_1.ServerConfig.Template.applicationPath, "conf/index")).default || {};
            }
            catch (e) { }
            //控制器配置
            try {
                var $ControllerModuleConfig = require(path.resolve(config_1.ServerConfig.Template.applicationPath, urlArrs[0], "conf/index")).default || {};
                for (var ck in $ControllerModuleConfig) {
                    $ControllerConfig[ck] = $ControllerModuleConfig[ck];
                }
            }
            catch (e) { }
            ControllerClassObj.prototype.$ControllerConfig = $ControllerConfig;
            //=================end
            //实例化控制器
            var ControllerClassInit = new ControllerClassObj();
            //判断控制器方法是否存在
            if (!ControllerClassInit[urlArrs[2]]) {
                utils_1.default.RenderTemplateError.call(this, config_1.ServerConfig.Template.TemplateErrorPath, {
                    title: "\u63A7\u5236\u5668\u65B9\u6CD5\u3010" + urlArrs[2] + "\u3011\u4E0D\u5B58\u5728",
                    error: {
                        "错误来源 -> ": config_1.ServerConfig.Template.ErrorPathSource,
                        "模块 -> ": urlArrs[0],
                        "控制器 -> ": ControllerClassName,
                    }
                });
                return;
            }
            ;
            //判断控制器方法是否存在
            if (typeof ControllerClassInit[urlArrs[2]] != "function") {
                utils_1.default.RenderTemplateError.call(this, config_1.ServerConfig.Template.TemplateErrorPath, {
                    title: "\u63A7\u5236\u5668\u65B9\u6CD5\u3010" + urlArrs[1] + "\u3011\u4E0D\u662F\u4E00\u4E2A\u51FD\u6570",
                    error: {
                        "错误来源 -> ": config_1.ServerConfig.Template.ErrorPathSource,
                        "模块 -> ": urlArrs[0],
                        "控制器 -> ": ControllerClassName,
                    }
                });
                return;
            }
            ;
            //todo 执行控制器方法5
            ControllerClassInit[urlArrs[2]]();
        }
    };
    applicationController.prototype.$_log = function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var logDirPath = path.resolve(__dirname, "../log");
        var getTime = new Date().getTime();
        // let logFileName = Utils.dateFormat(getTime,"YYYY-MM-DD")+".log";
        var logFileName = utils_1.default.dateFormat(getTime, "YYYY-MM-DD HH-mm-ss") + "__Time__" + getTime.toString() + ".log";
        var logPath = path.resolve(logDirPath, logFileName);
        //判断日志文件是否存在，不存在则创建，并写入
        if (!fs.existsSync(logPath)) {
            this.writeLogFile(args, logPath, "");
            return;
        }
        //存在直接写入
        fs.readFile(logPath, 'utf8', function (err, data) {
            if (err)
                throw err;
            _this.writeLogFile(args, logPath, data);
        });
    };
    applicationController.prototype.writeLogFile = function (args, logPath, oldData) {
        oldData = oldData || "";
        fs.writeFile(logPath, JSON.stringify({
            "【log_start】": "===================================================",
            "【log_message】": {
                "时间": utils_1.default.dateFormat(),
                "日志目录": logPath,
                "来源": {
                    "控制器目录": this.__dir,
                    "控制器方法": this.$methodName,
                },
                "日志数据": args
            },
            "【log_end】": "=====================================================",
        }, null, 4) + "\n\n\n" + oldData, "utf8", function (err) {
            if (err) {
                console.log("日志写入失败", err);
                return;
            }
            ;
        });
    };
    applicationController.prototype.$_success = function (msg, sendData, code) {
        var newSendData = {
            code: this.StatusCode.success.code,
            data: null,
            msg: this.StatusCode.success.msg
        };
        if (typeof msg == "string") {
            newSendData.msg = msg;
        }
        if (typeof msg != "string" && !sendData) {
            newSendData.data = msg;
        }
        if (sendData) {
            newSendData.data = sendData;
        }
        newSendData.code = code || newSendData.code;
        this.$_send(newSendData);
    };
    applicationController.prototype.$_error = function (msg, sendData, code) {
        if (msg === void 0) { msg = this.StatusCode.error.msg; }
        if (code === void 0) { code = this.StatusCode.error.code; }
        this.$_success(msg, sendData, code);
    };
    return applicationController;
}());
exports.default = applicationController;
