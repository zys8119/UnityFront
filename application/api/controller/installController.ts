import applicationController from "../../../UnityFrontUtils/controller/applicationController";

export class installController extends applicationController{
    prefix = "uf_";
    sql = [
        //创建表menu_ui
        `CREATE TABLE IF NOT EXISTS ${this.prefix}menu_ui (
            id  int(11) NOT NULL AUTO_INCREMENT,
            name  varchar(25) NULL COMMENT 'ui名称' ,
            type  varchar(25) NULL COMMENT 'ui类型' ,
            path  varchar(255) NULL COMMENT 'ui路径' ,
            PRIMARY KEY (id)
        )`,
        //创建表project
        `CREATE TABLE IF NOT EXISTS ${this.prefix}project (
            id  int(11) NOT NULL AUTO_INCREMENT,
            project_name  varchar(25) NULL COMMENT '项目名称' ,
            rmarks  varchar(25) NULL COMMENT '项目备注' ,
            PRIMARY KEY (id)
        );`,
    ];
    sqlStr = ``;

    constructor(){
        super();
        this.sqlStr =this.sql.join(";\n")
    }

    install(){
        let a = "asd ad";
        this.DB().select().from("uf_menu_ui").where(`#{${"adadsa"}}# name=#{${a}}##{${"1 or b = 2#{}"}}#and nn=#{${"1 or b = 2#{}"}}#"`,true).query();
        this.$_success("安装成功");
        return;
        this.DB().select().from("uf_menu_ui").where({'a and aa':true,c:5},true).query();


        this.DB({
            multipleStatements:true,
        }).query(this.sqlStr,true).then(res=>{
            this.$_success("安装成功");
        }).catch(err=>{
            this.$_error("安装失败");
        });

    }

}
