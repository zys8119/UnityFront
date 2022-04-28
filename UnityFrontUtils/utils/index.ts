// import "../typeStript"
import {SendDataOptions, TemplateErrorDataOptions, UtilsOptions } from "../typeStript"
import { ServerConfig } from "../config"
import dayjs from "dayjs"
const path = require('path');
const fs = require("fs");
const ncol = require('ncol');
export default <UtilsOptions>{
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
    replaceUrlVars(ServerConfig,data,TemplateData?:object,space?:number){
        if(typeof space != "number"){
            space = space || 4;
        }
        if(ServerConfig.Template.urlVars && typeof ServerConfig.Template.urlVars == "object"){
            for(let v in ServerConfig.Template.urlVars){
                data = data.replace(new RegExp(v,"g"),ServerConfig.Template.urlVars[v]);
            }
        }
        if(TemplateData && typeof TemplateData == "object"){
            for(let v in TemplateData){
                let value = TemplateData[v];
                if(typeof value != 'string'){
                    value = JSON.stringify(value,null,space);
                }
                data = data.replace(new RegExp(`\\{\\{\\$td\\.${v}\\}\\}`,"g"),value);
            }
        }
        return data;
    },
    RenderTemplateError(filePath:string,TemplateData:TemplateErrorDataOptions){
        this.setHeaders({
            'Content-Type': 'text/html; charset=utf-8',
        });
        fs.readFile(filePath,'utf8',(terr,tdata)=>{
            this.$_log(TemplateData);
            if(!ServerConfig.debug){
                this.setRequestStatus(500);
                this.$_send(`
                            <title>服务器错误</title>
                            <h1>服务器：500</h1>
                            <hr>
                            <div>请求失败</div>
                        `);
                return;
            }
            ncol.color(()=>{
                ncol.errorBG(`【请求:${TemplateData.title}】`)
                    .info(`【${this.$_method}】`)
                    .log(`【${this.$_url}】`)
                    .success(JSON.stringify(TemplateData))
            });

            if(TemplateData.interceptorErr){
                console.error(TemplateData.interceptorErr);
            }

            if (terr) {
                this.setRequestStatus(500);
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
    getUrlArrs($$url:string){
        let urlArrs = $$url.replace(/^\/{1}/,"").split("/");
        urlArrs[1] = urlArrs[1] || "Index";
        urlArrs[2] = urlArrs[2] || "index";
        try {
            urlArrs[2] = urlArrs[2].replace(/\/(.|\n)*$|\?(.|\n)*$|/img,"");
        }catch (e) {}
        return urlArrs;
    },
    dateFormat(newDate?:any,Format?:string){
        newDate = newDate || new Date();
        Format = Format || "YYYY-MM-DD HH:mm:ss";
        return dayjs(newDate || new Date, Format).format(Format).toString()
    },
    getRandomIntInclusive(min:number, max:number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //含最大值，含最小值
    },
    getCookies(request){
        let cookie = {};
        try {
            (<any>request.headers).cookie.replace(/\s/img,"").split(";").map(e=>e.split("=")).forEach(e=>{
                cookie[e[0]] = e[1];
            })
        }catch (e) {}
        return cookie;
    }
}

