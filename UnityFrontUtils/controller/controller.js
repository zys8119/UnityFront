"use strict";
exports.__esModule = true;
var index_1 = require("../config/index");
var index_2 = require("../static/index");
var path = require("path");
var controller = /** @class */ (function () {
    /**
     * 控制器入口
     * @param request //请求
     * @param response //返回
     * @param ControllerInitData //控制器初始化数据
     */
    function controller(request, response, ControllerInitData) {
        var _this = this;
        switch (ControllerInitData.$_url) {
            case "/":
                this.URLParsing(request, response, ControllerInitData);
                break;
            case '/favicon.ico':
                break;
            default:
                //todo ====开放资源目录==start
                new index_2["default"](ControllerInitData, function () {
                    //todo 其他路径处理
                    _this.URLParsing(request, response, ControllerInitData);
                });
                break;
        }
    }
    /**
     * url解析
     * @param request //请求
     * @param response //返回
     * @param ControllerInitData //控制器初始化数据
     */
    controller.prototype.URLParsing = function (request, response, ControllerInitData) {
        var filePath = "./main";
        var $methodName = "index";
        var Main = require(filePath);
        var _loop_1 = function (keyName) {
            switch (keyName) {
                case "$_send":
                    Main.main.prototype[keyName] = function (data) {
                        var RequestData = "";
                        if (this.$_RequestHeaders && this.$_RequestHeaders['Content-Type'] && this.$_RequestHeaders['Content-Type'].indexOf("text/json") > -1) {
                            RequestData = JSON.stringify(data);
                        }
                        else {
                            RequestData = data;
                        }
                        ;
                        var headers = JSON.parse(JSON.stringify(index_1.ServerConfig.headers));
                        for (var k in this.$_RequestHeaders) {
                            headers[k] = this.$_RequestHeaders[k];
                        }
                        ;
                        var sendData = {
                            data: RequestData,
                            RequestStatus: this.$_RequestStatus || index_1.ServerConfig.RequestStatus,
                            headers: headers
                        };
                        ControllerInitData[keyName](sendData);
                    };
                    break;
                default:
                    Main.main.prototype[keyName] = ControllerInitData[keyName];
                    break;
            }
        };
        for (var keyName in ControllerInitData) {
            _loop_1(keyName);
        }
        ;
        Main.main.prototype.__dir = path.resolve(__dirname, filePath);
        Main.main.prototype.$methodName = $methodName;
        new Main.main().index();
    };
    return controller;
}());
exports["default"] = controller;
