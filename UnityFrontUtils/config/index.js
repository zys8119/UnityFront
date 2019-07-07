"use strict";
exports.__esModule = true;
var index_1 = require("../../TaskQueue/index");
var path = require("path");
//数据库配置
exports.mysqlConfig = {
    createPool: {},
    options: {
        connectionLimit: 10,
        host: 'localhost',
        user: 'root',
        password: 'admin123',
        port: '3306',
        database: 'dome'
    }
};
//服务设置
exports.ServerConfig = {
    port: 3000,
    fsWatch: [
        //listen UnityFrontUtils directory
        { path: path.resolve(__dirname, "../"), type: "directory" },
        //listen application directory
        { path: path.resolve(__dirname, "../../application"), type: "directory" },
    ],
    RequestStatus: 200,
    headers: {
        'Content-Type': 'text/json; charset=utf-8',
        'Access-Control-Allow-Origin': "*",
        'Access-Control-Allow-Methods': 'GET'
    },
    Template: {
        viewsPath: path.resolve(__dirname, "../../views"),
        applicationPath: path.resolve(__dirname, "../../application"),
        TemplatePath: path.resolve(__dirname, "../Template"),
        TemplateErrorPath: path.resolve(__dirname, "../Template/TemplateError.html"),
        ErrorPathSource: path.resolve(__dirname, "../controller/applicationController.js"),
        suffix: ".html",
        urlVars: {
            "__STATIC__": "/public/static",
            "__PUBLIC__": "/public"
        }
    },
    TimingTaskQueue: true
};
//定时任务设置
exports.TimingTaskQueue = {
    TaskQueue: function () {
        if (Object.prototype.toString.call(index_1["default"]) == '[object Array]') {
            index_1["default"].forEach(function (TaskItem) {
                try {
                    if (typeof TaskItem == "function") {
                        new TaskItem();
                    }
                    ;
                }
                catch (e) { }
            });
        }
        ;
    },
    TaskQueueTime: 500,
    //日志保留时间，当前默认30天
    LogsRetainTime: 1000 * 60 * 60 * 24 * 30,
    isClearLogTime: true,
    //默认允许每天的凌晨的清除日志任务
    ClearLogAppointTime: function (DateObj) { return DateObj.setHours(0, 0, 0, 0); },
    //默认允许指定时间的上下范围20000毫秒
    ClearLogTimeFrame: 10000
};
