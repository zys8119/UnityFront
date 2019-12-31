"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("../config");
var encrypt_1 = require("../utils/encrypt");
var utils_1 = require("../utils");
var fs = require('fs');
var path = require('path');
var http = require('http');
var https = require('https');
var pug = require('pug');
var puppeteer = require('puppeteer');
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
    applicationController.prototype.$_puppeteer = function (url, jsContent) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                puppeteer.launch().then(function (browser) { return __awaiter(_this, void 0, void 0, function () {
                    var page, resultHandle, _a, _b, _c, result;
                    return __generator(this, function (_d) {
                        switch (_d.label) {
                            case 0: return [4 /*yield*/, browser.newPage()];
                            case 1:
                                page = _d.sent();
                                return [4 /*yield*/, page.goto(url)];
                            case 2:
                                _d.sent();
                                _b = (_a = page).evaluateHandle;
                                _c = [function (js) { return js; }];
                                return [4 /*yield*/, page.evaluateHandle(jsContent)];
                            case 3: return [4 /*yield*/, _b.apply(_a, _c.concat([_d.sent()]))];
                            case 4:
                                resultHandle = _d.sent();
                                return [4 /*yield*/, resultHandle.jsonValue()];
                            case 5:
                                result = _d.sent();
                                return [4 /*yield*/, browser.close()];
                            case 6:
                                _d.sent();
                                resolve(result);
                                return [2 /*return*/];
                        }
                    });
                }); }).catch(function (err) {
                    reject(err.message);
                });
            }
            catch (err) {
                reject(err.message);
            }
        });
    };
    applicationController.prototype.$_getFileContent = function (fileUrl, callBcak, callBackEnd) {
        return new Promise(function (resolve, reject) {
            try {
                var resultChunk_1 = '';
                var httpObj = http;
                if (fileUrl.match(/^https/)) {
                    httpObj = https;
                }
                httpObj.get(fileUrl, function (res) {
                    res.on('data', function (chunk) {
                        resultChunk_1 += chunk;
                        if (callBcak) {
                            callBcak(chunk);
                        }
                        ;
                    });
                    res.on('end', function () {
                        if (callBackEnd) {
                            callBackEnd(resultChunk_1);
                        }
                        ;
                        resolve(resultChunk_1);
                    });
                    res.on('error', function (err) {
                        reject(err.message);
                    });
                }).on('error', function (err) {
                    reject(err.message);
                });
            }
            catch (err) {
                reject(err.message);
            }
        });
    };
    applicationController.prototype.$_fileStreamDownload = function (fileUrl, filename, download, callBcak) {
        var _this = this;
        switch (typeof filename) {
            case 'function':
                callBcak = filename;
                download = true;
                filename = null;
                break;
            case 'boolean':
                download = filename;
                filename = null;
                break;
            default:
                break;
        }
        switch (typeof download) {
            case 'function':
                callBcak = download;
                download = true;
                break;
            case 'boolean':
                break;
            default:
                download = true;
                break;
        }
        if (!filename) {
            try {
                var fileUrlArr = fileUrl.split("/");
                if (fileUrlArr.length > 0) {
                    filename = fileUrlArr[fileUrlArr.length - 1];
                }
            }
            catch (e) {
                ///
            }
        }
        filename = filename || ('fileStreamDownload_' + Date.now());
        if (download) {
            this.response.writeHead(200, {
                'Content-Disposition': 'attachment; filename=' + filename
            });
        }
        return new Promise(function (resolve, reject) {
            _this.$_getFileContent(fileUrl, function (chunk) {
                _this.response.write(chunk);
                if (callBcak) {
                    callBcak(chunk);
                }
                ;
            })
                .then(function (chunk) {
                resolve(chunk);
                _this.response.end();
            }).catch(function (err) {
                reject(err);
            });
        });
    };
    applicationController.prototype.$_encode = function (data, newKey) {
        newKey = newKey || config_1.ServerPublicConfig.createEncryptKey;
        try {
            return new encrypt_1.default(newKey).encode(data);
        }
        catch (e) {
            return false;
        }
    };
    applicationController.prototype.$_decode = function (str, newKey) {
        newKey = newKey || config_1.ServerPublicConfig.createEncryptKey;
        try {
            return new encrypt_1.default(newKey).decode(str);
        }
        catch (e) {
            return false;
        }
    };
    applicationController.prototype.$_createEncryptKey = function (keyDataArr, result) {
        result = result || '';
        var keyData = "0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
        keyDataArr = keyDataArr || keyData.split("");
        if (keyDataArr.length === 0) {
            return result;
        }
        var randomNo = utils_1.default.getRandomIntInclusive(0, keyDataArr.length - 1);
        result += keyDataArr[randomNo];
        keyDataArr.splice(randomNo, 1);
        return this.$_createEncryptKey(keyDataArr, result);
    };
    return applicationController;
}());
exports.default = applicationController;
