import applicationController from "../../../UnityFrontUtils/controller/applicationController";

export class MenuController extends  applicationController{
        constructor(){
            super();
        }

        getMenuUi(){
            this.DB().select().from("uf_menu_ui").query().then(res=>{
                this.$_success(res);
            }).catch(err=>{
                this.$_error();
            });
        }

}
