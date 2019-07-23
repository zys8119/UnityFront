"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var parse = require('url').parse;
var bodyData_1 = require("./bodyData");
var controller_1 = require("../controller/controller");
var config_1 = require("../config");
var StatusCode_1 = require("../../conf/StatusCode");
var mysql_1 = require("../mysql");
module.exports = function (request, response) {
    return new Promise(function (resolve, reject) {
        //获取body数据
        new bodyData_1.default(request, response, function (body) {
            //初始化UnityFrontController控制器
            new controller_1.default(request, response, {
                $_body: body,
                $_rawTrailers: request.rawTrailers,
                $_headers: request.headers,
                $_rawHeaders: request.rawHeaders,
                $_method: request.method,
                $_url: request.url,
                $_urlParse: parse(request.url, true),
                $_query: parse(request.url, true).query,
                $_send: function (sendData) {
                    resolve(sendData);
                },
                $_RequestStatus: config_1.ServerConfig.RequestStatus,
                $_RequestHeaders: config_1.ServerConfig.headers,
                $mysql: function (optionsConfig, isEnd) {
                    return new mysql_1.default(optionsConfig, isEnd);
                },
                __dir: null,
                $methodName: null,
                StatusCode: StatusCode_1.default
            });
        });
    });
};
