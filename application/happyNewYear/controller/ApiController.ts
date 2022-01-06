import {applicationController} from "../../../UnityFrontUtils/controller/applicationController";

export class ApiController extends applicationController{
    constructor() {
        super();
    }

    /**
     * 创建数据
     */
    async index(){
        await this.DB().insert("happyNewYear",[
            {
                nickname:"测试用户"+Date.now(),
                openid:Date.now(),
                headimgurl:"https://t7.baidu.com/it/u=1819248061,230866778&fm=193&f=GIF",
            }
        ]).query()
        this.$_success()
    }

    /**
     * 获取签到人员列表
     */
    async getSignInList(){
        this.$_success(await new this.$sqlModel.happyNewYear().select().from().query())
    }

    /**
     * 更新墙展示
     */
    async wallChange(){
        await new this.$sqlModel.happyNewYear().update({
            wall:0,
        }).where({
            openid:this.$_body.openid
        }).query()
        console.log(this.$_body)
        this.$_success()
    }

    /**
     * 抽奖结束
     */
    async luckStop(){
        this.$_success();
    }

    /**
     * 抽奖开始
     */
    async luckStart(){
        this.$_success();
    }
}
