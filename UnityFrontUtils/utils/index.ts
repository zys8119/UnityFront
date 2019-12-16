// import "../typeStript"
import {SendDataOptions, TemplateErrorDataOptions, UtilsOptions } from "../typeStript"
const path = require('path');
const fs = require("fs");
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
        Format = Format || "YYYY-MM-DD HH:mm:ss week sc";
        switch (Object.prototype.toString.call(newDate)) {
            case "[object Number]":
                let now = new Date();
                now.setTime(newDate);
                let nowTime = now.toLocaleString();
                let week = now.getDay(); //星期
                let hour = now.getHours(); //小时
                //判断星期几
                let weeks = ["日","一","二","三","四","五","六"];
                let getWeek = "星期" + weeks[week];
                let sc;
                //判断是AM or PM
                if(hour >= 0 && hour < 5){
                    sc = '凌晨';
                }
                else if(hour > 5 && hour <= 7){
                    sc = '早上';
                }
                else if(hour > 7 && hour <= 11){
                    sc = '上午';
                }
                else if(hour > 11 && hour <= 13){
                    sc = '中午';
                }
                else if(hour> 13 && hour <= 18){
                    sc = '下午';
                }
                else if(hour > 18 && hour <= 23){
                    sc = '晚上';
                }
                //"YYYY-MM-DD HH:mm:ss week sc"
                //{ nowTime: '2019-7-7 13:18:29', getWeek: '星期日', sc: '中午' }
                let nowTimeArr:any = nowTime
                    .replace(/\s/,"-")
                    .split("-")
                    .map(e=>e.split(":").map(item=>{
                        if(item.length == 1){
                            return `0${item}`;
                        }
                        return item;
                    }));
                Format = Format.replace(/week/g,getWeek);
                Format = Format.replace(/sc/g,sc);
                Format = Format.replace(/Y{4}/g,nowTimeArr[0].slice(0,4));
                Format = Format.replace(/Y{3}/g,nowTimeArr[0].slice(0,3));
                Format = Format.replace(/Y{2}/g,nowTimeArr[0].slice(0,2));
                Format = Format.replace(/Y{1}/g,nowTimeArr[0].slice(0,1));
                Format = Format.replace(/M{2}/g,nowTimeArr[1].slice(0,2));
                Format = Format.replace(/M{1}/g,nowTimeArr[1].slice(0,1));
                Format = Format.replace(/D{2}/g,nowTimeArr[2].slice(0,2));
                Format = Format.replace(/D{1}/g,nowTimeArr[2].slice(0,1));
                Format = Format.replace(/H{2}/g,nowTimeArr[3][0].slice(0,2));
                Format = Format.replace(/H{1}/g,nowTimeArr[3][0].slice(0,1));
                Format = Format.replace(/m{2}/g,nowTimeArr[3][1].slice(0,2));
                Format = Format.replace(/m{1}/g,nowTimeArr[3][1].slice(0,1));
                Format = Format.replace(/s{2}/g,nowTimeArr[3][2].slice(0,2));
                Format = Format.replace(/s{1}/g,nowTimeArr[3][2].slice(0,1));
                break;
            case "[object Date]":
                return this.dateFormat(newDate.getTime(),Format);
                break;
            case "[object String]":
                return this.dateFormat(new Date(newDate).getTime(),Format);
                break;
        }
        return Format;
    },
    getRandomIntInclusive(min:number, max:number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //含最大值，含最小值
    }
}

