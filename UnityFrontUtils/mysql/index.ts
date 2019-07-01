import "../typeStript"
import configs from "./configs"
let mysqlTool = require('mysql');
let ncol = require('ncol');
export default class mysql {
    connection = mysqlTool.createConnection(configs.options);
    selectSql = '';
    showSqlStrBool = false;
    constructor(){
        this.connection.connect();
        this.selectSql = '';
    }
    query(sqlStr?:string,showSqlStr?:boolean){
        if(showSqlStr){this.showSqlStrBool = showSqlStr;}
        let sqlStrs = sqlStr || this.selectSql;
        if(this.showSqlStrBool){
            ncol.success(sqlStrs);
            return new Promise((resolve, reject) => {
                resolve(sqlStrs);
                this.end();
            })
        }
        return new Promise((resolve, reject) => {
            this.connection.query(sqlStrs, (error, results, fields)=> {
                if(error){
                    ncol.error(`【QUERY ERROR】::  ${error.message} in (\`${sqlStr}\`)`);
                    console.error(error);
                    reject(error);
                    this.end();
                    return;
                }
                resolve(results);
                this.end();
            });
        })
    }
    select(TableFieldName:string = "*",showSqlStr?:boolean){
        if(showSqlStr){this.showSqlStrBool = showSqlStr;}
        this.selectSql = `SELECT ${TableFieldName} `;
        return this;
    }
    from(TableName:string,showSqlStr?:boolean){
        if(showSqlStr){this.showSqlStrBool = showSqlStr;}
        this.selectSql += `FROM ${TableName} `;
        return this;
    }
    where(WhereArr:object,showSqlStr?:boolean){
        if(showSqlStr){this.showSqlStrBool = showSqlStr;}
        let whereStr = "";
        let lng = Object.keys(WhereArr).length;
        let index = 0;
        let And = "";
        for (let k in WhereArr){
            if(index > 0 && index < lng){
                And = "And";
            }else {
                And = "";
            }
            whereStr += `${And} ${k} = ${WhereArr[k]} `;
            index += 1;
        }
        if(lng > 0){
            this.selectSql += `WHERE ${whereStr}`;
        }
        return this;
    }
    end(){
        this.connection.end();
    }
}


