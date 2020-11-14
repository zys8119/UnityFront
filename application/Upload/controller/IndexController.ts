import {applicationController} from "../../../UnityFrontUtils/controller/applicationController";
import { ServerConfig } from "../../../UnityFrontUtils/config";
const {resolve} = require("path");
const {writeFileSync} = require("fs");
export class IndexController extends applicationController{
    constructor() {
        super();
    }

    /**
     * 文件上传
     */
    index(){
        this.$_getRequestFormData().then(res=>{
            let files =res.filter(e=>e.type === 'file');
            if(files.length === 0){
                return this.$_error("请上传文件");
            }
            let resUlt = [];
            let dirName = "public/upload";
            // 文件上传路径
            let uplodPath = resolve(__dirname,"../../../",dirName);
            files.forEach(file=>{
                let fileName = `${Date.now()}-${parseInt((Math.random()*10000).toString())}-${file.fileName}`;
                writeFileSync(resolve(uplodPath,fileName),file.fileBuff)
                resUlt.push({
                    ...file,
                    fileBuff:null,
                    // 文件访问地址
                    url:`http://${ServerConfig.host || "localhost"}:${ServerConfig.port}/${dirName}/${fileName}`,
                })
            })
            this.$_success(resUlt);
        }).catch(()=>this.$_error());
    }
}