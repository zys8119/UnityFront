import {
    applicationController,
    method_get,
    method_post, method_put
} from "../../../UnityFrontUtils/controller/applicationController";

export class ApplicationController extends applicationController{
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
    @method_get(ApplicationController,"list")
    list(){
        new this.$sqlModel.ApplicationModel()
            .getPage({
                ...this.$_query,
                like:{
                    name:true,
                }
            },  function(){
                this.AND().concat({
                    is_del:1,
                })
            })
            .then(res=>{
                this.$_success(res)
            })
            .catch((err)=>this.$_error(err));
    }

    /**
     * @description 新增应用类型
     * @name add
     * @method post
     * @body name {string} 应用类型名称
     */
    @method_post(ApplicationController,"add")
    async add(){
        if(!this.$_body.name){return this.$_error("【name】 字段必填")}
        if(!this.$_body.type){return this.$_error("【type】 字段必填")}
        try {
            const res = await new this.$sqlModel.ApplicationTypeModel().select().from().where({
                id:this.$_body.type,
            }).query()
            if(res.length === 0) this.$_error("应用类型不存在")
            let data:any = {
                name:this.$_body.name,
                id:`${Date.now()}${parseInt((Math.random()*1000).toString())}`,
            };
            new this.$sqlModel.ApplicationModel().insert(data).query()
                .then(()=>this.$_success())
                .catch(()=>this.$_error());
        }catch (e){
            this.$_error()
        }



    }

    /**
     * @description 删除应用类型
     * @name delete
     * @method post
     * @body id {string} 应用类型id
     */
    @method_post(ApplicationController,"delete")
    delete(){
        if(!this.$_body.id){return this.$_error("【id】 字段必填")}
        new this.$sqlModel.ApplicationModel().update({
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
    @method_put(ApplicationController,"update")
    update(){
        if(!this.$_body.id){return this.$_error("【id】 字段必填")}
        if(!this.$_body.name){return this.$_error("【name】 字段必填")}
        if(!this.$_body.type){return this.$_error("【type】 字段必填")}
        new this.$sqlModel.ApplicationModel().update({
            name:this.$_body.name,
        }).where({id:this.$_body.id}).query()
            .then(()=>this.$_success())
            .catch(()=>this.$_error());
    }
}
