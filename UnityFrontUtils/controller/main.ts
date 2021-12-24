import applicationController from "./applicationController"
export class main extends applicationController{
    constructor(){
        super();
    }

    index(){

        new Promise(resolve=>{
            resolve(null)
        }).then(()=>{
            //控制器url路由解析
            this.UrlParse();
        }).catch(err=>{
            console.error(err.message)
            this.$_error("系统繁忙！")
        })
    }
}
