import {version} from "../../package.json"
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
