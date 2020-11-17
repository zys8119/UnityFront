import {
    applicationController,
    method_get,
    method_post
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
                })
            })
            .then(res=>this.$_success(res))
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
        let data:any = {
            name:this.$_body.name,
            url:this.$_body.url,
            type:this.$_body.type,
            id:Date.now(),
        };
        if(this.$_body.parent){
            data.parent = this.$_body.parent;
        }
        new this.$sqlModel.MenuModel().insert(data).query()
            .then(()=>this.$_success())
            .catch(()=>this.$_error());
    }
}