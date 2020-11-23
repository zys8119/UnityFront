import applicationController from "../controller/applicationController"
import progress from "./progress"
import Config from "./config"
const ncol = require("ncol");
const { resolve } = require("path");
const { mkdirSync, existsSync, createReadStream, createWriteStream  } = require("fs");
const url = resolve(__dirname,"../../");
const dist = resolve(__dirname,"../../dist");
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
files.forEach(e=>{
    let relative_url = resolve(dist,e.relative_url)
    if(!e.is_file && !existsSync(relative_url)){
        mkdirSync(relative_url);
    }
    setTimeout(()=>{
        if(e.is_file){
            let file = createReadStream(resolve(relative_url,e.name));
            let out = createWriteStream(resolve(relative_url,e.name));
            file.pipe(out);
        }
    })
    bar.tick();
});


