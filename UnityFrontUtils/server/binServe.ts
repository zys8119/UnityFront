import {version} from "../../package.json"
import utils from "../utils/index";
import {resolve, relative} from "path"
import {copyFileSync, createReadStream, createWriteStream, existsSync, mkdirSync, readFileSync} from "fs"
import progress from "../build/progress";
const command = require("ncommand")
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
                    log:["-icon","...info('<projectName>')","当前目录创建图标管理项目, 默认名称：IconfontProject"],
                    callback:function(a, arg) {
                        const projectName = arg[0] || "IconfontProject";
                        const targetPath = resolve(process.cwd(),projectName);
                        const IocnfontPath = resolve(resolve(__dirname, "../../"), "./Iocnfont");
                        let bar = null;
                        utils.copyDirSync(IocnfontPath, targetPath, (files,targetFile)=>{
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
                })
                .Commands({
                    log:["-app","...info('<applicationName>')","当前目录同步application代码, 默认名称：IconfontProject"],
                    callback:function(a, arg) {
                        const projectName = arg[0] || "IconfontProject";
                        const targetPath = resolve(process.cwd(),projectName);
                        const IocnfontPath = resolve(resolve(__dirname, "../../"), "./application");
                        // let bar = null;
                        // utils.copyDirSync(IocnfontPath, targetPath, (files,targetFile)=>{
                        //     if(!targetFile){
                        //         console.log(files)
                        //         bar = new progress('进度 :bar:current/:total', { total: files.length });
                        //     }else {
                        //         if(bar){
                        //             bar.tick();
                        //             if(bar.complete){
                        //                 console.log("✨  Done.")
                        //             }
                        //         }
                        //     }
                        // }, true)
                        utils.copyDirSync(IocnfontPath, targetPath)
                        // console.log(IocnfontPath, targetPath)
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
