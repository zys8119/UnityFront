"use strict";
exports.__esModule = true;
require("../typeStript");
var fsWatch_1 = require("./fsWatch");
var config_1 = require("../config");
module.exports = function (request, response) {
    //文件监听，可以自动刷新
    if (config_1.ServerConfig.fsWatch) {
        try {
            new fsWatch_1["default"]();
        }
        catch (e) { }
        ;
    }
    ;
    //获取最新内容
    new Promise(function (resolve, reject) {
        //对发送数据处理
        require('./send')(request, response).then(function (res) {
            resolve(res);
        })["catch"](function (err) {
            resolve(err);
        });
    }).then(function (res) {
        //设置headers,asdad
        response.writeHead(res.RequestStatus, res.headers);
        //发送数据
        response.end(res.data);
    });
};
