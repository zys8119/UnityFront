import {applicationController} from "../../../UnityFrontUtils/controller/applicationController";
const config = require("../../../UnityFrontUtils/build/api/config")
export class IndexController extends applicationController{
    constructor() {
        super();
    }

    /**
     * 获取api接口信息
     */
    index(){
        this.$_success(config);
    }
}