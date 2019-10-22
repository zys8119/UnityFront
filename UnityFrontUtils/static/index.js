"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var config_1 = require("../config");
var utils_1 = require("../utils");
var path = require("path");
var fs = require("fs");
var staticIndex = /** @class */ (function () {
    function staticIndex(ControllerInitData, next) {
        this.ControllerInitData = ControllerInitData;
        if (ControllerInitData.$_url.indexOf("/public") == 0) {
            var filePath = path.resolve(__dirname, "../../", "./" + ControllerInitData.$_url);
            switch (path.parse(ControllerInitData.$_url).ext) {
                case ".css":
                    this.getFileData(filePath, "text/css;", "utf8");
                    break;
                case ".js":
                    this.getFileData(filePath, "application/javascript;", "utf8");
                    break;
                case ".png":
                    this.getFileData(filePath, "image/png;");
                    break;
                case ".jpg":
                    this.getFileData(filePath, "image/jpeg;");
                    break;
                case ".gif":
                    this.getFileData(filePath, "image/gif;");
                    break;
                case ".woff2":
                    this.getFileData(filePath, "font/woff2;");
                    break;
                case ".ico":
                    this.getFileData(filePath, "image/x-icon;");
                    break;
                case ".html":
                    this.getFileData(filePath, "text/html;", "utf8", ".html");
                    break;
                case ".htm":
                    this.getFileData(filePath, "text/html;", "utf8", ".htm");
                    break;
                default:
                    this.send404();
                    break;
            }
            return;
        }
        else {
            next();
        }
        ;
    }
    staticIndex.prototype.send404 = function () {
        this.ControllerInitData.$_send({
            data: "<h1>\u8D44\u6E90\u4E0D\u5B58\u5728\uFF1A404</h1>",
            RequestStatus: 404,
            headers: __assign(__assign({}, config_1.ServerConfig.headers), { 'Content-Type': 'text/html; charset=utf-8' })
        });
    };
    staticIndex.prototype.sendStatic = function (ContentType, data) {
        this.ControllerInitData.$_send({
            data: data,
            RequestStatus: config_1.ServerConfig.RequestStatus,
            headers: __assign(__assign({}, config_1.ServerConfig.headers), { 'Content-Type': ContentType + " charset=utf-8" })
        });
    };
    staticIndex.prototype.getFileData = function (filePath, ContentType, encoding, fileType) {
        var _this = this;
        fs.readFile(filePath, encoding, function (err, data) {
            if (err) {
                _this.send404();
                return;
            }
            switch (fileType) {
                case ".html":
                case ".htm":
                    data = utils_1["default"].replaceUrlVars(config_1.ServerConfig, data);
                    break;
            }
            ;
            _this.sendStatic(ContentType, data);
        });
    };
    return staticIndex;
}());
exports["default"] = staticIndex;
