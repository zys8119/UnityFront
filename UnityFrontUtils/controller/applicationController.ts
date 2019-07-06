import {ControllerInitDataOptions, mysqlOptionsOptions, SqlUtilsOptions} from "../typeStript"
import { headersType } from "../typeStript/Types";
import { ServerConfig } from "../config";
import Utils from "../utils";
const fs = require('fs');
const path = require('path');
export default class applicationController implements ControllerInitDataOptions {
    $_body?:any;
    $_rawTrailers:[];
    $_headers:headersType;
    $_rawHeaders:object;
    $_method:string;
    $_url:string;
    $_urlParse:object;
    $_query:object;
    $_send?(sendData:any):any;
    $_RequestStatus:number;
    $_RequestHeaders:headersType;
    $mysql?(optionsConfig?:object,isEnd?:boolean):SqlUtilsOptions;
    __dir:string;
    $methodName:string;
    $urlArrs:any[];
    $ControllerConfig:object;

    /**
     * 设置header头
     * @param Headers
     */
    setHeaders(Headers:headersType = {}){
        this.$_RequestHeaders = Headers;
    }

    /**
     * 设置http 状态码
     * @param Status 状态码
     */
    setRequestStatus(Status:number){
        this.$_RequestStatus = Status;
    }

    /**
     * $mysql实例化
     * @constructor
     */
    DB(optionsConfig?:mysqlOptionsOptions,isEnd?:boolean){
        return this.$mysql(optionsConfig,isEnd);
    }

    /**
     * 渲染模板
     * @param TemplatePath 模板路径
     * @param TemplateData 模板数据
     * @param bool 是否为主控制器渲染
     * @constructor
     */
    Render(TemplatePath?:any,TemplateData?:object,bool?:boolean){
        TemplateData = TemplateData || {};
        if(TemplatePath && typeof TemplatePath == "object"){
            TemplateData = TemplatePath;
            TemplatePath = null;
        };
        //默认其他控制器模板路径
        let publicFilePath = "";
        if(bool){
            //UnityFront主模板渲染路径
            publicFilePath = path.resolve(ServerConfig.Template.TemplatePath);
        }else {
            //其他模块控制器视图渲染路径
            if(this.$urlArrs.length >= 2){
                publicFilePath = path.resolve(ServerConfig.Template.viewsPath,this.$urlArrs[0],this.$urlArrs[1]);
            }
        }
        let filePath = path.resolve(publicFilePath,this.$methodName+ServerConfig.Template.suffix);
        //自定义模板渲染路径
        if(TemplatePath && TemplatePath.length > 0){
            filePath = path.resolve(ServerConfig.Template.viewsPath,TemplatePath+ServerConfig.Template.suffix);
        }
        fs.readFile(filePath,'utf8',(err,data)=>{
            if (err){
                Utils.RenderTemplateError.call(this,ServerConfig.Template.TemplateErrorPath,{
                    title:`模板【${this.$methodName+ServerConfig.Template.suffix}】不存在`,
                    error:{
                        "错误来源 -> ":ServerConfig.Template.ErrorPathSource,
                        "控制器 -> ":this.__dir,
                        "方法 -> ":this.$methodName,
                        "error":"模板【"+filePath+"】不存在",
                    }
                });
                return;
            };
            if(ServerConfig.Template.suffix == ".html"){
                this.setHeaders({
                    'Content-Type': 'text/html; charset=utf-8',
                });
            };
            this.$_send(Utils.replaceUrlVars(ServerConfig,data,TemplateData));
        });
    }

    UrlParse(){
        //todo 首页渲染
        if(this.$_url == "/"){
            this.Render(null,null,true);
        }else {
            //todo ========【其他路径】=======
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
            require.cache[ControllerPath] = null;
            //获取最新控制器
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
            //实例化控制器
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

}
