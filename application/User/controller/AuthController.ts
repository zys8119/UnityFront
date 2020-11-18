import {
    applicationController, method_get,
    method_post
} from "../../../UnityFrontUtils/controller/applicationController";
import {SqlUtilsOptions} from "../../../UnityFrontUtils/typeStript";
import {PublicModelInterface} from "../../../model/PublicModel";
import { ServerPublicConfig} from "../../../UnityFrontUtils/config";

export class AuthController extends applicationController{
    private UserModel:SqlUtilsOptions & PublicModelInterface
    constructor() {
        super();
        this.UserModel = new this.$sqlModel.UserModel();
    }

    /**
     * 注册
     */
    @method_post(AuthController,"login")
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
                id:this.$MD5(`${this.$_body.username}-${this.$_body.password}-${Date.now()}`),
                type:1,
            }).query().then(()=>{
                this.$_success()
            }).catch(()=>this.$_error())
        }).catch(()=>this.$_error())
    }

    /**
     * 登录
     */
    @method_post(AuthController,"login")
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
            const token_laws = `${res[0].username}-${res[0].password}-${res[0].id}-${Date.now()+ServerPublicConfig.token_time}-${ServerPublicConfig.token_salt}`;
            const token = this.$_encode(token_laws);
            this.$_success({
                ...res[0],
                // 1个月有效时间
                token,
            });
        }).catch(()=>this.$_error())
    }

    /**
     * 获取用户信息
     */
    @method_get(AuthController,"getUserInfo")
    getUserInfo(){
        new this.$sqlModel.UserModel().select().from().where({
            id:this.userInfo.get("id"),
        }).query().then(res=>this.$_success(res[0] || {})).catch(()=>this.$_error())
    }

    /**
     * 更新用户信息
     */
    @method_post(AuthController,"updateUserInfo")
    updateUserInfo(){
        new this.$sqlModel.UserModel().select().from().where({
            id:this.userInfo.get("id"),
        }).query().then(res=>{
            let info = (res[0] || {});
            let data:any = {};
            if(this.$_body.isPassword){
                if(info.password !== this.$_body.passwordOrigin){
                    return this.$_error("旧密码不正确，请重新输入");
                }
                if(info.password === this.$_body.password){
                    return this.$_error("新密码不能与旧密码相同，请重新输入");
                }
                data.password = this.$_body.password;
            }
            new this.$sqlModel.UserModel().update({
                email:this.$_body.email,
                avatar:this.$_body.avatar,
                phone:this.$_body.phone,
                ...data,
            }).where({
                id:this.userInfo.get("id"),
            }).query().then(res=>this.$_success({
                ...info,
                ...this.$_body,
            })).catch(()=>this.$_error())
        }).catch(()=>this.$_error())


    }
}