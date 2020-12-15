import {applicationController} from "../../../UnityFrontUtils/controller/applicationController";
import { resolve } from "path"
import { readFileSync, existsSync } from "fs"
export class WebpackController extends applicationController{
    constructor() {
        super();
    }

    index(){
        const getFileJson = this.getFileJson()
        // console.log(getFileJson)
        debugger
        this.$_success()
    }

    getFileJson(itemData:any = {}, resUltMap = {}, bool?:boolean){
        let utf8 = "utf8";
        let node_modules = resolve(__dirname,"../../../node_modules")
        let js = itemData.filePath || resolve(__dirname,"../../../UnityFrontUtils/server/index.js");
        let jscontent = itemData.content ||  readFileSync(js,utf8);
        let reg = /require\((.|\n)*?\)/img;
        let resUlt = {};
        if(!bool){
            let def_name = js.split("\\").pop()
            resUlt[js] = {
                name:def_name,
                content:jscontent,
                packageJson:null,
                from:null,
                module:false,
                filePath:js,
            }
        }
        (jscontent.match(reg) || []).forEach(e=>{
            let name = e.replace(/^require\(|\)$/img, "").replace(/^("|'|`)|("|'|`)$/img, "");
            let module = !name.match(/\.{1,2}\//);
            let content = null;
            let packageJson = null;
            let filePath = null;
            if(module){
                let modulePath = resolve(node_modules,"./",name)
                let packageJsonPath = resolve(modulePath,"package.json");
                if(existsSync(packageJsonPath)){
                    packageJson = require(packageJsonPath);
                    let main = packageJson.main || "index.js";
                    let mainPath = resolve(modulePath,main);
                    if(existsSync(mainPath)){
                        filePath = mainPath
                        content = readFileSync(mainPath,utf8);
                    }
                }
            }else {
                let url = resolve(js,"../", name);
                if(existsSync(url + "\\index.js")){
                    url += "\\index.js";
                }else if(existsSync(url + ".js")){
                    url += ".js";
                }
                filePath = url
                content = readFileSync(url,utf8);
            }
            let item = {
                name,
                module,
                filePath,
                content,
                packageJson,
                from:js,
            }
            if(content && filePath && !resUltMap[filePath]){
                resUlt[filePath] = item;
                resUltMap[filePath] = true;
                resUlt = {
                    ...resUlt,
                    ...this.getFileJson(item, resUltMap, true)
                };
            }
        });
        return resUlt;
    }
}