import {ControllerInitDataOptions, mysqlOptionsOptions, SqlUtilsOptions, SuccessSendDataOptions, StatusCodeOptions } from "../typeStript"
import { headersType } from "../typeStript/Types";
import { ServerConfig } from "../config";
import { AxiosStatic } from "axios";
import Utils from "../utils";
const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');
const pug = require('pug');
const puppeteer = require('puppeteer');
export default class applicationController implements ControllerInitDataOptions {
    request?:any;
    response?:any;
    $_body?:any;
    $_rawTrailers:[];
    $_headers:headersType;
    $_rawHeaders:any;
    $_method:string;
    $_url:string;
    $_urlParse:any;
    $_query:any;
    $_send?(sendData:any):any;
    $_RequestStatus:number;
    $_RequestHeaders:headersType;
    $mysql?(optionsConfig?:object,isEnd?:boolean):SqlUtilsOptions;
    __dir:string;
    $methodName:string;
    $urlArrs:any[];
    $ControllerConfig:any;
    StatusCode:StatusCodeOptions;
    $_axios:AxiosStatic;
    setHeaders(Headers:headersType = {}){
        this.$_RequestHeaders = Headers;
    }
    setRequestStatus(Status:number){
        this.$_RequestStatus = Status;
    }
    DB(optionsConfig?:mysqlOptionsOptions,isEnd?:boolean){
        return this.$mysql(optionsConfig,isEnd);
    }
    Render(TemplatePath?:any,TemplateData?:object,bool?:boolean){
        TemplateData = TemplateData || {};
        if(TemplatePath && typeof TemplatePath == "object"){
            TemplateData = TemplatePath;
            TemplatePath = null;
        };
        let $methodName = this.$methodName;
        //自定义控制器模板配置
        let $$ServerConfig = JSON.parse(JSON.stringify(ServerConfig));
        try {
            let $$AppServerConfig = require(path.resolve(ServerConfig.Template.applicationPath,this.$urlArrs[0],"conf/index"));
            if($$AppServerConfig && $$AppServerConfig.default && typeof $$AppServerConfig.default == 'object' && $$AppServerConfig.default.Template && typeof $$AppServerConfig.default.Template == 'object'){
                (<any>Object).assign($$ServerConfig.Template,$$AppServerConfig.default.Template)
            }
        }catch (e) {}
        //默认其他控制器模板路径
        let publicFilePath = "";
        if(bool){
            //UnityFront主模板渲染路径
            publicFilePath = path.resolve($$ServerConfig.Template.TemplatePath);
        }else {
            //其他模块控制器视图渲染路径
            if(this.$urlArrs.length >= 2){
                publicFilePath = path.resolve($$ServerConfig.Template.viewsPath,this.$urlArrs[0],this.$urlArrs[1]);
            }
        }
        let filePath = path.resolve(publicFilePath,this.$methodName+$$ServerConfig.Template.suffix);
        //自定义模板渲染路径
        if(TemplatePath && TemplatePath.length > 0){
            filePath = path.resolve($$ServerConfig.Template.viewsPath,TemplatePath+$$ServerConfig.Template.suffix);
            $methodName = Utils.getUrlArrs(TemplatePath)[2];
        }

        this.setHeaders({
            'Content-Type': 'text/html; charset=utf-8',
        });
        if(!fs.existsSync(filePath)){
            Utils.RenderTemplateError.call(this,$$ServerConfig.Template.TemplateErrorPath,{
                title:`模板【${$methodName+$$ServerConfig.Template.suffix}】不存在`,
                error:{
                    "错误来源 -> ":$$ServerConfig.Template.ErrorPathSource,
                    "控制器 -> ":this.__dir,
                    "方法 -> ":this.$methodName,
                    "error":"模板【"+filePath+"】不存在",
                }
            });
            return;
        }
        fs.readFile(filePath,'utf8',(err,data)=> {
            if (err) {
                Utils.RenderTemplateError.call(this, $$ServerConfig.Template.TemplateErrorPath, {
                    title: `模板【${$methodName + $$ServerConfig.Template.suffix}】不存在`,
                    error: {
                        "错误来源 -> ": $$ServerConfig.Template.ErrorPathSource,
                        "控制器 -> ": this.__dir,
                        "方法 -> ": this.$methodName,
                        "error": "模板【" + filePath + "】不存在",
                    }
                });
                return;
            };
            switch ($$ServerConfig.Template.suffix) {
                //传统html模板渲染
                case ".html":
                    this.$_send(Utils.replaceUrlVars($$ServerConfig, data, TemplateData));
                    break;
                //pug模板渲染
                case ".pug":
                    this.$_send(pug.render(Utils.replaceUrlVars($$ServerConfig, data, TemplateData,0),{
                        pretty:true,
                        filename:filePath,
                    }));
                    break;
                default:
                    break;
            }
        });


    }
    UrlParse(){
        //todo 首页渲染
        let $$url = this.$_url;
        //自定义路由配置===start
        //应用路由配置
        try {
            let $appRouteConfig = require(path.resolve(ServerConfig.Template.applicationPath,"conf/route"));
            if($appRouteConfig && $appRouteConfig.default && $appRouteConfig.default[this.$_url]){
                $$url = $appRouteConfig.default[this.$_url];
            }
        }catch (e) {}
        let urlArrs = Utils.getUrlArrs($$url);
        //控制器路由配置
        try {
            let $moduleRouteConfig = require(path.resolve(ServerConfig.Template.applicationPath,urlArrs[0],"conf/route"));
            if($moduleRouteConfig && $moduleRouteConfig.default && $moduleRouteConfig.default[this.$_url]){
                $$url = $moduleRouteConfig.default[this.$_url];
                try {
                    urlArrs = Utils.getUrlArrs($$url);
                }catch (e) {}
            }
        }catch (e) {}
        //==================end
        if($$url == "/"){
            this.Render(null,null,true);
        }else {
            //todo ========【其他路径】=======

            //todo 判断模块1
            let ModulePath = path.resolve(ServerConfig.Template.applicationPath,urlArrs[0]);
            if(!fs.existsSync(ModulePath)){
                Utils.RenderTemplateError.call(this,ServerConfig.Template.TemplateErrorPath,{
                    title:`模块【${urlArrs[0]}】不存在`,
                    error:{
                        "错误来源 -> ":ServerConfig.Template.ErrorPathSource,
                    }
                });
                return;
            };

            //todo 判断控制器2
            let ControllerPath = path.resolve(ServerConfig.Template.applicationPath,urlArrs[0],"Controller",urlArrs[1]+"Controller.js");
            if(!fs.existsSync(ControllerPath)){
                Utils.RenderTemplateError.call(this,ServerConfig.Template.TemplateErrorPath,{
                    title:`控制器【${urlArrs[1]}】不存在`,
                    error:{
                        "错误来源 -> ":ServerConfig.Template.ErrorPathSource,
                        "模块 -> ":urlArrs[0],
                    }
                });
                return;
            };

            //todo 判断控制器类3
            //清除控制器缓存，以保证最新控制器
            delete require.cache[ControllerPath];
            let ControllerClass = require(ControllerPath);
            let ControllerClassName = urlArrs[1]+"Controller";
            if(Object.keys(ControllerClass).indexOf(ControllerClassName) == -1){
                Utils.RenderTemplateError.call(this,ServerConfig.Template.TemplateErrorPath,{
                    title:`控制器【${urlArrs[1]}】类名与控制器名称不一致`,
                    error:{
                        "错误来源 -> ":ServerConfig.Template.ErrorPathSource,
                        "模块 -> ":urlArrs[0],
                        "控制器 -> ":urlArrs[1],
                    }
                });
                return;
            }

            //todo 判断控制器类方法4
            let ControllerClassObj = ControllerClass[ControllerClassName];
            //注入控制器类公共的初始数据及方法
            Utils.ControllerInitData.call(this,this,ControllerClassObj,urlArrs[2],ServerConfig,ControllerPath,true);
            //扩展公共数据及方法
            ControllerClassObj.prototype.$urlArrs = urlArrs;
            //自定义配置文件===start
            let $ControllerConfig = {};
            //应用配置
            try {
                $ControllerConfig = require(path.resolve(ServerConfig.Template.applicationPath,"conf/index")).default || {};
            }catch (e) {}
            //控制器配置
            try {
                let $ControllerModuleConfig = require(path.resolve(ServerConfig.Template.applicationPath,urlArrs[0],"conf/index")).default || {};
                for (let ck in $ControllerModuleConfig) {
                    $ControllerConfig[ck] = $ControllerModuleConfig[ck];
                }
            }catch (e) {}
            ControllerClassObj.prototype.$ControllerConfig = $ControllerConfig;
            //=================end
            //实例化控制器
            let ControllerClassInit = new ControllerClassObj();
            //判断控制器方法是否存在
            if(!ControllerClassInit[urlArrs[2]]){
                Utils.RenderTemplateError.call(this,ServerConfig.Template.TemplateErrorPath,{
                    title:`控制器方法【${urlArrs[2]}】不存在`,
                    error:{
                        "错误来源 -> ":ServerConfig.Template.ErrorPathSource,
                        "模块 -> ":urlArrs[0],
                        "控制器 -> ":ControllerClassName,
                    }
                });
                return;
            };
            //判断控制器方法是否存在
            if(typeof ControllerClassInit[urlArrs[2]] != "function"){
                Utils.RenderTemplateError.call(this,ServerConfig.Template.TemplateErrorPath,{
                    title:`控制器方法【${urlArrs[1]}】不是一个函数`,
                    error:{
                        "错误来源 -> ":ServerConfig.Template.ErrorPathSource,
                        "模块 -> ":urlArrs[0],
                        "控制器 -> ":ControllerClassName,
                    }
                });
                return;
            };
            //todo 执行控制器方法5
            ControllerClassInit[urlArrs[2]]();
        }
    }
    $_log(...args){
        let logDirPath = path.resolve(__dirname,"../log");
        let getTime = new Date().getTime();
        // let logFileName = Utils.dateFormat(getTime,"YYYY-MM-DD")+".log";
        let logFileName = Utils.dateFormat(getTime,"YYYY-MM-DD HH-mm-ss")+"__Time__"+getTime.toString()+".log";
        let logPath = path.resolve(logDirPath,logFileName);
        //判断日志文件是否存在，不存在则创建，并写入
        if(!fs.existsSync(logPath)){
            this.writeLogFile(args,logPath,"");
            return;
        }
        //存在直接写入
        fs.readFile(logPath,'utf8',(err,data)=> {
            if (err) throw err;
            this.writeLogFile(args,logPath,data);
        });
    }
    writeLogFile(args,logPath:string,oldData?:string){
        oldData = oldData || "";
        fs.writeFile(logPath,JSON.stringify({
            "【log_start】":"===================================================",
            "【log_message】":{
                "时间":Utils.dateFormat(),
                "日志目录":logPath,
                "来源":{
                    "控制器目录":this.__dir,
                    "控制器方法":this.$methodName,
                },
                "日志数据":args
            },
            "【log_end】":"=====================================================",
        },null,4)+"\n\n\n"+oldData,"utf8",(err)=>{
            if (err) {
                console.log("日志写入失败",err);
                return;
            };
        });
    }
    $_success(msg?:any,sendData?:any,code?:number){
        let newSendData = <SuccessSendDataOptions>{
            code:this.StatusCode.success.code,
            data:null,
            msg:this.StatusCode.success.msg
        };
        if(typeof msg == "string"){
            newSendData.msg = msg;
        }
        if (typeof msg != "string" && !sendData){
            newSendData.data = msg;
        }
        if(sendData){
            newSendData.data = sendData;
        }
        newSendData.code = code || newSendData.code;
        this.$_send(newSendData);
    }
    $_error(msg:any = this.StatusCode.error.msg,sendData?:any,code:number = this.StatusCode.error.code){
        this.$_success(msg,sendData,code)
    }
    $_puppeteer(url:string,jsContent:any){
        return new Promise((resolve, reject) => {
            try {
                puppeteer.launch().then(async browser => {
                    const page = await browser.newPage();
                    await page.goto(url);
                    const resultHandle = await page.evaluateHandle(
                        js => js,
                        await page.evaluateHandle(jsContent)
                    );
                    const result = await resultHandle.jsonValue();
                    await browser.close();
                    resolve(result);
                }).catch(err=>{
                    reject(err.message)
                });
            }catch (err) {
                reject(err.message)
            }
        });
    }
    $_getFileContent(fileUrl:string,callBcak?:any,callBackEnd?:any){
        return new Promise((resolve, reject) => {
            try {
                let resultChunk = '';
                let httpObj = http;
                if(fileUrl.match(/^https/)){
                    httpObj = https;
                }
                httpObj.get(fileUrl,res=>{
                    res.on('data', (chunk) => {
                        resultChunk += chunk;
                        if(callBcak){callBcak(chunk)};
                    });
                    res.on('end', () => {
                        if(callBackEnd){callBackEnd(resultChunk)};
                        resolve(resultChunk);
                    });
                    res.on('error', err => {
                        reject(err.message);
                    });
                }).on('error', (err) => {
                    reject(err.message);
                });
            }catch (err) {
                reject(err.message);
            }
        });
    }
    $_fileStreamDownload(fileUrl:string,filename?:string,callBcak?:any){
        if(typeof  filename === 'function'){
            callBcak = filename;
            filename = null;
        }
        if(!filename){
            try {
                let fileUrlArr = fileUrl.split("/");
                if(fileUrlArr.length > 0){
                    filename = fileUrlArr[fileUrlArr.length -1];
                }
            }catch (e) {
                ///
            }
        }
        filename = filename || ('fileStreamDownload_'+Date.now());
        this.response.writeHead(200,{
            'Content-Disposition':'attachment; filename='+filename
        });
        return new Promise((resolve, reject) => {
            this.$_getFileContent(fileUrl,chunk=>{
                this.response.write(chunk);
                if(callBcak){ callBcak(chunk);};
            })
            .then(chunk=>{
                resolve(chunk);
                this.response.end();
            }).catch((err)=>{
                reject(err);
            });
        })
    }
}
