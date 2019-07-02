import "../typeStript"
import configs from "./configs"
let mysqlTool = require('mysql');
let ncol = require('ncol');
export default class mysql {
    private connection = mysqlTool.createConnection(configs.options);
    private selectSql = '';
    private showSqlStrBool = false;
    constructor(){
        this.connection.connect();
        this.selectSql = '';
    }
    private isString(data:any){
        if(typeof data == 'string'){
            return '\''+data+'\'';
        }
        return data;
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
    where(WhereArr:object|string,showSqlStr?:boolean){
        if(showSqlStr){this.showSqlStrBool = showSqlStr;}
        switch (typeof  WhereArr) {
            case "object":
                this.selectSql += `WHERE ${Object.keys(WhereArr).map(e=>(e + ' = '+this.isString(WhereArr[e]))).join(" And ")}`
                break;
            case "string":
                this.selectSql += `WHERE ${WhereArr} `;
                break;
        }

        return this;
    }
    insert(TabelName:string,ArrData:any = [],showSqlStr?:boolean){
        if(showSqlStr){this.showSqlStrBool = showSqlStr;}
        this.selectSql = `INSERT INTO ${TabelName} `;
        switch(Object.prototype.toString.call( ArrData )){
            case "[object Array]":
                this.selectSql += `VALUES(${ArrData.join(",")}) `;
                break;
            case "[object Object]":
                this.selectSql += `(${Object.keys(ArrData).join(",")}) VALUES (${Object.keys(ArrData).map(e=>this.isString(ArrData[e])).join(",")}) `;
                break;
            default:
                this.selectSql += `${ArrData} `;
                break;
        }
        return this;
    }
    end(){
        this.connection.end();
    }
}


