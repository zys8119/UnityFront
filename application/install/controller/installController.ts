import applicationController from "../../../UnityFrontUtils/controller/applicationController";

export class installController extends applicationController{
    install(){
        this.DB().query(`
        CREATE DATABASE IF NOT EXISTS ${this.$_body.sql.dataBaseName} 
        DEFAULT CHARACTER SET utf8
        DEFAULT COLLATE utf8_general_ci1;
        `).then(res=>{
            this.$_success("数据库创建成功");
        }).catch(err=>{
            this.$_error("数据库创建失败");
        });

    }
}
