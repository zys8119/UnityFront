// import "../typeStript"
import { TemplateErrorDataOptions } from  "../typeStript"
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
     * @param ServerConfig
     * @param data
     */
    replaceUrlVars(ServerConfig,data){
        if(ServerConfig.Template.urlVars && typeof ServerConfig.Template.urlVars == "object"){
            for(let v in ServerConfig.Template.urlVars){
                data = data.replace(new RegExp(v,"g"),ServerConfig.Template.urlVars[v]);
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
    }
}

