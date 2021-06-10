import {applicationController, method_get, method_put} from "../../../UnityFrontUtils/controller/applicationController";

export class RolesPermissionController extends applicationController{
    constructor() {
        super();
    }

    /**
     * @groupName 角色权限模块
     * @description 获取角色已绑定权限
     * @name get
     * @method get
     * @query menu_id {number} 菜单id
     * @query roles_id {number} 角色id
     */
    @method_get(RolesPermissionController,"get")
    get(){
        if(!this.$_query.menu_id){return this.$_error("【menu_id】 字段必填")}
        if(!this.$_query.roles_id){return this.$_error("【roles_id】 字段必填")}
        new this.$sqlModel.RolesPermissionModel().select().from().where({
            menu_id:this.$_query.menu_id,
            roles_id:this.$_query.roles_id,
            is_del:1,
        }).query().then(res=>{
            if(res[0]){
                let permission = [];
                try {
                    permission = res[0].permission.split(",").filter(e=>e);
                }catch (e){
                    permission = [];
                }
                this.$_success({
                    ...res[0],
                    permission,
                })
                return;
            }
            this.$_success({
                ...this.$_query,
                permission:[],
            })
        }).catch(()=>this.$_error())
    }

    /**
     * @description 更新角色权限
     * @name update
     * @method put
     * @body menu_id {number} 菜单id
     * @body roles_id {number} 角色id
     * @body permission {Arrary<string>} 角色权限
     */
    @method_put(RolesPermissionController, "update")
    update(){
        if(!this.$_body.menu_id){return this.$_error("【menu_id】 字段必填")}
        if(!this.$_body.roles_id){return this.$_error("【roles_id】 字段必填")}
        if(!this.$_body.permission){return this.$_error("【permission】 字段必填")}
        if(Object.prototype.toString.call(this.$_body.permission) !== "[object Array]"){return this.$_error("【permission】 字段格式错误")}
        let where = {
            menu_id:this.$_body.menu_id,
            roles_id:this.$_body.roles_id,
        }
        new this.$sqlModel.RolesPermissionModel().select().from().where({
            ...where,
            is_del:1,
        }).query().then(res=>{
            let query = null;
            if(res.length === 0){
                // 新增
                query = new this.$sqlModel.RolesPermissionModel().insert({
                    ...where,
                    permission:this.$_body.permission.toString(),
                    id:Date.now()
                })
            }else {
                // 更新
                query = new this.$sqlModel.RolesPermissionModel().update({
                    permission:this.$_body.permission.toString(),
                }).where(where)
            }
            query.query().then(()=>this.$_success()).catch(()=>this.$_error())
        }).catch(()=>this.$_error())
    }
}