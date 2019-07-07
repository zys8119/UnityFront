import applicationController from "../../../UnityFrontUtils/controller/applicationController";

export class aaController extends applicationController{
    constructor(){
        super();
    }

    bb(){
        this.$_log("bb方法Pug测试");
        this.Render("pug/index/index",{aa:'"asdasda=========成功渲染数据"'});
    }
}