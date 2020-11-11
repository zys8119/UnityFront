import {applicationController} from "../../../UnityFrontUtils/controller/applicationController";
import {SqlUtilsOptions} from "../../../UnityFrontUtils/typeStript";
import {PublicModelInterface} from "../../../model/PublicModel";

export class AuthController extends applicationController{
    private UserModel:SqlUtilsOptions & PublicModelInterface
    constructor() {
        super();
        this.UserModel = new this.$sqlModel.UserModel();
    }

    /**
     * 注册
     */
    register(){
        if(!this.$_body.username){return this.$_error("【username】 字段必填")}
        if(!this.$_body.password){return this.$_error("【password】 字段必填")}
        this.UserModel.select().from().where({
            username:this.$_body.username,
            status:1,
        }).query().then((res)=>{
            if(res.length > 0){
                this.$_error("用户已存在")
                return;
            }
            this.UserModel.insert({
                password:this.$_body.password,
                username:this.$_body.username,
                email:this.$_body.email,
                id:this.$MD5(`${this.$_body.password}-${this.$_body.password}-${Date.now()}`),
                type:1,
            }).query().then(()=>{
                this.$_success()
            }).catch(()=>this.$_error())
        }).catch(()=>this.$_error())
    }

    /**
     * 登录
     */
    login(){
        if(!this.$_body.username){return this.$_error("【username】 字段必填")}
        if(!this.$_body.password){return this.$_error("【password】 字段必填")}
        this.UserModel.select().from().where({
            username:this.$_body.username,
            status:1,
        }).query().then((res)=>{
            if(res.length === 0){
                this.$_error("用户不存在")
                return;
            }
            if(res[0].password !== this.$_body.password){
                this.$_error("账号密码错误")
                return;
            }
            this.$_success(res[0]);
        }).catch(()=>this.$_error())
    }
}