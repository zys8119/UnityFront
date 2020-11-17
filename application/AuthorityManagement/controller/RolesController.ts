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
     * 列表
     */
    @method_get(RolesController,"list")
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
     * 添加
     */
    @method_post(RolesController,"add")
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
     * 更新
     */
    @method_put(RolesController,"update")
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
     * 删除
     */
    @method_post(RolesController,"delete")
    delete(){
        if(!this.$_body.id){return this.$_error("【id】 字段必填")}
        new this.$sqlModel.RolesTypeModel().update({
            is_del:2,
        }).where({id:this.$_body.id}).query()
            .then(()=>this.$_success())
            .catch(()=>this.$_error());
    }
}