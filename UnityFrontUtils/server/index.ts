import "../typeStript"
import {ServerConfig, TimingTaskQueue} from "../config"
const http = require("http");
const app = require('./app');
//定时任务
if(TimingTaskQueue && ServerConfig.TimingTaskQueue  && TimingTaskQueue.TaskQueue){
    setInterval(TimingTaskQueue.TaskQueue,TimingTaskQueue.TaskQueueTime);
}
//创建服务
http.createServer(app).listen({
    host: ServerConfig.host,
    port: ServerConfig.port,
});
console.log(`Server running at http://${ServerConfig.host || "localhost"}:${ServerConfig.port}/`);

