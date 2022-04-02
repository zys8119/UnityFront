import "../typeStript"
import fsWatch from "./fsWatch"
import { ServerConfig } from "../config"
import { SendDataOptions } from "../typeStript";
const ncol = require("ncol")
export default  (request,response)=>{
    // 超时处理
    (request.setTimeout)(ServerConfig.timeout,()=>{
        ncol.color(function (){
            this
                .errorBG("请求超时")
                .error(request.url)
        })
    })
    //文件监听，可以自动刷新
    if(ServerConfig.fsWatch){
        try {
            new fsWatch();
        }catch (e) {};
    };
    //获取最新内容
    new Promise<SendDataOptions>((resolve, reject) => {
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
