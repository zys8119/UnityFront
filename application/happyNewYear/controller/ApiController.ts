import {applicationController} from "../../../UnityFrontUtils/controller/applicationController";

export class ApiController extends applicationController{
    constructor() {
        super();
    }

    index(){
        this.$_success()
    }

    async getSignInList(){
        this.$_success([
            {
                nickname:"asdasd",
                headimgurl:null,
                wall:"1",
                openid:"1"}
        ])
    }

    async wallChange(){
        this.$_success()
    }
}
