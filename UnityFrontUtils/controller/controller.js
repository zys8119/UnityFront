"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../config/index");
var index_2 = require("../static/index");
var index_3 = require("../utils/index");
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
                this.ControllerParamesInit(request, response, ControllerInitData);
                break;
            case '/favicon.ico':
                break;
            default:
                //todo ====开放资源目录==start
                new index_2.default(ControllerInitData, function () {
                    //todo 其他路径处理
                    _this.ControllerParamesInit(request, response, ControllerInitData);
                });
                break;
        }
    }
    /**
     * 控制器参数初始化
     * @param request //请求
     * @param response //返回
     * @param ControllerInitData //控制器初始化数据
     */
    controller.prototype.ControllerParamesInit = function (request, response, ControllerInitData) {
        var filePath = "./main";
        var $methodName = "index";
        var Main = require(filePath);
        index_3.default.ControllerInitData.call(this, ControllerInitData, Main.main, $methodName, index_1.ServerConfig, path.resolve(__dirname, filePath));
        new Main.main().index();
    };
    return controller;
}());
exports.default = controller;
