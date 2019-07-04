import "../typeStript"
import fsWatch from "./fsWatch"
import { ServerConfig } from "../config"
import Utils from "../utils"
module.exports =  (request,response)=>{
    //文件监听，可以自动刷新
    if(ServerConfig.fsWatch){
        try {
            new fsWatch();
        }catch (e) {};
    };
    //设置headers
    response.writeHead(200, ServerConfig.headers);
    //获取最新内容
    new Promise((resolve, reject) => {
        //对发送数据处理
        require('./send')(request,response).then(res=>{
            resolve(res);
        }).catch(err=>{
            resolve(err);
        });
    }).then(res=>{
        //发送数据
        response.end(JSON.stringify(res));
    })
};
