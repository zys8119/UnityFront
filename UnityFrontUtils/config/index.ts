import TaskQueue from "../../TaskQueue/index"
const path = require("path");
import {
    mysqlOptions,
    ServerOptions,
    TimingTaskQueueOptions,
    ServerPublicConfigOptions
} from "../typeStript";

//数据库配置
export const mysqlConfig = <mysqlOptions>{
    createPool:{},
    options:{
        connectionLimit : 10,
        host: 'localhost',
        user: 'root',
        password: 'root',
        port: '3306',
        database: 'unity_front_utils_admin',
        prefix:""
    },
    sqlModelAuto:false,
};

//服务公共设置，可写入
export const ServerPublicConfig = <ServerPublicConfigOptions>{
    // 公共密钥,更换密钥可以使用控制器方法$_createEncryptKey获取随机密钥
    createEncryptKey:"0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM",
};

//服务设置
export const ServerConfig =  <ServerOptions>{
    port:81,
    ws_port:82,
    ws_user:{},
    timeout:0,
    debug:true,
    CORS:true,
    Credentials:false,
    fsWatch:[
        //listen conf directory
        {path:path.resolve(__dirname,"../../conf"),type:"directory"},
        //listen UnityFrontUtils directory
        {path:path.resolve(__dirname,"../"),type:"directory"},
        //listen application directory
        {path:path.resolve(__dirname,"../../application"),type:"directory"},
        //listen model directory
        {path:path.resolve(__dirname,"../../model"),type:"directory"},
    ],
    RequestStatus:200,
    headers:{
        'Content-Type': 'text/json; charset=utf-8',
        'Access-Control-Allow-Origin': "*",
        'Access-Control-Allow-Methods':'GET',
        // 'Access-Control-Allow-Headers':'content-type',
        // 'Access-Control-Max-Age':0,//预请求缓存20天
    },
    Template:{
        viewsPath:path.resolve(__dirname,"../../views"),
        applicationPath:path.resolve(__dirname,"../../application"),
        publicPath:path.resolve(__dirname,"../../public"),
        TemplatePath:path.resolve(__dirname,"../Template"),
        TemplateErrorPath:path.resolve(__dirname,"../Template/TemplateError.html"),
        ErrorPathSource:path.resolve(__dirname,"../controller/applicationController.js"),
        suffix:".html",
        urlVars:{
            "__STATIC__":"/public/static",
            "__PUBLIC__":"/public",
        }
    },
    TimingTaskQueue:true,
};

//定时任务设置
export const TimingTaskQueue = <TimingTaskQueueOptions>{
    TaskQueue:()=>{
        if(Object.prototype.toString.call(TaskQueue) == '[object Array]'){
            TaskQueue.forEach((TaskItem)=>{
                try {
                    if(typeof TaskItem == "function"){
                        new TaskItem();
                    };
                }catch (e) {}
            });
        };
    },
    TaskQueueTime:500,
    //日志保留时间，当前默认30天
    LogsRetainTime:1000*60*60*24*30,
    // LogsRetainTime:1000*10,
    isClearLogTime:false,
    //默认允许每天的凌晨的清除日志任务
    // ClearLogAppointTime:DateObj=>DateObj.getTime(),
    ClearLogAppointTime:DateObj=>DateObj.setHours(0,0,0,0),
    // ClearLogAppointTime:false,
    //默认允许指定时间的上下范围20000毫秒
    // ClearLogTimeFrame:0,
    ClearLogTimeFrame:20000,
}
