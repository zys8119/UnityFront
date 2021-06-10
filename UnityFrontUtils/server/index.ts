import "../typeStript"
import {ServerConfig, TimingTaskQueue, mysqlConfig} from "../config"
import webSocketServe from "../webSocket/serve"
import sqlModelAuto from "./sqlModelAuto"
import ServeInfo from "./ServeInfo"
const http = require("http");
const app = require('./app');
// sqlModelAuto
if(mysqlConfig.sqlModelAuto){
    new sqlModelAuto();
}
//定时任务
if(TimingTaskQueue && ServerConfig.TimingTaskQueue  && TimingTaskQueue.TaskQueue){
    setInterval(TimingTaskQueue.TaskQueue,TimingTaskQueue.TaskQueueTime);
}
//创建服务
http.createServer(app).listen({
    host: ServerConfig.host,
    port: ServerConfig.port,
});
// 服务信息
new ServeInfo().info();
// 创建Socket
if(ServerConfig.ws_port){
    new webSocketServe();
}

