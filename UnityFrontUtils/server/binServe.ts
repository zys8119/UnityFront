import {version} from "../../package.json"
import utils from "../utils/index";
import {resolve} from "path"
import progress from "../build/progress";
const command = require("ncommand")
const copyFiless = (projectName, copyTarget, callback?:(<T>(files:T)=>T))=>{
    const targetPath = resolve(process.cwd(),projectName);
    const root = resolve(__dirname, "../../");
    const copyTargetPath = copyTarget ? resolve(root, copyTarget) : root;
    let bar = null;
    utils.copyDirSync(copyTargetPath, targetPath, (files:any,targetFile)=>{
        if(!targetFile){
            bar = new progress('进度 :bar:current/:total', { total: files.length });
            if(Object.prototype.toString.call(callback) === '[object Function]'){
                return callback(files)
            }
        }else {
            if(bar){
                bar.tick();
                if(bar.complete){
                    console.log("✨  Done.")
                }
            }
        }
    }, true)
}
export default ()=>{
    if(process.argv[2]){
        let isHelp = false;
        const help =()=>{
            isHelp = true;
            initCommand()
        }
        const initCommand = ()=> {
            const c = new command()
                .Commands({
                    log:["-v","查看版本"],
                    callback() {
                        this.console
                            .color(function (){
                                this.log("当前版本号：")
                                    .success(`v ${version}`)
                            })
                    }
                })
                .Commands({
                    log:["-config","...info('<configPath>')","配置文件"],
                    callback(e, a) {
                        process.env.ufConfigPath = a[0] || "";
                        return true
                    }
                })
                .Commands({
                    log:["-icon","...info('<IconProjectName>')","当前目录创建图标管理项目, 默认名称：newProject"],
                    callback:function(a, arg) {
                        copyFiless(arg[0] || "newProject", "./Iocnfont")
                    }
                })
                .Commands({
                    log:["-app","...info('<applicationName>')","当前目录同步application代码, 默认名称：newProject"],
                    callback:function(a, arg) {
                        copyFiless(arg[0] || "newProject", "./application")
                    }
                })
                .Commands({
                    log:["create","...info('<projectName>')","当前目录创建项目, 默认名称：newProject"],
                    callback:function(a, arg) {
                        const projectName = arg[0] || "newProject";
                        copyFiless(projectName, null,(files:any) => {
                            const results = files.filter(e=>!(new RegExp([
                                "uf-node.*node_modules",
                                "\\.idea",
                                "\\.git",
                                "DS_Store",
                                "application[^Controller]",
                                "Framework",
                                "binServe\\.ts",
                                "log",
                                "lodo_text.png",
                                projectName,
                            ].join("|")).test(e)))
                            return results
                        })
                    }
                })



            if(!isHelp){
                c.Commands({
                    log:["-help","查看帮助"],
                    callback() {
                        help()
                    }
                })
                .Commands({
                    log:["-h","查看帮助"],
                    callback() {
                        help()
                    }
                })
            }
            c.init()
        }
        initCommand();
    }
}
