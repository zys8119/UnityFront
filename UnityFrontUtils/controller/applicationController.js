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
     // * @param TemplatePath 模板路径
     // * @param TemplateData 模板数据
     * @param bool 是否为主控制器渲染
     * @constructor
     */
    applicationController.prototype.Render = function (bool) {
        var _this = this;
        //默认其他控制器模板路径
        var publicFilePath = "";
        if (bool) {
            //UnityFront主模板渲染路径
            publicFilePath = path.resolve(config_1.ServerConfig.Template.TemplatePath);
        }
        else {
            //其他模块控制器视图渲染路径
            if (this.$urlArrs.length >= 2) {
                publicFilePath = path.resolve(config_1.ServerConfig.Template.viewsPath, this.$urlArrs[0], this.$urlArrs[1]);
            }
        }
        var filePath = path.resolve(publicFilePath, this.$methodName + config_1.ServerConfig.Template.suffix);
        fs.readFile(filePath, 'utf8', function (err, data) {
            if (err) {
                utils_1["default"].RenderTemplateError.call(_this, config_1.ServerConfig.Template.TemplateErrorPath, {
                    title: "\u6A21\u677F\u3010" + (_this.$methodName + config_1.ServerConfig.Template.suffix) + "\u3011\u4E0D\u5B58\u5728",
                    error: {
                        "错误来源 -> ": config_1.ServerConfig.Template.ErrorPathSource,
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
    applicationController.prototype.UrlParse = function () {
        //todo 首页渲染
        if (this.$_url == "/") {
            this.Render(true);
        }
        else {
            //todo ========【其他路径】=======
            var $$url = this.$_url;
            //自定义路由配置===start
            //应用路由配置
            try {
                var $appRouteConfig = require(path.resolve(config_1.ServerConfig.Template.applicationPath, "conf/route"));
                if ($appRouteConfig && $appRouteConfig["default"] && $appRouteConfig["default"][this.$_url]) {
                    $$url = $appRouteConfig["default"][this.$_url];
                }
            }
            catch (e) { }
            var urlArrs = utils_1["default"].getUrlArrs($$url);
            //控制器路由配置
            try {
                var $moduleRouteConfig = require(path.resolve(config_1.ServerConfig.Template.applicationPath, urlArrs[0], "conf/route"));
                if ($moduleRouteConfig && $moduleRouteConfig["default"] && $moduleRouteConfig["default"][this.$_url]) {
                    $$url = $moduleRouteConfig["default"][this.$_url];
                    try {
                        urlArrs = utils_1["default"].getUrlArrs($$url);
                    }
                    catch (e) { }
                }
            }
            catch (e) { }
            //==================end
            //todo 判断模块1
            var ModulePath = path.resolve(config_1.ServerConfig.Template.applicationPath, urlArrs[0]);
            if (!fs.existsSync(ModulePath)) {
                utils_1["default"].RenderTemplateError.call(this, config_1.ServerConfig.Template.TemplateErrorPath, {
                    title: "\u6A21\u5757\u3010" + urlArrs[0] + "\u3011\u4E0D\u5B58\u5728",
                    error: {
                        "错误来源 -> ": config_1.ServerConfig.Template.ErrorPathSource
                    }
                });
                return;
            }
            ;
            //todo 判断控制器2
            var ControllerPath = path.resolve(config_1.ServerConfig.Template.applicationPath, urlArrs[0], "Controller", urlArrs[1] + "Controller.js");
            if (!fs.existsSync(ControllerPath)) {
                utils_1["default"].RenderTemplateError.call(this, config_1.ServerConfig.Template.TemplateErrorPath, {
                    title: "\u63A7\u5236\u5668\u3010" + urlArrs[1] + "\u3011\u4E0D\u5B58\u5728",
                    error: {
                        "错误来源 -> ": config_1.ServerConfig.Template.ErrorPathSource,
                        "模块 -> ": urlArrs[0]
                    }
                });
                return;
            }
            ;
            //todo 判断控制器类3
            //清除控制器缓存，以保证最新控制器
            require.cache[ControllerPath] = null;
            //获取最新控制器
            var ControllerClass = require(ControllerPath);
            var ControllerClassName = urlArrs[1] + "Controller";
            if (Object.keys(ControllerClass).indexOf(ControllerClassName) == -1) {
                utils_1["default"].RenderTemplateError.call(this, config_1.ServerConfig.Template.TemplateErrorPath, {
                    title: "\u63A7\u5236\u5668\u3010" + urlArrs[1] + "\u3011\u7C7B\u540D\u4E0E\u63A7\u5236\u5668\u540D\u79F0\u4E0D\u4E00\u81F4",
                    error: {
                        "错误来源 -> ": config_1.ServerConfig.Template.ErrorPathSource,
                        "模块 -> ": urlArrs[0],
                        "控制器 -> ": urlArrs[1]
                    }
                });
                return;
            }
            //todo 判断控制器类方法4
            //实例化控制器
            var ControllerClassObj = ControllerClass[ControllerClassName];
            //注入控制器类公共的初始数据及方法
            utils_1["default"].ControllerInitData.call(this, this, ControllerClassObj, urlArrs[2], config_1.ServerConfig, ControllerPath, true);
            //扩展公共数据及方法
            ControllerClassObj.prototype.$urlArrs = urlArrs;
            //自定义配置文件===start
            var $ControllerConfig = {};
            //应用配置
            try {
                $ControllerConfig = require(path.resolve(config_1.ServerConfig.Template.applicationPath, "conf/index"))["default"] || {};
            }
            catch (e) { }
            //控制器配置
            try {
                var $ControllerModuleConfig = require(path.resolve(config_1.ServerConfig.Template.applicationPath, urlArrs[0], "conf/index"))["default"] || {};
                for (var ck in $ControllerModuleConfig) {
                    $ControllerConfig[ck] = $ControllerModuleConfig[ck];
                }
            }
            catch (e) { }
            ControllerClassObj.prototype.$ControllerConfig = $ControllerConfig;
            //=================end
            var ControllerClassInit = new ControllerClassObj();
            //判断控制器方法是否存在
            if (!ControllerClassInit[urlArrs[2]]) {
                utils_1["default"].RenderTemplateError.call(this, config_1.ServerConfig.Template.TemplateErrorPath, {
                    title: "\u63A7\u5236\u5668\u65B9\u6CD5\u3010" + urlArrs[2] + "\u3011\u4E0D\u5B58\u5728",
                    error: {
                        "错误来源 -> ": config_1.ServerConfig.Template.ErrorPathSource,
                        "模块 -> ": urlArrs[0],
                        "控制器 -> ": ControllerClassName
                    }
                });
                return;
            }
            ;
            //判断控制器方法是否存在
            if (typeof ControllerClassInit[urlArrs[2]] != "function") {
                utils_1["default"].RenderTemplateError.call(this, config_1.ServerConfig.Template.TemplateErrorPath, {
                    title: "\u63A7\u5236\u5668\u65B9\u6CD5\u3010" + urlArrs[1] + "\u3011\u4E0D\u662F\u4E00\u4E2A\u51FD\u6570",
                    error: {
                        "错误来源 -> ": config_1.ServerConfig.Template.ErrorPathSource,
                        "模块 -> ": urlArrs[0],
                        "控制器 -> ": ControllerClassName
                    }
                });
                return;
            }
            ;
            //todo 执行控制器方法5
            ControllerClassInit[urlArrs[2]]();
        }
    };
    return applicationController;
}());
exports["default"] = applicationController;
