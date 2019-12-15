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
            this.$_puppeteer("https://www.baidu.com/s?ie=UTF-8&wd=?",new Promise(resolve=>{
                resolve([])
            })).then(res=>{
                this.$_success(res)
            }).catch(err=>{
                this.$_error(err);
            });

        }

}
