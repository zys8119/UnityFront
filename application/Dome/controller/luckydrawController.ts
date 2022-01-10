import {applicationController} from "../../../UnityFrontUtils/controller/applicationController";

export class LuckydrawController extends applicationController{
    constructor() {
        super();
    }

    async index(){
        this.$_success();
    }

    async 'list-user'(){
        this.$_success(null, await this.DB().select().from("luckydraw").query(),0)
    }
}
