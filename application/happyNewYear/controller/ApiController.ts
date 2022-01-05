import {applicationController} from "../../../UnityFrontUtils/controller/applicationController";

export class ApiController extends applicationController{
    constructor() {
        super();
    }

    async index(){
        await this.DB().insert("happyNewYear",[
            {
                nickname:"测试用户"+Date.now(),
                openid:Date.now(),
                headimgurl:null,
            }
        ]).query()
        this.$_success()
    }

    async getSignInList(){
        this.$_success(await new this.$sqlModel.happyNewYear().select().from().query())
    }

    async wallChange(){
        await new this.$sqlModel.happyNewYear().update({
            wall:0,
        }).where({
            openid:this.$_body.openid
        }).query()
        console.log(this.$_body)
        this.$_success()
    }
}
