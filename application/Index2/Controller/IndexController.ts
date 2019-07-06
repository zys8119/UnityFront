import applicationController from "../../../UnityFrontUtils/controller/applicationController";

export class IndexController extends applicationController{
    constructor(){
        super();
    }

    index(){
        this.$_send("asdasd");
    }
    aa(){
        this.Render();
    }
};