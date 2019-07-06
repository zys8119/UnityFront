import applicationController from "./applicationController"
export class main extends applicationController{
    constructor(){
        super();
    }

    index(){
        //控制器url路由解析
        this.UrlParse();
    }
}
