import {applicationController} from "../../../UnityFrontUtils/controller/applicationController";

export class SpecialWebsiteController extends applicationController{
    constructor(){
        super();
    }

    test(){
        this.$_success("测试内容")
    }
}