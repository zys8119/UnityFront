import {version} from "../../package.json"
const command = require("ncommand")
export default async ()=>{
    return new Promise<boolean | void>(resolve=>{
        if(process.argv[2]){
            resolve()
            new command()
                .Commands({
                    log:["-v","查看版本"],
                    callback() {
                        this.console
                            .color(function (){
                                this.log("当前版本号：")
                                    .info(`v ${version}`)
                                resolve(true)
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
                .init();
        }else {
            resolve()
        }
    })
}
