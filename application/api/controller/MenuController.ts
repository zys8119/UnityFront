import applicationController from "../../../UnityFrontUtils/controller/applicationController";

export class MenuController extends  applicationController{
    constructor(){
        super();
    }

    /**
     *获取基础UI
     */
    getMenuUi(){
        this.DB().select().from("uf_menu_ui").query().then(res=>{
            this.$_success(res);
        }).catch(err=>{
            this.$_error();
        });
    }

    /**
     *获取项目记录
     */
    getProjectList(){
        this.DB().select().from("uf_project").query().then(res=>{
            this.$_success(res);
        }).catch(err=>{
            this.$_error();
        });

    }

}
