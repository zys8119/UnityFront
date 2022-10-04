import {version} from "../../package.json"
import utils from "../utils/index";
import {resolve} from "path"
import progress from "../build/progress";
const command = require("ncommand")
const copyFiless = (projectName, copyTarget)=>{
    const targetPath = resolve(process.cwd(),projectName);
    const copyTargetPath = resolve(resolve(__dirname, "../../"), copyTarget);
    let bar = null;
    utils.copyDirSync(copyTargetPath, targetPath, (files:any,targetFile)=>{
        if(!targetFile){
            bar = new progress('进度 :bar:current/:total', { total: files.length });
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
                    log:["-icon","...info('<projectName>')","当前目录创建图标管理项目, 默认名称：newProject"],
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
