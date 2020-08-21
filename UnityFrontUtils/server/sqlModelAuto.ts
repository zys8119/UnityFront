import SqlModel from "../../model/SqlModel"
import mysql from "../mysql"
import {mysqlOptionsOptions, SqlUtilsOptions} from "../typeStript"
export default class sqlModelAuto{
    constructor() {
        Object.keys(SqlModel).forEach(SqlModelKeyName=>{
            const SqlModelObj = new SqlModel[SqlModelKeyName]();
            const $sqlFieldConfig = SqlModelObj.$sqlFieldConfig;
            for(let k in $sqlFieldConfig){
                switch (Object.prototype.toString.call($sqlFieldConfig[k])){
                    case "[object String]":
                        switch ($sqlFieldConfig[k]){
                            case "int":
                                this.DB({
                                    multipleStatements:true,
                                }).query([
                                    `DROP TABLE IF EXISTS \`${SqlModelObj.$TableName}\`;
                                    CREATE TABLE \`${SqlModelObj.$TableName}\`  (
                                      \`${k}\` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '1' COMMENT '物料id',
                                      \`name\` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '物料名称',
                                      \`create_time\` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '更新时间',
                                      \`state\` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT '1' COMMENT '状态(1：未删除，2：删除)',
                                      PRIMARY KEY (\`id\`) USING BTREE
                                    ) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_unicode_ci COMMENT = '库存表' ROW_FORMAT = Dynamic;`
                                ].join("\n"))
                                break;
                            case "string":
                                break;
                        }
                        break;
                }
            }
            console.log($sqlFieldConfig)
        })
    }

    DB(optionsConfig?:mysqlOptionsOptions,isEnd?:boolean){
        return new mysql(optionsConfig,isEnd);
    }
}