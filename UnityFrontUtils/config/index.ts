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
    ]
};
