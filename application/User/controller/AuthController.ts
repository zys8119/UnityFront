import {
    applicationController, method_get,
    method_post
} from "../../../UnityFrontUtils/controller/applicationController";
import {SqlUtilsOptions} from "../../../UnityFrontUtils/typeStript";
import Utils from "../../../UnityFrontUtils/utils";
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
        if(!this.$_body.email){return this.$_error("【email】 字段必填")}
        this.UserModel.select().from().where({
            username:this.$_body.username,
            status:1,
        }).query().then((res)=>{
            if(res.length > 0){
                this.$_error("用户已存在")
                return;
            }
            let userData:any = {
                password:this.$_body.password,
                username:this.$_body.username,
                name:this.$_body.username,
                email:this.$_body.email,
                id:this.$MD5(`${this.$_body.username}-${this.$_body.password}-${Date.now()}`),
                type:1,
            };
            if(this.$_body.type === "add"){
                userData.name = this.$_body.username;
                userData.phone = this.$_body.phone;
                if(this.$_body.avatar){
                    userData.avatar = this.$_body.avatar;
                }
            }
            this.UserModel.insert(userData).query().then(()=>{
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
        if(this.$_body.code){
            if(this.$_cookies.code !== this.$_encode(`${this.$_body.code}-${ServerPublicConfig.token_salt}`)){return this.$_error("验证码错误")}
        }
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
            new this.$sqlModel.LogModel().insert({
                id:Date.now(),
                log_user_id:res[0].id,
                log_info:JSON.stringify({
                    name:res[0].name,
                    phone:res[0].phone,
                    time:Utils.dateFormat()
                }),
                type:1,
            }).query()
            this.$_success({
                ...res[0],
                // 1个月有效时间
                token,
            });
        }).catch(()=>this.$_error())
    }

    /**
     * 更新用户信息
     */
    @method_post(AuthController,"updateUserInfo")
    updateUserInfo(){
        new this.$sqlModel.UserModel().select().from().where({
            id:this.$_body.id || this.userInfo.get("id"),
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
                name:this.$_body.name,
                ...data,
            }).where({
                id:this.$_body.id || this.userInfo.get("id"),
            }).query().then(res=>this.$_success({
                ...info,
                ...this.$_body,
            })).catch(()=>this.$_error())
        }).catch(()=>this.$_error())
    }

    /**
     * 获取用户列表
     */
    @method_get(AuthController,"list")
    list(){
        let _this = this;
        new this.$sqlModel.UserModel().getPage({
            ...this.$_query,
            like:{
                username:true,
                phone:true,
                email:true,
            }
        },function (){
            this.AND().concat({
                status:1,
            })
            if(_this.$_query.type){
                this.AND().concat({
                    type:_this.$_query.type,
                })
            }
        }).then(res=>this.$_success(res)).catch(()=>this.$_error());
    }

    /**
     * 删除
     */
    @method_post(AuthController,"delete")
    delete(){
        if(!this.$_body.id){return this.$_error("【id】 字段必填")}
        new this.$sqlModel.UserModel().update({
            status:2,
        }).where({id:this.$_body.id}).query()
            .then(()=>this.$_success())
            .catch(()=>this.$_error());
    }

    /**
     * 获取用户信息
     */
    @method_get(AuthController,"getUserInfo")
    getUserInfo(){
        new this.$sqlModel.UserModel().select().from().where({
            id:this.$_query.id || this.userInfo.get("id"),
        }).query().then(res=>{
            let userInfo = res[0] || {}
            this.getUserRoles(userInfo.id).then((res)=>{
                this.$_success({
                    ...userInfo,
                    menus:this.toTree(res),
                    login_time_str:this.userInfo.get("login_time_str"),
                })
            }).catch(()=>this.$_error())
        }).catch(()=>this.$_error())
    }

    /**
     * 验证码
     * @constructor
     */
    @method_get(AuthController,"VerificationCode")
    VerificationCode(){
        this.$_getSvgCode({
            headers(code){
                return {
                    "Set-Cookie":this.$_getUrlQueryData({
                        code:this.$_encode(`${code}-${ServerPublicConfig.token_salt}`),
                    })
                }
            }
        })
    }

    /**
     * 获取登录日志
     */
    @method_get(AuthController, "getLoginLog")
    getLoginLog(){
        new this.$sqlModel.LogModel().getPage(this.$_query,function (){
            this.where({
                type:1,
                status:1
            }).asc("id", true)
        }).then(res=>{
            console.log(res)
            this.$_success({
                ...res,
                list:res.list.map(e=>({
                    ...e,
                    log_info:JSON.parse(e.log_info)
                }))
            })
        }).catch(()=>this.$_error())
    }
}