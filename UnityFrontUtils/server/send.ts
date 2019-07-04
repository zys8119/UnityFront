const { parse } = require('url');
import bodyData from "./bodyData"
import UnityFrontController from "./controller"
import { ControllerInitDataOptions } from "../typeStript"
module.exports = (request,response)=>{
    return new Promise((resolve, reject) => {
        //获取body数据
        new bodyData(request,response,body=>{
            //初始化UnityFrontController控制器
            new UnityFrontController(request,response,{
                $_body:body,
                $_rawTrailers:request.rawTrailers,
                $_headers:request.headers,
                $_rawHeaders:request.rawHeaders,
                $_method:request.method,
                $_url:request.url,
                $_urlParse:parse(request.url,true),
                $_query:parse(request.url,true).query,
                $_send:resolve
            });
        });
    })
}