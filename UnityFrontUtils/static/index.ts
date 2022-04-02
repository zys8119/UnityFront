import {ServerConfig} from "../config";
import {ControllerInitDataOptions} from "../typeStript";
import Utils from "../utils";
import path from "path";
import fs from "fs";
export default class staticIndex {
    public ControllerInitData:ControllerInitDataOptions;
    constructor(ControllerInitData:ControllerInitDataOptions,next:Function){
        this.ControllerInitData = ControllerInitData;
        if(ControllerInitData.$_url.indexOf("/public") == 0){
            let filePath = path.resolve(__dirname,"../../","./"+ControllerInitData.$_url);
            const publicPath = path.resolve(ServerConfig.Template.publicPath,"../"+ControllerInitData.$_url);
            if(fs.existsSync(publicPath)){
                filePath = publicPath
            }
            const ext = path.parse(ControllerInitData.$_url).ext
            const publicStaticProcess = (ServerConfig.publicStaticProcess || {})[ext]
            if(Object.prototype.toString.call(publicStaticProcess) === '[object Function]'){
                publicStaticProcess.call(this, filePath)
            }else {
                switch(ext){
                    case ".css":
                        this.getFileData(filePath,"text/css;","utf8");
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
                    default:
                        this.send404();
                        break;
                }
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

    sendStatic(ContentType,data){
        this.ControllerInitData.$_send({
            data,
            RequestStatus:ServerConfig.RequestStatus,
            headers:{
                ...ServerConfig.headers,
                'Content-Type':`${ContentType} charset=utf-8`,
            }
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
            this.sendStatic(ContentType,data);
        });
    }
}
