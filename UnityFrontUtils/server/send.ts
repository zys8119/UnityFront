const { parse } = require('url');
import bodyData from "./bodyData"
import UnityFrontController from "../controller/controller"
import { ServerConfig } from "../config"
import StatusCode from "../../conf/StatusCode"
import mysql from "../mysql"
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
                $_send:(sendData)=>{
                    resolve(sendData);
                },
                $_RequestStatus:ServerConfig.RequestStatus,
                $_RequestHeaders:ServerConfig.headers,
                $mysql:(optionsConfig?:object,isEnd?:boolean)=>{
                    return new mysql(optionsConfig,isEnd);
                },
                __dir:null,
                $methodName:null,
                StatusCode:StatusCode
            });
        });
    })
}
