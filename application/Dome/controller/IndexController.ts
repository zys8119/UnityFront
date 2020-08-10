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
        let query = this.$_query.q;
        this.$_axios({
            url:"http://api.fanyi.baidu.com/api/trans/vip/translate",
            method:"get",
            params:{
                q:query,
                from:"auto",
                to:"auto",
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
}
