import {applicationController, method_get, method_put} from "../../../UnityFrontUtils/controller/applicationController";

export class UserRolesController extends applicationController{
    constructor() {
        super();
    }

    /**
     * 更新用户角色
     */
    @method_put(UserRolesController, "update")
    update(){
        if(!this.$_body.user_id){return this.$_error("【user_id】 字段必填")}
        if(!this.$_body.user_roles_id){return this.$_error("【user_roles_id】 字段必填")}
        new this.$sqlModel.UserRolesModel().select().from().where({
            user_id:this.$_body.user_id,
            is_del:1,
        }).query().then(res=>{
            if(res.length === 0){
                // 新增
                new this.$sqlModel.UserRolesModel().insert({
                    user_id:this.$_body.user_id,
                    user_roles_id:this.$_body.user_roles_id.toString(),
                    id:Date.now(),
                }).query().then(()=>this.$_success()).catch(()=>this.$_error())
            }else {
                // 更新
                new this.$sqlModel.UserRolesModel().update({
                    user_roles_id:this.$_body.user_roles_id.toString(),
                }).where({
                    id:res[0].id,
                }).query().then(()=>this.$_success()).catch(()=>this.$_error())
            }
        }).catch(()=>this.$_error())
    }

    /**
     * 获取用户已绑定角色
     */
    @method_get(UserRolesController, "get")
    get(){
        if(!this.$_query.user_id){return this.$_error("【user_id】 字段必填")}
        new this.$sqlModel.UserRolesModel().select().from().where({
            user_id:this.$_query.user_id,
            is_del:1,
        }).query().then(res=>{
            if(res.length === 0){
                this.$_success({
                    user_roles_id:[],
                });
            }else {
                this.$_success({
                    ...res[0],
                    user_roles_id:res[0].user_roles_id.split(",").filter(e=>e)
                });
            }
        }).catch(()=>this.$_error())
    }
}