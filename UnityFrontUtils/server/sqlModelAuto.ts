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
                                console.log(SqlModelObj.$TableName)
                                this.DB().query(`DROP TABLE IF EXISTS 'inventory';`+
                                    `CREATE TABLE 'inventory'  (`+
                                    `'id' varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '1' COMMENT '物料id',`+
                                    `PRIMARY KEY ('id') USING BTREE`+
                                    `) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_unicode_ci COMMENT = '库存表' ROW_FORMAT = Dynamic;`
                                ).then(res=>{
                                    console.log(res)
                                }).catch(err=>{
                                    // console.error(err)
                                })
                                break;
                            case "string":
                                break;
                        }
                        break;
                }
            }
            console.log($sqlFieldConfig)
        })
        // process.exit();
    }

    DB(optionsConfig?:mysqlOptionsOptions,isEnd?:boolean){
        return new mysql(optionsConfig,isEnd);
    }
}