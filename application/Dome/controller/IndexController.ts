import applicationController from "../../../UnityFrontUtils/controller/applicationController";
import {ServerConfig, ServerPublicConfig} from "../../../UnityFrontUtils/config";
const path = require("path")
const fs = require("fs")
const less = require("less")
const htmltopdf = require("htmltopdf")
const crypto = require('crypto');
export class IndexController extends applicationController {
    constructor(){
        super();
    }

    index(){
        this.$_success();
    }

    topdf(){
        htmltopdf.createFromHtml(`
            <div>哈哈哈啥哈哈实打实阿斯顿卡萨丁和喀什的</div>
            <style>
                div{color:#f00}
            </style>
        `,path.resolve(this.__dir,"../pdfName.pdf"),  (err, success)=> {
            this.$_success();
        });
    }
    sf(){
        this.Render();
    }

    xss(){
        this.$_success({a:1});
    }

    '3d'(){
        this.Render()
    }

    translate(){
        let appid = "20170503000046224";
        let salt = Math.random();
        let key = "W42YGW_DMl4slaX75hal";
        let query = this.$_body.q;
        this.$_axios({
            url:"http://api.fanyi.baidu.com/api/trans/vip/translate",
            method:"get",
            params:{
                q:query,
                from:"zh",
                to:"en",
                appid,
                salt,
                sign:crypto.createHash('md5').update(`${appid}${query}${salt}${key}`).digest("hex"),
            }
        }).then(res=>{
            try {
                this.$_success(null,res.data.trans_result[0].dst);
            }catch (e) {
                this.$_error();
            }
        }).catch(this.$_error)
    }

    bufferSplit(buff,splitter){
        let buffTter = Buffer.from(splitter);
        let index = buff.indexOf(buffTter);
        let resUlt = [];
        if(index > -1){
            resUlt = resUlt.concat(buff.slice(0,index));
            let buffChild = buff.slice(index+buffTter.length);
            resUlt = resUlt.concat(this.bufferSplit(buffChild,splitter));
        }else {
            resUlt = resUlt.concat(buff)
        }
        return resUlt;
    }

    getData(){
        return new Promise((resolve,reject) => {
            if(this.$_bodySource.length > 0){
                let bodyFormData = this.bufferSplit(this.$_bodySource,"------").map(e=>{
                    let buffArr = this.bufferSplit(e,"\r\n\r\n");
                    if(buffArr.length === 2){
                        let resUlt:any = {};
                        let info:any = this.bufferSplit(buffArr[0],"\; ").map(e=>e.toString());
                        if(buffArr[0].indexOf(Buffer.from("Content-Type")) > -1){
                            // 文件
                            resUlt.type = "file";
                            // keyName
                            let split = Buffer.from("name=\"");
                            resUlt.keyName = info[1].slice(info[1].indexOf(split)+split.length,info[1].length-1);

                            let fileInfo = this.bufferSplit(info[2],"\r\n");

                            // fileType
                            try {
                                resUlt.fileType = this.bufferSplit(fileInfo[1]," ")[1];
                            }catch (e) {}
                            // filename
                            let splitFileName = Buffer.from("filename=\"");
                            resUlt.fileName = fileInfo[0].slice(fileInfo[0].indexOf(splitFileName)+splitFileName.length,fileInfo[0].length - 1);
                            // fileBuff
                            resUlt.fileBuff = buffArr[1].slice(0,buffArr[1].length-Buffer.from("\r\n").length);
                        }else {
                            // 数据
                            resUlt.type = "data";
                            // keyName
                            let split = Buffer.from("name=\"");
                            resUlt.keyName = info[1].slice(info[1].indexOf(split)+split.length,info[1].length-1);
                            // keyValue
                            let splitVal = Buffer.from("\r\n");
                            resUlt.keyValue = buffArr[1].slice(0,buffArr[1].indexOf(splitVal)).toString();
                        }
                        return resUlt;
                    }
                    return null;
                }).filter(e=>e);
                resolve(bodyFormData);
            }else {
                reject();
            }
        });
    }

    upload(){
        this.setHeaders({
            'Content-Type': 'text/json; charset=utf-8',
            'Access-Control-Allow-Origin': "*",
            'Access-Control-Allow-Methods':'*',
            'Access-Control-Allow-Headers':'*',
        });
        this.getData().then(res=>{
            fs.writeFileSync(path.resolve(this.__dir,"../",res[1].fileName),res[1].fileBuff);
            this.$_send({
                code:0,
                message:"上传成功"
            });
        }).catch((err)=>{
            console.log(err)
            this.$_success();
        });

    }
}
