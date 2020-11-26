import {
    applicationController,
    method_get, method_patch,
    method_post, method_put
} from "../../../UnityFrontUtils/controller/applicationController";

export class RolesTypeController extends applicationController{
    constructor() {
        super();
    }

    /**
     * @groupName 角色类型模块
     * @description 获取角色类型列表
     * @name list
     * @method get
     * @query type {number} 角色类型
     * @query pageNo {number} 页数
     * @query pageSize {number} 每页数量
     * @query search {string} 搜素
     */
    @method_get(RolesTypeController,"list")
    list(){
        const _this = this;
        new this.$sqlModel.RolesTypeModel()
            .getPage({
                ...this.$_query,
                like:{
                    name:true
                }
            },function (){
                let data:any = {
                    is_del:1,
                }
                if(_this.$_query.type){
                    data.type = _this.$_query.type
                }
                this.AND().concat(data)
            })
            .then((res)=>this.$_success(res))
            .catch(()=>this.$_error());
    }


    /**
     * @description 添加角色类型
     * @name add
     * @method post
     * @body name {string} 角色类型名称
     * @body type {number} 角色类型
     */
    @method_post(RolesTypeController,"add")
    add(){
        if(!this.$_body.name){return this.$_error("【name】 字段必填")}
        if(!this.$_body.type){return this.$_error("【type】 字段必填")}
        new this.$sqlModel.RolesTypeModel().insert({
            name:this.$_body.name,
            type:this.$_body.type,
            id:Date.now()
        }).query()
            .then(()=>this.$_success())
            .catch(()=>this.$_error());
    }

    /**
     * @description 更新角色类型
     * @name update
     * @method put
     * @body name {string} 角色类型名称
     * @body type {number} 角色类型
     */
    @method_put(RolesTypeController,"update")
    update(){
        if(!this.$_body.name){return this.$_error("【name】 字段必填")}
        if(!this.$_body.type){return this.$_error("【type】 字段必填")}
        if(!this.$_body.id){return this.$_error("【id】 字段必填")}
        new this.$sqlModel.RolesTypeModel().update({
            name:this.$_body.name,
            type:this.$_body.type,
        }).where({id:this.$_body.id}).query()
            .then(()=>this.$_success())
            .catch(()=>this.$_error());
    }

    /**
     * @description 删除角色类型
     * @name delete
     * @method post
     * @body id {string} 角色类型id
     */
    @method_post(RolesTypeController,"delete")
    delete(){
        if(!this.$_body.id){return this.$_error("【id】 字段必填")}
        new this.$sqlModel.RolesTypeModel().update({
            is_del:2,
        }).where({id:this.$_body.id}).query()
            .then(()=>this.$_success())
            .catch(()=>this.$_error());
    }
}