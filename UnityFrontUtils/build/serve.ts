import applicationController from "../controller/applicationController"
import progress from "./progress"
import Config from "./config"
const ncol = require("ncol");
const { resolve } = require("path");
const { mkdirSync, existsSync, statSync, readdirSync, unlinkSync ,rmdirSync, createReadStream, createWriteStream  } = require("fs");
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
        let relative_url = resolve(dist,item.relative_url);
        let path = resolve(relative_url,item.name);
        if(item.is_file){
            // 排除ts
            let file_url = resolve(url,item.relative_url,item.name);
            if(!/\.ts$/.test(item.name) || Config.allFiles.some(e=>file_url.indexOf(resolve(url,e.name)) === 0)){
                let file = createReadStream(file_url);
                let out = createWriteStream(path);
                file.pipe(out);
            }
        }else {
            if(!existsSync(path)){
                mkdirSync(path);
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
    ncol.successBG("打包完成。")
});


