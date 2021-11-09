import applicationController from "./applicationController"
import Mock from "./Mock"
export class main extends applicationController{
    constructor(){
        super();
    }

    index(){
        new Promise((resolve,reject) => {
            resolve(null);
        }).then(()=>{
            //控制器url路由解析
            this.UrlParse();
        }).catch(()=>{
            this.setHeaders({
                "Access-Control-Allow-Headers":"*",
            })
            let next = true;
            for(let k in Mock){
                if(k && new RegExp(k).test(this.$_url)){
                    next = false;
                    Mock[k].call(this);
                    break;
                }
            }
            if(next){
                this.$_success(null,null,0);
            }
        })
    }
}
