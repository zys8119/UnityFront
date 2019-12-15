import applicationController from "../../../UnityFrontUtils/controller/applicationController";

export class IndexController extends  applicationController{
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

}
