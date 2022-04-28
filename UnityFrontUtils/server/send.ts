const { parse } = require('url');
import bodyData from "./bodyData"
import UnityFrontController from "../controller/controller"
import { ServerConfig } from "../config"
import StatusCode from "../../conf/StatusCode"
import mysql from "../mysql"
import SqlModel from "../../model/SqlModel"
import Axios from "axios"
import Utils from "../utils"
module.exports = (request,response)=>{
    return new Promise((resolve, reject) => {
        //获取body数据
        new bodyData(request,response,(body,bodySource)=>{
            //初始化UnityFrontController控制器
            new UnityFrontController(request,response,{
                request,
                response,
                $_body:body,
                $_bodySource:bodySource,
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
                $mysql(optionsConfig?:object,isEnd?:boolean){
                    return new mysql(optionsConfig,isEnd, this);
                },
                $sqlModel:SqlModel,
                __dir:null,
                $_params:{},
                $methodName:null,
                StatusCode:StatusCode,
                $_axios:Axios,
                $_cookies:Utils.getCookies(request),
            });
        });
    })
}
