import {applicationController, method_post} from "../../../UnityFrontUtils/controller/applicationController";
import { ServerConfig } from "../../../UnityFrontUtils/config";
const {resolve} = require("path");
const {writeFileSync} = require("fs");
export class IndexController extends applicationController{
    constructor() {
        super();
    }

    /**
     * @groupName 文件上传
     * @description 文件上传
     * @name index
     * @method post
     * @body file {file} 文件流
     */
    @method_post(IndexController,"index")
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
                let suffix = file.fileName.match(/\.\w*$/);
                if(suffix && suffix[0]){
                    suffix = suffix[0];
                }else {
                    suffix = ".png";
                }
                let fileName = `${Date.now()}-${parseInt((Math.random()*10000).toString())}-${Date.now()}${suffix}`;
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