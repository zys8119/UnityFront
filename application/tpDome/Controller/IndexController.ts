import applicationController from "../../../UnityFrontUtils/controller/applicationController";

export class IndexController extends applicationController{
    index(){
        this.DB().select().from("d1").query().then(res=>{
            this.Render(null,{aa:res,bb:"bb",cc:true,dd:151});
        });

    }
}