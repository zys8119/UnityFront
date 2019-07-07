"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../typeStript");
var config_1 = require("../config");
var http = require("http");
var app = require('./app');
//创建服务
http.createServer(app).listen({
    host: config_1.ServerConfig.host,
    port: config_1.ServerConfig.port,
});
console.log("Server running at http://" + (config_1.ServerConfig.host || "localhost") + ":" + config_1.ServerConfig.port + "/");
