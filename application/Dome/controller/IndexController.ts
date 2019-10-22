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

}
