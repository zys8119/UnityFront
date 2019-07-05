import "../typeStript"
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
    }
}

