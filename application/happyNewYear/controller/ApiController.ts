import {applicationController} from "../../../UnityFrontUtils/controller/applicationController";

export class ApiController extends applicationController{
    constructor() {
        super();
    }

    async index(){
        // await new this.$sqlModel.happyNewYear().insert(null,[
        //     {
        //         nickname:"nickname",
        //         headimgurl:"",
        //         wall:"0",
        //         openid:"0"
        //     }
        // ], true).query(null, true)
        await this.DB().insert("happyNewYear",[
            {nickname:"asdasda"}
        ]).query(null, true)
        this.$_success()
    }

    async getSignInList(){

        this.$_success(await new this.$sqlModel.happyNewYear().select().from().query())
    }

    async wallChange(){
        this.$_success()
    }
}
