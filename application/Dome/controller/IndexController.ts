import applicationController from "../../../UnityFrontUtils/controller/applicationController";

export class IndexController extends applicationController {
        constructor(){
            super();
        }

        index(){
            this.$_log("as");
            console.log("写入成功");
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

        getlogo(){
            this.$_fileStreamDownload("https://dss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo_top-e3b63a0b1b.png","asdsa").catch((err)=>{
                this.$_error(err);
            });
        }

}
