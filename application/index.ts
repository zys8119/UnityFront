import {ControllerInitDataOptions, mysqlOptionsOptions, SqlUtilsOptions} from "../UnityFrontUtils/typeStript"
import { headersType } from "../UnityFrontUtils/typeStript/Types";
import { ServerConfig } from "../UnityFrontUtils/config";
import Utils from "../UnityFrontUtils/utils";
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
        let fileNameArr = this.__dir.replace(/^(.|\n).*application\\/img,"").split(path.sep);
        let filePath = path.resolve(ServerConfig.Template.pablicPath,fileNameArr[0],fileNameArr[2],this.$methodName+ServerConfig.Template.suffix);
        fs.readFile(filePath,'utf8',(err,data)=>{
            if (err){
                this.setHeaders({
                    'Content-Type': 'text/html; charset=utf-8',
                });
                fs.readFile(path.resolve(__dirname,"../UnityFrontUtils/Template/TemplateError.html"),'utf8',(terr,tdata)=>{
                    if (terr) {
                        this.$_send(`
                            <title>服务器错误</title>
                            <h1>服务器：500</h1>
                            <hr>
                            <div>${terr}</div>
                        `);
                        return;
                    };
                    TemplateData = {
                        tpn:this.$methodName+ServerConfig.Template.suffix,
                        ERROR:{
                            "控制器 -> ":this.__dir,
                            "方法 -> ":this.$methodName,
                            "error":"模板【"+filePath+"】不存在",
                        }
                    };
                    for (let k in TemplateData){
                        let value = TemplateData[k];
                        if(typeof value != "string"){
                            value = `<pre>${JSON.stringify(value,null,4)}</pre>`;
                        }
                        tdata = tdata.replace(new RegExp(`\\{\\{${k}.*\\}\\}`,"g"),value);
                    }
                    this.$_send(tdata);
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


}
