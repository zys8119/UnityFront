import {
    applicationController,
    method_get, method_patch,
    method_post, method_put
} from "../../../UnityFrontUtils/controller/applicationController";

export class RolesController extends applicationController{
    constructor() {
        super();
    }

    /**
     * @groupName 角色模块
     * @description 获取角色列表
     * @name list
     * @method get
     * @query pageNo {number} 页数
     * @query pageSize {number} 每页数量
     * @query search {string} 搜素
     */
    @method_get(RolesController,"list")
    list(){
        const _this = this;
        new this.$sqlModel.RolesModel()
            .getPage({
                ...this.$_query,
                like:{
                    "roles.name":true
                },
                select:"roles.*, roles_type.name as type_str"
            },function (bool){
                let data:any = {
                    "roles.is_del":1,
                }
                if(bool){
                    data["roles_type.is_del"] = 1;
                }
                if(_this.$_query.type){
                    data["roles.type"] = _this.$_query.type
                }
                this.AND().concat(data)
            },function (bool){
                if(bool){
                    this.join({
                        "roles_type":"roles.type = roles_type.id"
                    })
                }
            })
            .then((res)=>{
                if(Object.prototype.toString.call(res) === "[object Array]"){
                    this.$_success(res.map(e=>({
                        ...e,
                        node_name:e.name,
                        node_type:0,
                        node_id:e.id,
                    })))
                    return;
                }
                this.$_success(res)
            })
            .catch(()=>this.$_error());

    }


    /**
     * @description 添加角色
     * @name add
     * @method post
     * @body name {string} 角色名称
     * @body type {number} 角色类型
     * @body is_effective {number} 是否有效
     */
    @method_post(RolesController,"add")
    add(){
        if(!this.$_body.name){return this.$_error("【name】 字段必填")}
        if(!this.$_body.type){return this.$_error("【type】 字段必填")}
        if(!this.$_body.is_effective){return this.$_error("【is_effective】 字段必填")}
        let data:any = {
            name:this.$_body.name,
            type:this.$_body.type,
            is_effective:this.$_body.is_effective,
            id:Date.now()
        };
        if(this.$_body.description){
            data.description = this.$_body.description;
        }
        new this.$sqlModel.RolesModel().insert(data).query()
            .then(()=>this.$_success())
            .catch(()=>this.$_error());
    }

    /**
     * @description 更新角色
     * @name update
     * @method put
     * @body name {string} 角色名称
     * @body type {number} 角色类型
     * @body is_effective {number} 是否有效
     * @body description {string} 角色描述
     */
    @method_put(RolesController,"update")
    update(){
        if(!this.$_body.name){return this.$_error("【name】 字段必填")}
        if(!this.$_body.type){return this.$_error("【type】 字段必填")}
        if(!this.$_body.id){return this.$_error("【id】 字段必填")}
        if(!this.$_body.is_effective){return this.$_error("【is_effective】 字段必填")}
        let data:any = {
            name:this.$_body.name,
            type:this.$_body.type,
            is_effective:this.$_body.is_effective,
            description:this.$_body.description,
        };
        new this.$sqlModel.RolesModel().update(data).where({id:this.$_body.id}).query()
            .then(()=>this.$_success())
            .catch(()=>this.$_error());
    }

    /**
     * @description 删除角色
     * @name delete
     * @method post
     * @body id {string} 角色id
     */
    @method_post(RolesController,"delete")
    delete(){
        if(!this.$_body.id){return this.$_error("【id】 字段必填")}
        new this.$sqlModel.RolesModel().update({
            is_del:2,
        }).where({id:this.$_body.id}).query()
            .then(()=>this.$_success())
            .catch(()=>this.$_error());
    }
}