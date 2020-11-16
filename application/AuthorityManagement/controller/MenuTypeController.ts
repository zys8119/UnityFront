import {
    applicationController,
    method_get,
    method_post
} from "../../../UnityFrontUtils/controller/applicationController";

export class MenuTypeController extends applicationController{
    constructor() {
        super();
    }

    /**
     * 列表
     */
    @method_get(MenuTypeController,"list")
    list(){
        new this.$sqlModel.MenuTypeModel()
            .getPage(this.$_query,function (){
                this.where({
                    is_del:1,
                })
            })
            .then((res)=>this.$_success(res))
            .catch(()=>this.$_error());
    }

    /**
     * 添加
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
}