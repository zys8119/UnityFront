import applicationController from "../../../UnityFrontUtils/controller/applicationController";

export class IndexController extends applicationController{
    constructor(){
        super();
        // console.log(this.$_headers);
        console.log("----->");
    }

    index(){
        this.$_send("asdasd");
    }
};