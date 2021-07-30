import {ServerConfig} from "../config";
import {ControllerInitDataOptions} from "../typeStript";
import Utils from "../utils";
const zlib = require("zlib");
const path = require("path");
const fs = require("fs");
export default class staticIndex {
    private ControllerInitData:ControllerInitDataOptions;
    constructor(ControllerInitData:ControllerInitDataOptions,next:Function){
        this.ControllerInitData = ControllerInitData;
        if(ControllerInitData.$_url.indexOf("/public") == 0){
            let filePath = path.resolve(__dirname,"../../","./"+ControllerInitData.$_url);
            switch(path.parse(ControllerInitData.$_url).ext){
                case ".css":
                    this.getFileData(filePath,"text/css;","utf8");
                    break;
                case ".gz":
                    this.getFileData(filePath,null,"utf8",".gz");
                    break;
                case ".js":
                    this.getFileData(filePath,"application/javascript;","utf8");
                    break;
                case ".png":
                    this.getFileData(filePath,"image/png;");
                    break;
                case ".jpg":
                    this.getFileData(filePath,"image/jpeg;");
                    break;
                case ".gif":
                    this.getFileData(filePath,"image/gif;");
                    break;
                case ".woff2":
                    this.getFileData(filePath,"font/woff2;");
                    break;
                case ".ico":
                    this.getFileData(filePath,"image/x-icon;");
                    break;
                case ".html":
                    this.getFileData(filePath,"text/html;","utf8",".html");
                    break;
                case ".htm":
                    this.getFileData(filePath,"text/html;","utf8",".htm");
                    break;
                case ".less":
                case ".vue":
                    this.getFileData(filePath,"text/plain;","utf8");
                    break;
                case ".pdf":
                    this.getFileData(filePath,"application/pdf;");
                    break;
                case ".docx":
                    this.getFileData(filePath,"application/vnd.openxmlformats-officedocument.wordprocessingml.document;");
                    break;
                case ".ttf":
                    this.getFileData(filePath,"application/ttf;");
                    break;
                default:
                    this.send404();
                    break;
            }
            return;
        }else {
            next();
        };
    }

    send404(){
        this.ControllerInitData.$_send({
            data:`<h1>资源不存在：404</h1>`,
            RequestStatus:404,
            headers:{
                ...ServerConfig.headers,
                'Content-Type': 'text/html; charset=utf-8',
            }
        });
    }
    async sendStatic(ContentType,data, fileType, filePath){
        const gzip:any = await new Promise(resolve => {
            if(/(Desktop.framework.js.gz|Desktop.data.gz|Desktop.wasm.gz)$/.test(filePath)){
                ContentType = "application/javascript";
                if(/Desktop.wasm.gz$/.test(filePath)){
                    ContentType = "application/wasm";
                }
                if(/Desktop.data.gz$/.test(filePath)){
                    ContentType = null;
                }
                let tmpPath = path.resolve(__dirname,Date.now().toString()+"tmp.gz");
                let tmp = fs.createWriteStream(tmpPath);
                tmp.on("close",()=>{
                    let buff = fs.readFileSync(tmpPath);
                    setTimeout(()=>{
                        fs.rmSync(tmpPath);
                        setTimeout(()=>{
                            resolve({
                                ContentType,
                                buff:buff
                            });
                        })
                    })
                })
                fs.createReadStream(filePath).pipe(zlib.createGunzip()).pipe(tmp);
            }else {
                resolve(null)
            }
        })
        console.log(555)
        if(gzip){
            if(gzip.ContentType){
                ContentType = gzip.ContentType
            }
            data = gzip.buff
        }
        let headers = {
            ...ServerConfig.headers,
        }
        if(ContentType){
            headers['Content-Type'] = `${ContentType} charset=utf-8`;
        }
        console.log(data,filePath)
        this.ControllerInitData.$_send({
            data,
            RequestStatus:ServerConfig.RequestStatus,
            headers,
        });
    }

    getFileData(filePath,ContentType,encoding?:any,fileType?:string){
        fs.readFile(filePath,encoding,(err,data)=>{
            if(err){
                this.send404();
                return;
            }
            switch (fileType) {
                case ".html":
                case ".htm":
                    data = Utils.replaceUrlVars(ServerConfig,data);
                    break;
            };
            this.sendStatic(ContentType,data,fileType, filePath);
        });
    }
}
