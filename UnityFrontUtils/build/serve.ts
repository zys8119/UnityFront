import applicationController from "../controller/applicationController"
import progress from "./progress"
import Config from "./config"
import {
    mkdirSync,
    existsSync,
    statSync,
    readdirSync,
    unlinkSync,
    rmdirSync,
    createReadStream,
    createWriteStream,
    readFileSync,
} from "fs"
import {resolve} from "path"
import {create as tsNode} from "ts-node"
import {minify} from "uglify-js"
import packageJson from "../../package.json"
const ncol = require("ncol");
const url = resolve(__dirname,"../../");
const dist = resolve(__dirname,"../../dist");
ncol.info("开始打包处理，请稍等。。。")
ncol.info("删除文件中")
function deleteFolder(path) {
    let files = [];
    if( existsSync(path) ) {
        files = readdirSync(path);
        files.forEach(function(file,index){
            let curPath = path + "/" + file;
            if(statSync(curPath).isDirectory()) {
                deleteFolder(curPath);
            } else {
                unlinkSync(curPath);
            }
        });
        rmdirSync(path);
    }
}
deleteFolder(dist);
ncol.infoBG("打包文件中")
const dirs = applicationController.prototype.readdirSync(url, Config.ignore);
const files = [];
const getFile = function (dirs){
    dirs.forEach((item:any)=>{
        files.push(item)
        if(!item.is_file){
            getFile(item.children);
        }
    })
};
getFile(dirs);
const bar = new progress(':bar:current/:total', { total: files.length });
if(!existsSync(dist)){
    mkdirSync(dist);
}
const CopyFile = function (files, cb){
    const item = files.splice(0,1)[0];
    if(item){
        const relative_url = resolve(dist,item.relative_url);
        const path = resolve(relative_url,item.name);
        const file_url = resolve(url,item.relative_url,item.name);
        if(!["package-lock.json"].includes(item.name)){
            if(item.is_file){
                // 排除ts
                if(!/\.ts$/.test(item.name) || Config.allFiles.some(e=>file_url.indexOf(resolve(url,e.name)) === 0)){
                    createReadStream(file_url).pipe(createWriteStream(path));
                }else {
                    const fileContent = tsNode({
                        dir:item.relative_url
                    }).compile(readFileSync(file_url,"utf-8"), item.name);
                    createWriteStream(path.replace(/\.ts$/,".js")).write(minify(fileContent).code);
                }
            }else {
                if(!existsSync(path)){
                    mkdirSync(path);
                }
            }
        }
        bar.tick();
        setTimeout(()=>{
            CopyFile(files,cb);
        })
        if(bar.complete){
            cb();
        }
    }
}
CopyFile(files, ()=>{
    /**
     * package.json 处理
     */
    const packageJsonCopy = JSON.parse(JSON.stringify(packageJson))
    packageJsonCopy.scripts = (<any>Object).fromEntries(
        Object.keys(packageJsonCopy.scripts)
            .filter(e=>["start", "serve", "ws", "install"].includes(e))
            .map(e=>[e,packageJsonCopy.scripts[e].replace(/ts-node/,"node")
                .replace(/\.ts/,".js")])
    )
    packageJsonCopy.bin = (<any>Object).fromEntries(
        Object.keys(packageJsonCopy.bin)
            .filter(e=>["uf", "uf-install"].includes(e))
            .map(e=>[e,packageJsonCopy.bin[e].replace(/\./,"node .")
                .replace(/\.ts/,".js")])
    )
    packageJsonCopy.main = packageJsonCopy.main.replace(/\.ts/,".js")
    createWriteStream(resolve(dist,"package.json")).write(Buffer.from(JSON.stringify(packageJsonCopy, null, 4)));
    /**
     * 设置环境变量
     */
    const envFilePath = resolve(dist,"UnityFrontUtils/server/env.js");
    const cxt = (<any>readFileSync(envFilePath,"utf-8")).replace(/NODE_ENV.*?".*?"/img,`NODE_ENV = "production"`);
    createWriteStream(envFilePath).write(cxt);
    /**
     * 更换 node 适配器
     */
    [
        "UnityFrontUtils/server/index.js",
        "UnityFrontUtils/server/install.js",
        "UnityFrontUtils/server/binServe.js",
    ].forEach(p=>{
        const p_path = resolve(dist,p);
        const p_cxt = (<any>readFileSync(p_path,"utf-8")).replace(/ts-node/,`node`);
        createWriteStream(p_path).write(p_cxt);
    })
    ncol.successBG("打包完成。")
});


