import {applicationController} from "../../../UnityFrontUtils/controller/applicationController";

export class viewController extends applicationController{
    create(){
        let project_id = `${Date.now()}${parseInt(`${Math.random()*100000000}`)}`;
        this.DB().insert("uf_project",{
            project_id,
            project_name:this.$_body.name,
        }).query().then(()=>{
            this.$_success({
                project_id
            });
        }).catch(err=>{
            this.$_error(err);
        });
    }

    update(){
        this.DB().update("uf_project",{
            project_name:this.$_body.project_name,
            // config:JSON.stringify(this.$_body.config)
            config:`'${JSON.stringify(this.$_body.config)}'`
        }).where({
            project_id:this.$_body.project_id,
        }).query(null,false).then(()=>{
            this.$_success();
        }).catch(err=>{
            this.$_error(err);
        });
    }
}