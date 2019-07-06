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
     * @constructor
     */
    Render(TemplatePath?:string,TemplateData?:object){
        TemplateData = TemplateData || {};
        let filePath = path.resolve(this.__dir,"../../Template/",this.$methodName+ServerConfig.Template.suffix);
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
            this.$_send(Utils.replaceUrlVars(ServerConfig,data));
        });
    }

    UrlParse(){
        //todo 首页渲染
        if(this.$_url == "/"){
            this.Render();
        }else {
            //todo ========【其他路径】=======
            let urlArrs = this.$_url.replace(/^\/{1}/,"").split("/");

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
            urlArrs[1] = urlArrs[1] || "Index";
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
            urlArrs[2] = urlArrs[2] || "index";
            //实例化控制器
            let ControllerClassObj = ControllerClass[ControllerClassName];
            //注入控制器类公共的初始数据及方法

            let ControllerClassInit = new ControllerClassObj();
            //判断控制器方法是否存在
            if(!ControllerClassInit[urlArrs[2]]){
                Utils.RenderTemplateError.call(this,ServerConfig.Template.TemplateErrorPath,{
                    title:`控制器方法【${urlArrs[1]}】不存在`,
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
            //todo 实例化控制器及控制器参数5
            this.$_send("其他路径测试");
        }
    }

}
