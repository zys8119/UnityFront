import {ServerConfig} from "../config";
import {ControllerInitDataOptions} from "../typeStript";
import Utils from "../utils";
const zlib = require("zlib");
const path = require("path");
const fs = require("fs");
const ncol = require("ncol");
export default class staticIndex {
    private ControllerInitData:ControllerInitDataOptions;
    constructor(ControllerInitData:ControllerInitDataOptions,next:Function){
        this.ControllerInitData = ControllerInitData;
        if(ControllerInitData.$_url.indexOf("/public") == 0){
            let filePath = path.resolve(__dirname,"../../","./"+ControllerInitData.$_url);
            const suffix = path.parse(ControllerInitData.$_url).ext;
            switch(suffix){
                case ".css":
                    this.getFileData(filePath,"text/css;","utf8");
                    break;
                case ".gz":
                    this.getFileData(filePath,null,null,".gz");
                    break;
                case ".ts":
                case ".js":
                    this.getFileData(filePath,"application/javascript;","utf8", suffix);
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
                ContentType = "application/javascript;";
                if(/Desktop.wasm.gz$/.test(filePath)){
                    ContentType = "application/wasm;";
                }
                if(/Desktop.data.gz$/.test(filePath)){
                    ContentType = null;
                    resolve(null);
                    return;
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
        if(gzip){
            if(gzip.ContentType){
                ContentType = gzip.ContentType
            }
            if(gzip.buff){
                data = gzip.buff
            }
        }
        let headers = {
            ...ServerConfig.headers,
        }
        if(ContentType){
            if(fileType === ".gz"){
                headers['Content-Type'] = ContentType;
            }else {
                headers['Content-Type'] = `${ContentType} charset=utf-8`;
            }
        }else {
            delete headers['Content-Type'];
        }
        if(fileType === ".gz" && !/(Desktop.framework.js.gz|Desktop.wasm.gz)$/.test(filePath)){
            headers['Content-Encoding'] = "gzip";
        }
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
            let isAsync = false;
            switch (fileType) {
                case ".html":
                case ".htm":
                    data = Utils.replaceUrlVars(ServerConfig,data);
                    break;
                case ".ts":
                    isAsync = true;
                    try {
                        const gulp = require("gulp");
                        const gulpTs = require("gulp-typescript");
                        const ts = require("typescript");
                        const tsProject = gulpTs.createProject({
                            module:"commonjs",
                            moduleResolution:"node"
                            // target:"es2015",
                        });
                        // const uglify = require('gulp-uglify')
                        const babel = require("gulp-babel");
                        const umd = require("gulp-umd");
                        const file = gulp.src(filePath)
                            .pipe(tsProject())
                            .js
                            .pipe(babel({
                                presets: ["@babel/preset-env"]
                            }))
                            .pipe(umd({
                                exports (file) {
                                    return JSON.stringify(null);
                                },
                                dependencies:(file)=> {
                                    const requires = (file._contents.toString().match(/require\(.*?\)/img) || []).map(s=>{
                                        const url = s.replace(/require|\(|\)|'|"/img,"")+'.ts';
                                        if(/^\./.test(url)){
                                            return [s,path.resolve(filePath,"..", url).match(/\/public.*/)[0]]
                                        }else {
                                            return null;
                                        }
                                    }).reduce((a,b)=>{
                                        if(!a[b[0]]){
                                            console.log(this.ControllerInitData.$_getFileContent(b[1]))
                                            a[b[0]] = b[1];
                                        }
                                        return a;
                                    },{});
                                    console.log(requires)
                                    return [
                                        {
                                            name: 'exports',
                                            amd: 'exports',
                                            cjs: 'exports',
                                            param: 'exports',
                                            global: `Object`,
                                        },
                                        {
                                            name: 'require',
                                            amd: 'require',
                                            cjs: 'require',
                                            param: 'require',
                                            global: `1`,
                                        },
                                    ];
                                }
                            }))
                            // .pipe(uglify())
                        let chunks = [];
                        file.on("error",error=>{
                            console.log(error)
                        })
                        file.on("data",chunk=>{
                            chunks.push(chunk._contents)
                        })
                        file.on("end", ()=>{
                            data = Buffer.concat(chunks).toString();
                            if(ServerConfig.debug){
                                ncol.color(()=>{
                                    ncol.successBG("【ts-node】")
                                        .info(`【编译】`)
                                        .log(`【静态资源】`)
                                        .success(JSON.stringify(filePath))
                                });
                            }
                            this.sendStatic(ContentType,data,fileType, filePath);
                        })
                    }catch (e){
                        console.log(e)
                    }


                    break;
            };
            if(!isAsync){
                this.sendStatic(ContentType,data,fileType, filePath);
            }
        });
    }
}
