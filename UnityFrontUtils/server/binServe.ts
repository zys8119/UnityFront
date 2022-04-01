import {version} from "../../package.json"
const command = require("ncommand")
export default ()=>{
    if(process.argv[2]){
        new command()
            .Commands({
                log:["-v","查看版本"],
                callback() {
                    this.console
                        .color(function (){
                            this.log("当前版本号：")
                                .info(`v ${version}`)
                        })
                }
            })
            .Commands({
                log:["-config","配置文件"],
                callback(e, a) {
                    process.env.ufConfigPath = a[0] || "";
                    return true
                }
            })
            .Commands({
                log:["-h","查看帮助"],
                callback(e, a) {

                }
            })
            .init()
    }
}
