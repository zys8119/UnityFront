#!/usr/bin/env ts-node
import "../typeStript"
import "./env"
import {ServerConfig, TimingTaskQueue, mysqlConfig} from "../config"
import webSocketServe from "../webSocket/serve"
import sqlModelAuto from "./sqlModelAuto"
import ServeInfo from "./ServeInfo"
import http from "http"
import app from "./app"
import {defineConfigs} from "./binServe"
import packageJson from "../../package.json"
(async ()=>{
    // 运行命令后交互
    if(await defineConfigs({
        "-v":{
            message:"获取当前版本号",
            process(args){
                this.a
                this.version
                this.create()
                // return this.
            }
        },
        version:{
            message:"获取当前版本号",
            process(args){
                console.log("version：", packageJson.version)
                return this.exit()
            }
        },
    }).create(process.argv.slice(2))){return}
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
})()


