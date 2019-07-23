import applicationController from "../../../UnityFrontUtils/controller/applicationController";

export class IndexController extends  applicationController{
        constructor(){
            super();
        }

        index(){
            console.log(this.StatusCode)
            this.$_success("Asdad");
        }

}
