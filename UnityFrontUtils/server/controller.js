"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("../config");
var static_1 = require("../static");
var path = require("path");
var fs = require("fs");
var controller = /** @class */ (function () {
    /**
     * 控制器入口
     * @param request //请求
     * @param response //返回
     * @param ControllerInitData //控制器初始化数据
     */
    function controller(request, response, ControllerInitData) {
        switch (ControllerInitData.$_url) {
            case "/":
                var filePath = "../../application/Index/Controller/Index";
                var $methodName = "index";
                var Index = require(filePath);
                var _loop_1 = function (keyName) {
                    switch (keyName) {
                        case "$_send":
                            Index.Index.prototype[keyName] = function (data) {
                                var RequestData = "";
                                if (this.$_RequestHeaders && this.$_RequestHeaders['Content-Type'] && this.$_RequestHeaders['Content-Type'].indexOf("text/json") > -1) {
                                    RequestData = JSON.stringify(data);
                                }
                                else {
                                    RequestData = data;
                                }
                                ;
                                var headers = JSON.parse(JSON.stringify(config_1.ServerConfig.headers));
                                for (var k in this.$_RequestHeaders) {
                                    headers[k] = this.$_RequestHeaders[k];
                                }
                                ;
                                var sendData = {
                                    data: RequestData,
                                    RequestStatus: this.$_RequestStatus || config_1.ServerConfig.RequestStatus,
                                    headers: headers
                                };
                                ControllerInitData[keyName](sendData);
                            };
                            break;
                        default:
                            Index.Index.prototype[keyName] = ControllerInitData[keyName];
                            break;
                    }
                };
                for (var keyName in ControllerInitData) {
                    _loop_1(keyName);
                }
                ;
                Index.Index.prototype.__dir = path.resolve(__dirname, filePath);
                Index.Index.prototype.$methodName = $methodName;
                new Index.Index().index();
                break;
            case '/favicon.ico':
                break;
            default:
                //todo ====开放资源目录==start
                new static_1.default(ControllerInitData, function () {
                    //todo 其他路径处理
                    var urlArr = ControllerInitData.$_url.split("/").filter(function (e) { return e.length > 0; });
                    ControllerInitData.$_send("sdfsdf");
                });
                break;
        }
    }
    return controller;
}());
exports.default = controller;
