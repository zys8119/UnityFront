"use strict";
exports.__esModule = true;
require("../typeStript");
var config_1 = require("../config");
var http = require("http");
var app = require('./app');
//定时任务
if (config_1.TimingTaskQueue && config_1.TimingTaskQueue.TaskQueue) {
    setInterval(config_1.TimingTaskQueue.TaskQueue, config_1.TimingTaskQueue.TaskQueueTime);
}
//创建服务
http.createServer(app).listen({
    host: config_1.ServerConfig.host,
    port: config_1.ServerConfig.port
});
console.log("Server running at http://" + (config_1.ServerConfig.host || "localhost") + ":" + config_1.ServerConfig.port + "/");
