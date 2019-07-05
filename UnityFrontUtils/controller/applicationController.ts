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
        //首页渲染
        if(this.$_url == "/"){
            this.Render();
        }else {
            //其他路径
            let urlArrs = this.$_url.replace(/^\/{1}/,"").split("/");
            //判断模块
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
            //判断控制器
            urlArrs[1] = urlArrs[1] || "Index";
            let ControllerPath = path.resolve(ServerConfig.Template.applicationPath,urlArrs[0],"Controller",urlArrs[1]);
            if(!fs.existsSync(ControllerPath)){
                Utils.RenderTemplateError.call(this,ServerConfig.Template.TemplateErrorPath,{
                    title:`控制器【${urlArrs[0]}】不存在`,
                    error:{
                        "错误来源 -> ":ServerConfig.Template.ErrorPathSource,
                        "模块 -> ":urlArrs[1],
                    }
                });
                return;
            };
            console.log(urlArrs[1])
            this.$_send("其他路径测试");
        }
    }

}
