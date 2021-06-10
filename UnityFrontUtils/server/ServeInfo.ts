import { ServerConfig } from "../config";
const ncol = require('ncol');
const os = require("os");
export default class ServeInfo{
    IPv4:Array<string>
    constructor() {
        const networkInterfaces = os.networkInterfaces();
        this.IPv4 = Object.keys(networkInterfaces).map(k=>networkInterfaces[k].filter(e=>e.family === "IPv4").map(e=>e.address)).toString().split(",");
    }
    info(){
        ncol.log("Server running at:")
        this.IPv4.forEach(e=>{
            let local = null;
            if(e === '127.0.0.1'){
                local = "localhost"
            }
            ncol.color(function (){
                this.log(`- ${local ? 'Local  ' : 'Network'}:`)
                    .info(` http://${local || e}:${ServerConfig.port || "80"}`)
            });
        })
    }
}