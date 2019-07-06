// import "../typeStript"
import {SendDataOptions, TemplateErrorDataOptions} from "../typeStript"
const path = require('path');
const fs = require("fs");
export default {
    /**
     * 获取目录所有文件
     * @param fileDirPath
     * @param callback
     */
    getJsonFiles(fileDirPath:string,callback?:Function){
        let jsonFiles = [];
        function findJsonFile(filePath){
            let files = fs.readdirSync(filePath);
            files.forEach(function (item, index) {
                try {
                    let fPath = path.join(filePath,item);
                    let stat = fs.statSync(fPath);
                    if(stat.isDirectory() === true) {
                        findJsonFile(fPath);
                    }
                    if (stat.isFile() === true) {
                        if(callback){
                            callback(fPath);
                        };
                        jsonFiles.push(fPath);
                    }
                }catch (e) {}
            });
        }
        findJsonFile(fileDirPath);
        return jsonFiles;
    },

    /**
     * 替换模板url变量
     * @param ServerConfig 服务配置
     * @param data 模板内容
     * @param TemplateData 模板苏剧
     */
    replaceUrlVars(ServerConfig,data,TemplateData?:object){
        if(ServerConfig.Template.urlVars && typeof ServerConfig.Template.urlVars == "object"){
            for(let v in ServerConfig.Template.urlVars){
                data = data.replace(new RegExp(v,"g"),ServerConfig.Template.urlVars[v]);
            }
        }
        if(TemplateData && typeof TemplateData == "object"){
            for(let v in TemplateData){
                let value = TemplateData[v];
                if(typeof value != 'string'){
                    value = JSON.stringify(value,null,4);
                }
                data = data.replace(new RegExp(`\\{\\{\\$td\\.${v}\\}\\}`,"g"),value);
            }
        }
        return data;
    },

    /**
     * 渲染错误模板
     * @param filPath 错误模板路径
     * @param TemplateData 错误模板数据
     * @param $_send 发送方法
     * @constructor
     */
    RenderTemplateError(filePath:string,TemplateData:TemplateErrorDataOptions){
        this.setHeaders({
            'Content-Type': 'text/html; charset=utf-8',
        });
        fs.readFile(filePath,'utf8',(terr,tdata)=>{
            if (terr) {
                this.$_send(`
                            <title>服务器错误</title>
                            <h1>服务器：500</h1>
                            <hr>
                            <div>${terr}</div>
                        `);
                return;
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
    },

    /**
     * 注入控制器类公共的初始数据及方法,this上下文为当前控制器解析实体
     * @param ControllerInitData 控制器数据
     * @param ControllerClassObj 控制器实体
     * @param $methodName 当前执行的控制器方法名称
     * @param ServerConfig 服务配置
     * @param __dir 当前执行的控制器路径
     * @param bool 是否是其他控制器渲染
     * @constructor
     */
    ControllerInitData(ControllerInitData,ControllerClassObj,$methodName,ServerConfig,__dir,bool:boolean){
        for (let keyName in ControllerInitData){
            switch (keyName) {
                case "$_send":
                    if(bool){
                        ControllerClassObj.prototype[keyName] = ControllerInitData[keyName];
                        break;
                    }
                    ControllerClassObj.prototype[keyName] = function (data) {
                        let RequestData = "";
                        if(this.$_RequestHeaders && this.$_RequestHeaders['Content-Type'] && this.$_RequestHeaders['Content-Type'].indexOf("text/json") > -1){
                            RequestData = JSON.stringify(data);
                        }else {
                            RequestData = data;
                        };
                        let headers = JSON.parse(JSON.stringify(ServerConfig.headers));
                        for(let k in this.$_RequestHeaders){
                            headers[k] = this.$_RequestHeaders[k];
                        };
                        let sendData = <SendDataOptions>{
                            data:RequestData,
                            RequestStatus:this.$_RequestStatus || ServerConfig.RequestStatus,
                            headers
                        };
                        ControllerInitData[keyName](sendData);
                    };
                    break;
                case "index":
                    break;
                default:
                    ControllerClassObj.prototype[keyName] = ControllerInitData[keyName];
                    break;
            }
        };
        ControllerClassObj.prototype.__dir = __dir;
        ControllerClassObj.prototype.$methodName = $methodName;
    },

    /**
     * 路由数组转换
     * @param $$url 需要转换的url字符串
     */
    getUrlArrs($$url:string){
        let urlArrs = $$url.replace(/^\/{1}/,"").split("/");
        urlArrs[1] = urlArrs[1] || "Index";
        urlArrs[2] = urlArrs[2] || "index";
        try {
            urlArrs[2] = urlArrs[2].replace(/\/(.|\n)*$|\?(.|\n)*$|/img,"");
        }catch (e) {}
        return urlArrs;
    }
}

