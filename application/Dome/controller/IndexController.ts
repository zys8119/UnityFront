import applicationController from "../../../UnityFrontUtils/controller/applicationController";
import {ServerConfig, ServerPublicConfig} from "../../../UnityFrontUtils/config";
const path = require("path")
const fs = require("fs")
const less = require("less")
const htmltopdf = require("htmltopdf")
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
}
