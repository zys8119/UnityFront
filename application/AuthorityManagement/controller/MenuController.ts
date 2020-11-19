import {
    applicationController,
    method_get,
    method_post, method_put
} from "../../../UnityFrontUtils/controller/applicationController";

export class MenuController extends applicationController{
    constructor() {
        super();
    }

    /**
     * 列表
     */
    @method_get(MenuController,"list")
    list(){
        if(!this.$_query.type){return this.$_error("【type】 字段必填")}
        const query = this.$_query;
        new this.$sqlModel.MenuModel()
            .getPage(this.$_query, function (){
                this.where({
                    type:query.type,
                    is_del:1
                })
            })
            .then(res=>this.$_success(this.toTree(res)))
            .catch(()=>this.$_error());
    }

    /**
     * 新增
     */
    @method_post(MenuController,"add")
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
     * 删除
     */
    @method_post(MenuController,"delete")
    delete(){
        if(!this.$_body.id){return this.$_error("【id】 字段必填")}
        new this.$sqlModel.MenuModel().update({
            is_del:2,
        }).where({id:this.$_body.id}).query()
            .then(()=>this.$_success())
            .catch(()=>this.$_error());
    }

    /**
     * 更新
     */
    @method_put(MenuController,"update")
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