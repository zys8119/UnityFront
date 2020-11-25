import {
    applicationController,
    method_get, method_patch,
    method_post, method_put
} from "../../../UnityFrontUtils/controller/applicationController";

export class MenuTypeController extends applicationController{
    constructor() {
        super();
    }

    /**
     * @description 获取菜单分类列表
     * @name list
     * @method get
     * @query type {number} 菜单类型
     * @query pageNo {number} 页数
     * @query pageSize {number} 每页数量
     * @query search {string} 搜素
     */
    @method_get(MenuTypeController,"list")
    list(){
        const _this = this;
        new this.$sqlModel.MenuTypeModel()
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
     * @description 添加菜单分类
     * @name add
     * @method post
     * @body name {string} 分类名称
     * @body name {number} 分类类型
     */
    @method_post(MenuTypeController,"add")
    add(){
        if(!this.$_body.name){return this.$_error("【name】 字段必填")}
        if(!this.$_body.type){return this.$_error("【type】 字段必填")}
        new this.$sqlModel.MenuTypeModel().insert({
            name:this.$_body.name,
            type:this.$_body.type,
            id:Date.now()
        }).query()
            .then(()=>this.$_success())
            .catch(()=>this.$_error());
    }

    /**
     * @description 更新菜单分类
     * @name update
     * @method put
     * @body name {string} 分类名称
     * @body type {string} 分类类型
     * @body id {string} 分类id
     */
    @method_put(MenuTypeController,"update")
    update(){
        if(!this.$_body.name){return this.$_error("【name】 字段必填")}
        if(!this.$_body.type){return this.$_error("【type】 字段必填")}
        if(!this.$_body.id){return this.$_error("【id】 字段必填")}
        new this.$sqlModel.MenuTypeModel().update({
            name:this.$_body.name,
            type:this.$_body.type,
        }).where({id:this.$_body.id}).query()
            .then(()=>this.$_success())
            .catch(()=>this.$_error());
    }

    /**
     * @description 删除菜单分类
     * @name delete
     * @method post
     * @body id {string} 分类id
     */
    @method_post(MenuTypeController,"delete")
    delete(){
        if(!this.$_body.id){return this.$_error("【id】 字段必填")}
        new this.$sqlModel.MenuTypeModel().update({
            is_del:2,
        }).where({id:this.$_body.id}).query()
            .then(()=>this.$_success())
            .catch(()=>this.$_error());
    }
}