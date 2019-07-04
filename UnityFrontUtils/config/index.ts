const path = require("path");
import {
    mysqlOptions,
    ServerOptions
} from "../typeStript";

//数据库配置
export const mysqlConfig = {
    options: <mysqlOptions> {
        host: 'localhost',
        user: 'root',
        password: 'admin123',
        port: '3306',
        database: 'test'
    }
};

//服务设置
export const ServerConfig =  <ServerOptions>{
    port:3000,
    fsWatch:[
        //listen UnityFrontUtils directory
        {path:path.resolve(__dirname,"../"),type:"directory"},
    ],
    headers:{
        'Content-Type': 'text/json; charset=utf-8',
        'Access-Control-Allow-Origin': "*",
        'Access-Control-Allow-Headers':'Content-type',
        'Access-Control-Max-Age':1728000,//预请求缓存20天
        'Access-Control-Allow-Methods':"GET, POST, OPTIONS, DELETE",
    }
};
