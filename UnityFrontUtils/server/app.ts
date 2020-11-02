import "../typeStript"
import fsWatch from "./fsWatch"
import { ServerConfig } from "../config"
module.exports =  (request,response)=>{
    //文件监听，可以自动刷新
    if(ServerConfig.fsWatch){
        try {
            new fsWatch();
        }catch (e) {};
    };
    //获取最新内容
    new Promise((resolve, reject) => {
        //对发送数据处理
        require('./send')(request,response).then((res)=>{
            resolve(res);
        }).catch(err=>{
            resolve(err);
        });
    }).then((res)=>{
        //设置headers
        response.writeHead(res.RequestStatus, res.headers);
        //发送数据
        response.end(res.data);
    })
};
