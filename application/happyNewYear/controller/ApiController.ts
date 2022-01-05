import {applicationController} from "../../../UnityFrontUtils/controller/applicationController";

export class ApiController extends applicationController{
    constructor() {
        super();
    }

    index(){
        this.$_success()
    }

    async getSignInList(){
        this.$_success([])
    }
}
