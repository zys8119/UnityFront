import applicationController from "./applicationController"
export class main extends applicationController{
    constructor(){
        super();
    }

    index(){
        this.$_log("sdasd","Dfsdfs",{a:2,n:[123],d:{a:{da:"1222"}}});
        //控制器url路由解析
        this.UrlParse();
    }
}
