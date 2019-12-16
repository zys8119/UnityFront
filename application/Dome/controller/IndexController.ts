import applicationController from "../../../UnityFrontUtils/controller/applicationController";
import {ServerPublicConfig} from "../../../UnityFrontUtils/config";

export class IndexController extends applicationController {
    constructor(){
        super();
    }

    index(){
        // this.$_log("as");
        // console.log("写入成功");
        this.$_success();
    }

    axios(){
        this.$_axios({
            url:"http://www.baidu.com"
        }).then(res=>{
            this.$_success(res.data);
        });
    }

    dom(){
        this.$_puppeteer("https://www.baidu.com/s?ie=UTF-8&wd=?",()=>new Promise(resolve=>{
            let resData = [];
            resData.push.apply(resData,document.querySelectorAll(".c-container .t a"));
            let result =  resData.map((el:HTMLAnchorElement)=>({
                url:el.href,
                value:el.innerText
            }));
            resolve(result)
        })).then(res=>{
            this.$_success(res)
        }).catch(err=>{
            this.$_error(err);
        });
    }

    fileStreamDownload(){
        this.$_fileStreamDownload("http://localhost:8080/public/example.png",false).catch((err)=>{
            this.$_error(err);
        });
    }

    encrypt(){
        this.$_success({
            a:this.$_encode({a:1,b:2}),
            b:this.$_decode((<string>this.$_encode({a:1,b:2}))),
            key:ServerPublicConfig.createEncryptKey
        });
    }


}
