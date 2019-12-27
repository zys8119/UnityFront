import applicationController from "../../../UnityFrontUtils/controller/applicationController";
import {ServerPublicConfig} from "../../../UnityFrontUtils/config";
const path = require("path")
const fs = require("fs")
export class IndexController extends applicationController {
    constructor(){
        super();
    }

    index(){
        this.$_success("asdasdasdasd");
    }

    axios(){
        this.$_axios({
            url:"http://www.baidu.com"
        }).then(res=>{
            this.$_success(res.data);
        });
    }

    dom(){
        this.$_puppeteer("https://www.baidu.com/s?ie=UTF-8&wd="+this.$_query.q,()=>new Promise(resolve=>{
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
        this.$_fileStreamDownload("https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576473666143&di=394e5a43bd77b3e34f8460da13fb26f8&imgtype=0&src=http%3A%2F%2Fwww.365heart.com%2Fmeeting%2Fxinjian%2FCICI2015%2F%25E4%25B8%2593%25E5%25AE%25B6%25E4%25B8%25AA%25E4%25BA%25BA%2F%25E9%2599%2588%25E6%2599%2596%2FCICI2015-0002604.JPG").catch((err)=>{
            this.$_error(err);
        });
    }

    encrypt(){
        this.$_success({
            a:this.$_encode({a:1,b:2}),
            b:this.$_decode((<string>this.$_encode({a:1,b:2}))),
            key:ServerPublicConfig.createEncryptKey,
        });
    }
    
    getImageCode(){
        this.$_getSvgCode();
    }
    
    codeTest(){
        this.$_success();
    }
    
    uploadTest(){
        this.Render()
    }

    upload(){
        (async ()=>{
            let a = ()=>{
                this.getfiles()
                /*
                let myFileName = this.$_getRequestFiles().myFileName;
                if(myFileName){
                    myFileName.forEach(file=>{
                        fs.writeFile(path.resolve(__dirname,"../../../public",file.name),file.data, 'utf8', err=>{
                            if (err) this.$_error();
                        });
                    });
                }*/
            };
            await a();
            this.$_success();
        })()
    }


    getfiles(){
        Buffer.prototype.split= Buffer.prototype.split || function (spl) {
            let arr = [];
            let cur = 0;
            let n = 0;
            while ((n = this.indexOf(spl, cur)) != -1) {
                arr.push(this.slice(cur, n));
                cur = n + spl.length
            }
            arr.push(this.slice(cur))
            return arr
        };
        let bodyString = this.$_bodySource.toString();
        let end = bodyString.match(/\s------.*--\s*$/)[0];
        let start = end.replace(/^\s|--\s*$/img,"");
        console.log(this.$_bodySource.split(start).map(e=>({
            a:e.toString().match(/^\\r\\n.*?\\r\\n\\r\\n/),
            b:e.toString(),
        })))
        console.log("===========================================")
    }
}
