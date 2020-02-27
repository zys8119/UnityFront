import applicationController from "../../../UnityFrontUtils/controller/applicationController";
import { mysqlConfig } from "../../../UnityFrontUtils/config/index";

export class installController extends applicationController{

    constructor(){
        super();
    }

    /**
     * 获取sql
     * @param prefix 表前缀
     */
    getSql(prefix:string = mysqlConfig.options.prefix){
        return [
            `   SET FOREIGN_KEY_CHECKS=0;`,
            //创建表menu_ui
            `
            DROP TABLE IF EXISTS \`${prefix}menu_ui\`;
            CREATE TABLE \`${prefix}menu_ui\` (
                id  int(11) NOT NULL AUTO_INCREMENT,
                name  varchar(25) NULL COMMENT 'ui名称' ,
                type  varchar(25) NULL COMMENT 'ui类型' ,
                path  varchar(255) NULL COMMENT 'ui路径' ,
                PRIMARY KEY (id)
            ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
            -- ----------------------------
            -- 记录 of menu_ui
            -- ----------------------------
        `,
            //创建表project
            `
            DROP TABLE IF EXISTS \`${prefix}project\`;
            CREATE TABLE IF NOT EXISTS \`${prefix}project\` (
                \`id\` int(11) NOT NULL AUTO_INCREMENT,
                \`project_id\` varchar(255) DEFAULT NULL COMMENT '项目id',
                \`project_name\` varchar(255) NOT NULL COMMENT '项目名称',
                \`config\` longtext COMMENT '项目配置',
              PRIMARY KEY (\`id\`)
            ) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
        `,
        ].join("\n");
    }
    /**
     * 安装数据表
     */
    install(){
        this.DB({
            multipleStatements:true,
        }).query(this.getSql(this.$_body.sql.prefix)).then(res=>{
            //查询数据库所有表
            this.queryTableNameList();
        }).catch(err=>{
            this.$_error("安装失败");
        });
    }

    /**
     * 查询已安装的数据表
     */
    queryTableNameList(){
        let sql = this.getSql(this.$_body.sql.prefix);
        let sqlMatch = sql
            .match(/DROP TABLE IF EXISTS \`.*\`/img);
        let TableName = [];
        if(sqlMatch){
            TableName = sqlMatch.map(e=>{
                var name = /(?:DROP TABLE IF EXISTS `(.*)`$)/.exec(e);
                if(name && name[1]){
                    return {
                        name:name[1],
                        install:false
                    };
                }
                return e;
            });
        };
        this.DB().select("table_name").from("information_schema.tables").where({
            table_schema:mysqlConfig.options.database
        }).query().then(res=>{
            res.forEach(resItem=>{
                let indexName = TableName.some(tn=>{
                    if(tn.name == resItem.table_name){
                        tn.install = true;
                        return true;
                    };
                });
                if(!indexName){
                    TableName.push({
                        name:resItem.table_name,
                        install:true
                    })
                }
            });
            this.$_success(TableName);
        }).catch(err=>{
            this.$_error();
        });
    }

}
