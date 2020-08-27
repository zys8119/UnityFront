import SqlModel from "../../model/SqlModel"
import mysql from "../mysql"
import {mysqlOptionsOptions, SqlUtilsOptions} from "../typeStript"
import {$sqlFieldConfigType, PublicModelInterface} from "../../model/PublicModel";
import {mysqlConfig} from "../config";
interface createTableConfig {
    SqlModelObj?:SqlUtilsOptions & PublicModelInterface;
    $sqlFieldConfig?:$sqlFieldConfigType;
    keyName?:string;
    type?:string;
}
export default class sqlModelAuto{
    databaseTablesInfo:any[];
    TABLE_NAME:string[];// 已有表名称
    constructor() {
        this.getTable().then(res=>{
            this.databaseTablesInfo = res;
            this.TABLE_NAME = this.databaseTablesInfo.map(e=>e.TABLE_NAME);
            this.init();
        });

    }

    DB(optionsConfig?:mysqlOptionsOptions,isEnd?:boolean){
        return new mysql(optionsConfig,isEnd);
    }

    addFieldSql(config:createTableConfig,keyName,result){
        switch (Object.prototype.toString.call(config.$sqlFieldConfig[keyName])){
            case "[object String]":
                switch (config.$sqlFieldConfig[keyName]){
                    case "int":
                        result.push(`\`${keyName}\` int(10)`);
                        break;
                    case "varchar":
                        result.push(`\`${keyName}\` varchar(255)`);
                        break;
                }
                break;
            case "[object Object]":
                let s = `\`${keyName}\``;
                let d:any = config.$sqlFieldConfig[keyName];
                for (let k in d){
                    s += ` ${k} ${d[k]}`;
                }
                result.push(s);
                break;
        }
    }

    updateFieldSql(config:createTableConfig,keyName,result, type){
        let ADDCOLUMN = `ALTER TABLE \`${config.SqlModelObj.$TableName}\` ${type} COLUMN`;
        switch (Object.prototype.toString.call(config.$sqlFieldConfig[keyName])){
            case "[object String]":
                switch (config.$sqlFieldConfig[keyName]){
                    case "int":
                        result.push(` ${ADDCOLUMN} \`${keyName}\` int(10);`);
                        break;
                    case "varchar":
                        result.push(` ${ADDCOLUMN} \`${keyName}\` varchar(255);`);
                        break;
                }
                break;
            case "[object Object]":
                let s = ` ${ADDCOLUMN} \`${keyName}\``;
                let d:any = config.$sqlFieldConfig[keyName];
                for (let k in d){
                    s += ` ${k} ${d[k]}`;
                }
                result.push(s+";");
                break;
        }
    }
    /**
     * 获取表字段sal
     */
    getTableFieldSql(config:createTableConfig, COLUMN_NAME, bool){
        let result = [];
        for(let keyName in config.$sqlFieldConfig){
            if(COLUMN_NAME.indexOf(keyName) === -1){
                // 发现新字段
                if(bool){
                    this.updateFieldSql(config, keyName, result,'ADD');
                }else {
                    // 添加字段
                    this.addFieldSql(config, keyName, result);
                }
            }else {
                if(bool){
                    // 更新字段
                    this.updateFieldSql(config, keyName, result, 'MODIFY');
                }else {
                    // 添加字段
                    this.addFieldSql(config, keyName, result);
                }
            }
        }

        return result.join(",")
    }

    /**
     * 创建表
     * @param config
     */
    createTable(config:createTableConfig){
        this.getCOLUMNS(config.SqlModelObj.$TableName).then(res=>{
            const COLUMN_NAME = res.map(e=>e.COLUMN_NAME);
            if(this.TABLE_NAME.indexOf(config.SqlModelObj.$TableName) > -1){
                let FieldSql = this.getTableFieldSql(config,COLUMN_NAME, true);
                if(FieldSql){
                    this.DB({multipleStatements:true,})
                        .query(FieldSql.split(",").join(""))
                }
            }else {
                let FieldSql = this.getTableFieldSql(config,COLUMN_NAME, false);
                if(FieldSql){
                    let appendSql = "";
                    if(config.SqlModelObj.PRIMARY_KEY){
                        FieldSql += `, PRIMARY KEY ${config.SqlModelObj.PRIMARY_KEY} USING BTREE`
                    }
                    if(config.SqlModelObj['CHARACTER SET']){
                        appendSql += `CHARACTER SET = ${config.SqlModelObj['CHARACTER SET']}`
                    }
                    if(config.SqlModelObj.COLLATE){
                        appendSql += ` COLLATE = ${config.SqlModelObj.COLLATE}`
                    }
                    if(config.SqlModelObj.COMMENT){
                        appendSql += ` COMMENT = ${config.SqlModelObj.COMMENT}`
                    }
                    this.DB({multipleStatements:true,})
                        .query([
                            `create table ${config.SqlModelObj.$TableName} (${FieldSql})  ENGINE = MyISAM ${appendSql} ROW_FORMAT = Dynamic`
                        ].join("\n"))
                }

            }
        });

    }

    /**
     * 初始化
     */
    init(){
        Object.keys(SqlModel).forEach(SqlModelKeyName=>{
            const SqlModelObj = new SqlModel[SqlModelKeyName]();
            const $sqlFieldConfig = SqlModelObj.$sqlFieldConfig;
            const config = {
                SqlModelObj,
                $sqlFieldConfig,
            }
            this.createTable(config);
        })
    }

    /**
     * 获取数据库已有表信息
     */
    getTable(){
        return this.DB().query(`select * from information_schema.tables where table_schema ='${mysqlConfig.options.database}';`);
    }

    /**
     * 获取表字段
     */
    getCOLUMNS(tableName){
        return this.DB().query(`select * from information_schema.COLUMNS where table_name = '${tableName}' and table_schema = '${mysqlConfig.options.database}';  `);
    }

}