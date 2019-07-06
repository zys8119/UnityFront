import applicationController from "../../../UnityFrontUtils/controller/applicationController";

export class IndexController extends applicationController{
    constructor(){
        super();
        console.log(this.__dir,this.$methodName);
        console.log("----->");
    }

    index(){
        this.$_send("asdasd");
    }
    aa(){
        this.Render();
    }
};