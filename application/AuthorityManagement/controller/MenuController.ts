import {applicationController, method_get} from "../../../UnityFrontUtils/controller/applicationController";

export class MenuController extends applicationController{
    constructor() {
        super();
    }

    /**
     * 列表
     */
    @method_get(MenuController,"list")
    list(){
        new this.$sqlModel.MenuModel()
            .getPage(this.$_query)
            .then(res=>this.$_success(res))
            .catch(()=>this.$_error());
    }
}