import applicationController from "../../../UnityFrontUtils/controller/applicationController";

export class installController extends applicationController{
    prefix = "uf_";
    sql = [
        `
        CREATE TABLE IF NOT EXISTS ${this.prefix}menu_ui
        (id  int(11) NOT NULL AUTO_INCREMENT,
            name  varchar(25) NULL COMMENT 'ui名称' ,
            type  varchar(25) NULL COMMENT 'ui类型' ,
            path  varchar(255) NULL COMMENT 'ui路径' ,
        PRIMARY KEY (id))
        `
    ];
    sqlStr = ``;

    constructor(){
        super();
        this.sqlStr =this.sql.join(";")
    }

    install(){
        this.DB().query(this.sqlStr).then(res=>{
            this.$_success("安装成功");
        }).catch(err=>{
            this.$_error("安装失败");
        });

    }

}
