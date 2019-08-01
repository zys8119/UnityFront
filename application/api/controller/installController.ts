import applicationController from "../../../UnityFrontUtils/controller/applicationController";

export class installController extends applicationController{
    prefix = "uf_";
    sql = [
        `   SET FOREIGN_KEY_CHECKS=0;`,
        //创建表menu_ui
        `
            DROP TABLE IF EXISTS \`${this.prefix}menu_ui\`;
            CREATE TABLE \`${this.prefix}menu_ui\` (
                id  int(11) NOT NULL AUTO_INCREMENT,
                name  varchar(25) NULL COMMENT 'ui名称' ,
                type  varchar(25) NULL COMMENT 'ui类型' ,
                path  varchar(255) NULL COMMENT 'ui路径' ,
                PRIMARY KEY (id)
            ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
            -- ----------------------------
            -- 记录 of uf_menu_ui
            -- ----------------------------
            INSERT INTO \`${this.prefix}menu_ui\` values (1,'input','input','vux/XInput');
        `,
        //创建表project
        `
            DROP TABLE IF EXISTS \`${this.prefix}project\`;
            CREATE TABLE IF NOT EXISTS \`${this.prefix}project\` (
                id  int(11) NOT NULL AUTO_INCREMENT,
                project_name  varchar(25) NULL COMMENT '项目名称' ,
                rmarks  varchar(25) not NULL COMMENT '项目备注' default 'asd',
                PRIMARY KEY (id)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
        `,
    ];
    sqlStr = ``;

    constructor(){
        super();
        this.sqlStr =this.sql.join("\n")
    }

    install(){
        this.DB({
            multipleStatements:true,
        }).query(this.sqlStr).then(res=>{
            this.$_success("安装成功");
        }).catch(err=>{
            this.$_error("安装失败");
        });
    }

}
