import {
    applicationController,
    method_get,
    method_post, method_put
} from "../../../UnityFrontUtils/controller/applicationController";

export class ApplicationTypeController extends applicationController{
    constructor() {
        super();
    }

    /**
     * @groupName 应用类型模块
     * @description 获取应用类型列表
     * @name list
     * @method get
     * @query type {number} 应用类型类型
     * @query pageNo {number} 页数
     * @query pageSize {number} 每页数量
     * @query search {string} 搜素
     */
    @method_get(ApplicationTypeController,"list")
    list(){
        new this.$sqlModel.MenuModel()
            .getPage(this.$_query, function (){
                this.where({
                    is_del:1
                })
            })
            .then(res=>{
                this.$_success(res)
            })
            .catch(()=>this.$_error());
    }

    /**
     * @description 新增应用类型
     * @name add
     * @method post
     * @body name {string} 应用类型名称
     * @body url {string} 应用类型访问地址
     * @body type {number} 应用类型类型
     * @body is_child_page {number} 是否子页面
     */
    @method_post(ApplicationTypeController,"add")
    add(){
        if(!this.$_body.name){return this.$_error("【name】 字段必填")}
        if(!this.$_body.url){return this.$_error("【url】 字段必填")}
        if(!this.$_body.type){return this.$_error("【type】 字段必填")}
        if(!this.$_body.is_child_page){return this.$_error("【is_child_page】 字段必填")}
        let data:any = {
            name:this.$_body.name,
            url:this.$_body.url,
            type:this.$_body.type,
            is_child_page:this.$_body.is_child_page,
            id:`${Date.now()}${parseInt((Math.random()*1000).toString())}`,
        };
        if(this.$_body.parent){
            data.parent = this.$_body.parent;
        }
        new this.$sqlModel.MenuModel().insert(data).query()
            .then(()=>this.$_success())
            .catch(()=>this.$_error());
    }

    /**
     * @description 删除应用类型
     * @name delete
     * @method post
     * @body id {string} 应用类型id
     */
    @method_post(ApplicationTypeController,"delete")
    delete(){
        if(!this.$_body.id){return this.$_error("【id】 字段必填")}
        new this.$sqlModel.MenuModel().update({
            is_del:2,
        }).where({id:this.$_body.id}).query()
            .then(()=>this.$_success())
            .catch(()=>this.$_error());
    }

    /**
     * @description 更新应用类型
     * @name update
     * @method put
     * @body id {string} 应用类型id
     * @body name {string} 应用类型名称
     * @body url {string} 应用类型访问地址
     * @body is_child_page {number} 是否为子页面
     */
    @method_put(ApplicationTypeController,"update")
    update(){
        if(!this.$_body.id){return this.$_error("【id】 字段必填")}
        if(!this.$_body.name){return this.$_error("【name】 字段必填")}
        if(!this.$_body.url){return this.$_error("【url】 字段必填")}
        if(!this.$_body.is_child_page){return this.$_error("【is_child_page】 字段必填")}
        new this.$sqlModel.MenuModel().update({
            name:this.$_body.name,
            url:this.$_body.url,
            is_child_page:this.$_body.is_child_page,
        }).where({id:this.$_body.id}).query()
            .then(()=>this.$_success())
            .catch(()=>this.$_error());
    }
}