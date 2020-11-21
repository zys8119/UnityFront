import {
    ControllerInitDataOptions,
    mysqlOptionsOptions,
    SqlUtilsOptions,
    SuccessSendDataOptions,
    StatusCodeOptions,
    getSvgCodeOptions,
} from "../typeStript"
import { headersType } from "../typeStript/Types";
import { ServerConfig, ServerPublicConfig } from "../config";
import { AxiosStatic } from "axios";
import Encrypt from "../utils/encrypt";
import Utils from "../utils";
import PublicController from "../../conf/PublicController";
import { SqlModel } from "../../model/interfaces";
import { resolve } from "path";
import {readdirSync, statSync} from "fs";
const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');
const pug = require('pug');
const ncol = require('ncol');
const crypto = require('crypto');

/**
 * @请求方式修饰器类
 */
class methodClass_init {
    constructor(){}
    /**
     * method_init
     * @param methodName 方法名
     */
    method_init(methodName?:string){
        /**
         * @param currentControllerObj {any} 当前控制器对象
         * @param methodKeyName {string} 控制器方法
         * @param method {string|function} 请求方式
         * @param callback {function} 修饰器回调
         */
        return (currentControllerObj:any,methodKeyName:string,method?:string|Function,callback?:Function)=>{
            if(typeof currentControllerObj.prototype[methodKeyName] !== 'function'){
                console.error(new Error(`修饰器method${(methodName)?'_'+methodName:''} 控制器${methodKeyName}方法不存在`))
                return ;
            }
            callback = callback || new Function;
            method = method || "";
            if(typeof method === "function"){
                callback = method;
                method = "";
            }
            let methodArr = method.split("|").filter(e=>e.length !=0);
            if(methodName){
                methodArr.push(methodName);
            }
            let oldPostMethod = currentControllerObj.prototype[methodKeyName];
            if(callback.call(currentControllerObj,methodKeyName)){return;}
            currentControllerObj.prototype[methodKeyName] = function () {
                try {
                    let $_method = this.$_method.toLocaleLowerCase();
                    if($_method !== "options" && !methodArr.some(e=>e.toLocaleLowerCase() === $_method)){
                        this.$_error(`不予许${this.$_method}请求`);
                        this.$_error(`【当前请求为${$_method},必须为(${methodArr.join()})】-----url----->  ${this.$_url}`);
                        return;
                    }
                    oldPostMethod.call(this);
                }catch (e) {
                    this.$_error(e.message);
                }
            };
            return (t,k,d)=>{}
        }
    }
}

/**
 * @限制请求方式修饰器
 */
const methodClass_init_new = new methodClass_init();
export const method = methodClass_init_new.method_init();
export const method_get = methodClass_init_new.method_init('get');
export const method_post = methodClass_init_new.method_init('post');
export const method_put = methodClass_init_new.method_init('put');
export const method_patch = methodClass_init_new.method_init('patch');
export const method_delete = methodClass_init_new.method_init('delete');
export const method_copy = methodClass_init_new.method_init('copy');
export const method_head = methodClass_init_new.method_init('head');
export const method_options = methodClass_init_new.method_init('options');
export const method_link = methodClass_init_new.method_init('link');
export const method_unlink = methodClass_init_new.method_init('unlink');
export const method_purge = methodClass_init_new.method_init('purge');
export const method_lock = methodClass_init_new.method_init('lock');
export const method_unlock = methodClass_init_new.method_init('unlock');
export const method_propfind = methodClass_init_new.method_init('propfind');
export const method_view = methodClass_init_new.method_init('view');
export const method_update = methodClass_init_new.method_init('update');


export default class applicationControllerClass extends PublicController implements ControllerInitDataOptions {
    [key:string]:any;
    request?:any;
    response?:any;
    $_body?:any;
    $_bodySource?:any;
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
    $sqlModel?:SqlModel;
    __dir:string;
    $_params:any;
    $methodName:string;
    $urlArrs:any[];
    $ControllerConfig:any;
    StatusCode:StatusCodeOptions;
    $_axios:AxiosStatic;
    $_cookies:object|null;
    setHeaders(Headers:headersType = {}){
        this.$_RequestHeaders = (<any>Object).assign(JSON.parse(JSON.stringify(this.$_RequestHeaders)),Headers);
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

    UrlParams($$url,urlArrs,paramsKeyArr, isApp:boolean, $moduleRouteConfig:any,confPath){
        try {
            //应用路由配置
            if($moduleRouteConfig && $moduleRouteConfig.default){
                if($moduleRouteConfig.default[this.$_url]){
                    $$url = $moduleRouteConfig.default[this.$_url];
                    try {
                        urlArrs = Utils.getUrlArrs($$url);
                    }catch (e) {}
                }else {
                    let paramsMap = {};
                    Object.keys($moduleRouteConfig.default).forEach(e=>{
                        try {
                            paramsMap[(<any>e).match(/^.*?:/).toString().replace(/(\/|\/:)$/,"")] = ":"+e.replace(/^.*?:/,"")
                        }catch (e) {}
                    });
                    let paramsKey = "/"+urlArrs.slice(0,isApp?1:2).join("/");
                    let paramsStr = paramsMap[paramsKey];
                    let $_url_params = this.$_url.slice(paramsKey.length+1);
                    if(paramsStr){
                        if(this.$_url.indexOf(paramsKey) === 0){
                            let paramsUrl = $moduleRouteConfig.default[paramsKey+'/'+paramsStr];
                            if(paramsUrl && $_url_params){
                                if(ServerConfig.debug){
                                    ncol.color(()=>{
                                        ncol.successBG("【route】")
                                            .infoBG("【")
                                            .infoBG(this.$_url)
                                            .infoBG("--->")
                                            .infoBG(paramsUrl)
                                            .infoBG("】")
                                            .info(confPath)
                                    });
                                }
                                let paramsValueArr = $_url_params.split("/");
                                paramsStr.split("/").forEach((e,i)=>{
                                    let k = e.replace(/^:/,"");
                                    paramsKeyArr[k] = paramsValueArr[i];
                                });
                                $$url = paramsUrl;
                                try {
                                    urlArrs = Utils.getUrlArrs($$url);
                                }catch (e) {}
                            }
                        }
                    }
                }
            }
        }catch (e) {}
        return {
            $$url,
            urlArrs,
        }
    }

    UrlParse(){
        if(ServerConfig.debug){
            ncol.warn(`【${this.$_method}】==================================================================【START】`);
        }
        //todo 首页渲染
        let $$url = this.$_url;
        let urlArrs = Utils.getUrlArrs($$url);
        let paramsKeyArr = {};
        //todo 自定义路由配置===start
        //应用路由配置
        try {
            let confPath = path.resolve(ServerConfig.Template.applicationPath,"conf/route");
            let a_conf = this.UrlParams($$url,urlArrs,paramsKeyArr,true,require(confPath),confPath);
            $$url = a_conf.$$url;
            urlArrs = a_conf.urlArrs;
        }catch (e) {}
        //控制器路由配置
        try {
            let confPath = path.resolve(ServerConfig.Template.applicationPath,urlArrs[0],"conf/route");
            let c_conf = this.UrlParams($$url,urlArrs,paramsKeyArr,false,require(confPath),confPath);
            $$url = c_conf.$$url;
            urlArrs = c_conf.urlArrs;
        }catch (e) {}
        //todo ==================end
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
            // $urlParams
            ControllerClassObj.prototype.$_params = paramsKeyArr;

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

            // 拦截器处理
            if(ControllerClassInit.Interceptor &&
               typeof ControllerClassInit.Interceptor === 'function'){
                try {
                    ControllerClassInit.Interceptor().then(()=>{

                        if(this.$_method.toLocaleLowerCase() === 'options' && ServerConfig.CORS){
                            this.setHeaders({
                                "Access-Control-Allow-Headers":"*",
                            });
                            this.$_send(null);
                        }else {
                            if(ServerConfig.debug){
                                ncol.color(()=>{
                                    ncol.successBG("【请求】")
                                        .info(`【${this.$_method}】`)
                                        .log(`【${this.$_url}】`)
                                });
                            }
                            ControllerClassInit[urlArrs[2]]();
                        }
                    }).catch(err=>{
                        Utils.RenderTemplateError.call(this,ServerConfig.Template.TemplateErrorPath,{
                            title:`拦截器错误`,
                            error:{
                                "错误来源 -> ":ServerConfig.Template.ErrorPathSource,
                                "模块 -> ":urlArrs[0],
                                "控制器 -> ":ControllerClassName,
                                "方法 -> ":urlArrs[2],
                                "描述 -> ":err,
                            },
                            interceptorErr:err,
                        });
                    });
                }catch (e) {
                    Utils.RenderTemplateError.call(this,ServerConfig.Template.TemplateErrorPath,{
                        title:`拦截器错误`,
                        error:{
                            "错误来源 -> ":ServerConfig.Template.ErrorPathSource,
                            "模块 -> ":urlArrs[0],
                            "控制器 -> ":ControllerClassName,
                            "方法 -> ":urlArrs[2],
                            "描述 -> ":"拦截器注入方式错误，Interceptor 必须return一个Promise对象",
                        },
                        interceptorErr:e,
                    });
                }

            }else {
                ControllerClassInit[urlArrs[2]]();
            }
        }
    }

    $_createLog(args,logFileName){
        let logDirPath = path.resolve(__dirname,"../log");
        let getTime = new Date().getTime();
        logFileName = logFileName || Utils.dateFormat(getTime,"YYYY-MM-DD HH-mm-ss")+"__Time__"+getTime.toString()+".log";
        let logPath = path.resolve(logDirPath,logFileName);
        //判断日志文件是否存在，不存在则创建，并写入
        if(!fs.existsSync(logPath)){
            fs.mkdirSync(path.resolve(logPath,"../"));
            this.writeLogFile(args,logPath,"");
            return logPath;
        }
        //存在直接写入
        fs.readFile(logPath,'utf8',(err,data)=> {
            if (err) throw err;
            this.writeLogFile(args,logPath,data);
        });
        return logPath;
    }

    $_log(...args){
        this.$_createLog(args,"log");
    }

    writeLogFile(args,logPath:string,oldData?:string){
        oldData = oldData || "";
        let logData = {
            "时间":Utils.dateFormat(),
            "日志目录":logPath,
            "来源":{
                "控制器目录":this.__dir,
                "控制器方法":this.$methodName,
            },
            "日志数据":args
        };
        ncol.color( ()=> {
            ncol.infoBG("【LOG】").info(JSON.stringify(logData))
        });
        fs.writeFile(logPath,JSON.stringify({
            "【log_start】":"===================================================",
            "【log_message】":logData,
            "【log_end】":"=====================================================",
        },null,4)+"\n\n\n"+oldData,"utf8",(err)=>{
            if (err) {
                console.log("日志写入失败",err);
                return;
            };
        });
    }
    $_success(msg?:any,sendData?:any,code?:number, error?:boolean){
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
        if(Object.prototype.toString.call(code) === "[object Number]"){
            newSendData.code = code
        }else {
            newSendData.code = code || newSendData.code;
        }
        if(!error && ServerConfig.debug){
            ncol.color(()=>{
                ncol.successBG("【响应】")
                    .info(`【${this.$_method}】`)
                    .log(`【${this.$_url}】`)
                    .success(JSON.stringify(newSendData))
            });
        }
        this.$_send(newSendData);
    }
    $_error(msg:any = this.StatusCode.error.msg,sendData?:any,code:number = this.StatusCode.error.code){
        if(ServerConfig.debug){
            this.$_log({
                type:"响应",
                method:this.$_method,
                url:this.$_url,
                msg:msg,
            });
            ncol.color(()=>{
                ncol.errorBG("【响应】")
                    .info(`【${this.$_method}】`)
                    .error(`【${this.$_url}】`)
                    .errorBG(JSON.stringify(msg))
            });
            console.error(new Error(msg));
        }
        this.$_success(msg,sendData,code,true)
    }
    $_puppeteer(url:string,jsContent:any){
        // "puppeteer": "^2.0.0"
        const puppeteer = require('puppeteer');
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
    $_fileStreamDownload(fileUrl:string,filename?:any,download?:any, callBcak?:any){
        switch (typeof  filename) {
            case 'function':
                callBcak = filename;
                download = true;
                filename = null;
                break;
            case 'boolean':
                download = filename;
                filename = null;
                break;
            default:
                break;
        }
        switch (typeof  download) {
            case 'function':
                callBcak = download;
                download = true;
                break;
            case 'boolean':
                break;
            default:
                download = true;
                break;
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
        if(download){
            this.response.writeHead(200,{
                'Content-Disposition':'attachment; filename='+filename
            });
        }
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

    $_encode(data:any, newKey?:string){
        newKey = newKey || ServerPublicConfig.createEncryptKey;
        try {
            return new Encrypt(newKey).encode(data);
        }catch (e) {
            return false;
        }
    }

    $_decode(str:string, newKey?:string){
        newKey = newKey || ServerPublicConfig.createEncryptKey;
        try {
            return new Encrypt(newKey).decode(str);
        }catch (e) {
            return false;
        }
    }

    $_createEncryptKey(keyDataArr?:string[], result?:string){
        result = result || '';
        let keyData = "0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
        keyDataArr = keyDataArr || keyData.split("");
        if(keyDataArr.length === 0){
            return result;
        }
        let randomNo = Utils.getRandomIntInclusive(0,keyDataArr.length-1);
        result += keyDataArr[randomNo];
        keyDataArr.splice(randomNo,1);
        return this.$_createEncryptKey(keyDataArr, result);
    }

    $_getSvgCode(options?:getSvgCodeOptions){
        return new Promise((resolve, reject) => {
            options = options || {};
            let str = "0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
            let colorArr = [
                "#000000",	"#000033",	"#000066",	"#000099",	"#0000CC",   "#0000FF",
                "#003300",	"#003333",	"#003366",	"#003399",	"#0033CC",   "#0033FF",
                "#006600",	"#006633",	"#006666",	"#006699",	"#0066CC",   "#0066FF",
                "#009900",	"#009933",	"#009966",	"#009999",	"#0099CC",   "#0099FF",
                "#00CC00",	"#00CC33",	"#00CC66",	"#00CC99",	"#00CCCC",   "#00CCFF",
                "#00FF00",	"#00FF33",	"#00FF66",	"#00FF99",	"#00FFCC",   "#00FFFF",
                "#330000",	"#330033",	"#330066",	"#330099",	"#3300CC",   "#3300FF",
                "#333300",	"#333333",	"#333366",	"#333399",	"#3333CC",   "#3333FF",
                "#336600",	"#336633",	"#336666",	"#336699",	"#3366CC",   "#3366FF",
                "#339900",	"#339933",	"#339966",	"#339999",	"#3399CC",   "#3399FF",
                "#33CC00",	"#33CC33",	"#33CC66",	"#33CC99",	"#33CCCC",   "#33CCFF",
                "#33FF00",	"#33FF33",	"#33FF66",	"#33FF99",	"#33FFCC",   "#33FFFF",
                "#660000",	"#660033",	"#660066",	"#660099",	"#6600CC",   "#6600FF",
                "#663300",	"#663333",	"#663366",	"#663399",	"#6633CC",   "#6633FF",
                "#666600",	"#666633",	"#666666",	"#666699",	"#6666CC",   "#6666FF",
                "#669900",	"#669933",	"#669966",	"#669999",	"#6699CC",   "#6699FF",
                "#66CC00",	"#66CC33",	"#66CC66",	"#66CC99",	"#66CCCC",   "#66CCFF",
                "#66FF00",	"#66FF33",	"#66FF66",	"#66FF99",	"#66FFCC",   "#66FFFF",
                "#990000",	"#990033",	"#990066",	"#990099",	"#9900CC",   "#9900FF",
                "#993300",	"#993333",	"#993366",	"#993399",	"#9933CC",   "#9933FF",
                "#996600",	"#996633",	"#996666",	"#996699",	"#9966CC",   "#9966FF",
                "#999900",	"#999933",	"#999966",	"#999999",	"#9999CC",   "#9999FF",
                "#99CC00",	"#99CC33",	"#99CC66",	"#99CC99",	"#99CCCC",   "#99CCFF",
                "#99FF00",	"#99FF33",	"#99FF66",	"#99FF99",	"#99FFCC",   "#99FFFF",
                "#CC0000",	"#CC0033",	"#CC0066",	"#CC0099",	"#CC00CC",   "#CC00FF",
                "#CC3300",	"#CC3333",	"#CC3366",	"#CC3399",	"#CC33CC",   "#CC33FF",
                "#CC6600",	"#CC6633",	"#CC6666",	"#CC6699",	"#CC66CC",   "#CC66FF",
                "#CC9900",	"#CC9933",	"#CC9966",	"#CC9999",	"#CC99CC",   "#CC99FF",
                "#CCCC00",	"#CCCC33",	"#CCCC66",	"#CCCC99",	"#CCCCCC",   "#CCCCFF",
                "#CCFF00",	"#CCFF33",	"#CCFF66",	"#CCFF99",	"#CCFFCC",   "#CCFFFF",
                "#FF0000",	"#FF0033",	"#FF0066",	"#FF0099",	"#FF00CC",   "#FF00FF",
                "#FF3300",	"#FF3333",	"#FF3366",	"#FF3399",	"#FF33CC",   "#FF33FF",
                "#FF6600",	"#FF6633",	"#FF6666",	"#FF6699",	"#FF66CC",   "#FF66FF",
                "#FF9900",	"#FF9933",	"#FF9966",	"#FF9999",	"#FF99CC",   "#FF99FF",
                "#FFCC00",	"#FFCC33",	"#FFCC66",	"#FFCC99",	"#FFCCCC",   "#FFCCFF",
                "#FFFF00",	"#FFFF33",	"#FFFF66",	"#FFFF99",	"#FFFFCC",   "#FFFFFF",
            ];
            let strArr = [];
            let svgOptions = (<any>Object).assign(<getSvgCodeOptions>{
                fontSize:50,
                index:4,
                background:'rgb(178,200,255)',
                color:null,
            },options);
            for(let i = 0 ; i < svgOptions.index ; i ++){
                strArr.push(str[Utils.getRandomIntInclusive(0,str.length-1)])
            }
            resolve(strArr.join(""));
            let svgStr = "";
            strArr.forEach((text, index)=>{
                let color = colorArr[Utils.getRandomIntInclusive(0,colorArr.length-1)];
                let rotate = Utils.getRandomIntInclusive(0,45);
                if(svgOptions.color){
                    color = svgOptions.color;
                }
                svgStr += `<text x="${svgOptions.fontSize*index}" y="${svgOptions.fontSize}" width="${svgOptions.fontSize}" height="${svgOptions.fontSize}" style="fill:${color};font-size: ${svgOptions.fontSize}px;" rotate="${rotate}" >${text}</text>`;
            });
            let background = "";
            if(svgOptions.background){
                background = `
                <rect width="${svgOptions.fontSize * strArr.length}" height="${svgOptions.fontSize * 1.5}" style="fill:${svgOptions.background};" />
            `
            }
            let svg = `<?xml version="1.0" standalone="no"?>
            <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
            "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="${svgOptions.fontSize * strArr.length}" height="${svgOptions.fontSize*1.5}">
            ${background}
            ${svgStr}
            </svg>
            `;
            this.response.writeHead(200,{
                "Content-Type":"image/svg+xml"
            });
            this.response.write(svg);
            this.response.end();
        });
    }

    $_getUrlQueryData(options?:object, connectors?:string, type?:string){
        options = options || {};
        connectors = connectors || "=";
        type = type || ";";
        let result = [];
        for(let k in options){
            let resultItem = options[k];
            if(typeof  resultItem === 'object'){
                resultItem = JSON.stringify(resultItem)
            }
            result.push(`${k}${connectors}${resultItem}`)
        }
        return result.join(type);
    }

    $_setCookie(data?:object){
        this.setHeaders({
            'Set-Cookie':this.$_getUrlQueryData(data).split(";"),
        });
    }

    bufferSplit(buff,splitter){
        let buffTter = Buffer.from(splitter);
        let index = buff.indexOf(buffTter);
        let resUlt = [];
        if(index > -1){
            resUlt = resUlt.concat(buff.slice(0,index));
            let buffChild = buff.slice(index+buffTter.length);
            resUlt = resUlt.concat(this.bufferSplit(buffChild,splitter));
        }else {
            resUlt = resUlt.concat(buff)
        }
        return resUlt;
    }

    $_getRequestFormData(){
        return new Promise((resolve,reject) => {
            try {
                if(this.$_bodySource.length > 0){
                    let bodyFormData = this.bufferSplit(this.$_bodySource,"------").map(e=>{
                        let buffArr = this.bufferSplit(e,"\r\n\r\n");
                        if(buffArr.length === 2){
                            let resUlt:any = {};
                            let info:any = this.bufferSplit(buffArr[0],"\; ").map(e=>e.toString());
                            if(buffArr[0].indexOf(Buffer.from("Content-Type")) > -1){
                                // 文件
                                resUlt.type = "file";
                                // keyName
                                let split = Buffer.from("name=\"");
                                resUlt.keyName = info[1].slice(info[1].indexOf(split)+split.length,info[1].length-1);

                                let fileInfo = this.bufferSplit(info[2],"\r\n");

                                // fileType
                                try {
                                    resUlt.fileType = this.bufferSplit(fileInfo[1]," ")[1];
                                }catch (e) {}
                                // filename
                                let splitFileName = Buffer.from("filename=\"");
                                resUlt.fileName = fileInfo[0].slice(fileInfo[0].indexOf(splitFileName)+splitFileName.length,fileInfo[0].length - 1);
                                // fileBuff
                                resUlt.fileBuff = buffArr[1].slice(0,buffArr[1].length-Buffer.from("\r\n").length);
                            }else {
                                // 数据
                                resUlt.type = "data";
                                // keyName
                                let split = Buffer.from("name=\"");
                                resUlt.keyName = info[1].slice(info[1].indexOf(split)+split.length,info[1].length-1);
                                // keyValue
                                let splitVal = Buffer.from("\r\n");
                                resUlt.keyValue = buffArr[1].slice(0,buffArr[1].indexOf(splitVal)).toString();
                            }
                            return resUlt;
                        }
                        return null;
                    }).filter(e=>e);
                    resolve(bodyFormData);
                }else {
                    resolve([]);
                }
            }catch (err){
                reject(err);
            }
        });
    }

    readdirSync(path: string):any {
        let resUlt = [];
        resUlt = resUlt.concat(readdirSync(path).map(name=>{
            const childrenPath = resolve(path,name);
            const is_file = statSync(childrenPath).isFile();
            const type = is_file ? "file" : "directory";
            let children = [];
            if(!is_file){
                children = this.readdirSync(childrenPath);
            }
            return {
                name:name,
                path:childrenPath,
                children,
                type,
                is_file,
            }
        }));
        return resUlt;
    }

    $MD5(str: string): string {
        return  crypto.createHash('md5').update(str).digest("hex");
    }

    toTree(sourceData:Array<any>,opstions?:object): Array<any>{
        let opts:any = {
            children:"children",
            id:"id",
            parent:"parent",
            cb:new Function(),
            ...opstions,
        }
        let result = []
        if(!Array.isArray(sourceData)) {
            return result
        }
        let map = {};
        sourceData.forEach(item => {
            delete item[opts.children];
            map[item[opts.id]] = item;
            if(typeof opts.cb === "function"){
                opts.cb.call(this,item,opts);
            }
        });
        sourceData.forEach(item => {
            let parent = map[item[opts.parent]];
            if(parent) {
                (parent[opts.children] || (parent[opts.children] = [])).push(item);
            } else {
                result.push(item);
            }
        });
        return result;
    }

}
export const applicationController = applicationControllerClass;
