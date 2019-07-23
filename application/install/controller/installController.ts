import applicationController from "../../../UnityFrontUtils/controller/applicationController";

export class installController extends applicationController{
    install(){
        this.DB().query(`
        CREATE DATABASE IF NOT EXISTS ${this.$_body.sql.dataBaseName} 
        DEFAULT CHARACTER SET utf8
        DEFAULT COLLATE utf8_general_ci;
        `).then(res=>{
            this.$_send({
                code:200,
                msg:"数据库创建成功"
            });
        }).catch(err=>{
            this.$_send({
                code:403,
                msg:"数据库创建失败"
            });
        });

    }
}
