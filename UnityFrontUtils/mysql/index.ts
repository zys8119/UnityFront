import "../typeStript"
import { mysqlConfig} from "../config"
let mysqlTool = require('mysql');
let ncol = require('ncol');
class mysql {
    private connection:any;
    private selectSql = '';
    private showSqlStrBool = false;
    private isEnd = false;
    constructor(optionsConfig:object,isEnd?:boolean){
        this.selectSql = '';
        this.isEnd = isEnd;
        let options = JSON.parse(JSON.stringify(mysqlConfig.options));
        if(typeof optionsConfig == "object"){
            for (let k in optionsConfig){
                options[k] = optionsConfig[k];
            }
        }
        let QueueKeyName = options.host;
        if(!mysqlConfig.createPool[QueueKeyName]){
            mysqlConfig.createPool[QueueKeyName] = mysqlTool.createPool(options);
        };
        this.connection = mysqlConfig.createPool[QueueKeyName];
    }

    /**
     * @param data 需要处理的数据
     */
    private isString(data:any){
        if(typeof data == 'string' &&  ['.'].some(e=>data.indexOf(e) == -1)){
            return '\''+data+'\'';
        }
        return data;
    }

    /**
     * 条件格式转换
     * @param sqlArr 条件数据
     * @param type 条件符号
     * @param join 连接符号
     */
    private sqlFormat(sqlArr,type = '=',join = "AND"){
        let sqlStr = ``;
        switch (typeof  sqlArr) {
            case "object":
                sqlStr = `${Object.keys(sqlArr).map(e=>(e + ' '+type+' '+this.isString(sqlArr[e]))).join(' '+join+' ')} `;
                break;
            case "string":
                sqlStr = `${sqlArr} `;
                break;
        }
        return sqlStr;
    }

    /**
     *断开连接
     */
    private end(){
        if(this.isEnd){
            // this.connection.end();
        }
    }

    /**
     *
     * @param sqlStr sql字符串
     * @param showSqlStr 是否输出sql字符串，默认不输出
     */
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

    /**
     *
     * @param TableFieldName 选择的字段名称
     * @param showSqlStr 是否输出sql字符串，默认不输出
     */
    select(TableFieldName:string = "*",showSqlStr?:boolean){
        if(showSqlStr){this.showSqlStrBool = showSqlStr;}
        this.selectSql = `SELECT ${TableFieldName} `;
        return this;
    }

    /**
     *
     * @param TableName 表名
     * @param showSqlStr  是否输出sql字符串，默认不输出
     */
    from(TableName:string,showSqlStr?:boolean){
        if(showSqlStr){this.showSqlStrBool = showSqlStr;}
        this.selectSql += `FROM ${TableName} `;
        return this;
    }


    /**
     *
     * @param WhereArr 条件数据
     * @param showSqlStr 是否输出sql字符串，默认不输出
     * @param type 类型，默认=，精准匹配
     */
    where(WhereArr:object|string,showSqlStr?:boolean,type:string = '='){
        if(showSqlStr){this.showSqlStrBool = showSqlStr;}
        switch (typeof  WhereArr) {
            case "object":
                this.selectSql += `WHERE ${this.sqlFormat(WhereArr,type)} `;
                break;
            case "string":
                this.selectSql += `WHERE ${this.sqlFormat(WhereArr,type)} `;
                break;
        }
        return this;
    }

    /**
     *
     * @param TabelName 表名
     * @param ArrData 需要写入的数据
     * @param showSqlStr 是否输出sql字符串，默认不输出
     * @param insertMore 是否插入多条数据
     * @param indexMore  当前多条索引
     * @param indexMaxMore 总条数
     */
    insert(TabelName:string,ArrData:any = [],showSqlStr?:boolean,insertMore?:boolean,indexMore?:number,indexMaxMore?:number){
        if(showSqlStr){this.showSqlStrBool = showSqlStr;}
        let MoreStr = "";
        if(insertMore){
            MoreStr = ","
            if(indexMaxMore == indexMore+1){
                MoreStr = "";
            }
        }else {
            this.selectSql = `INSERT INTO ${TabelName} `;
        };
        switch(Object.prototype.toString.call( ArrData )){
            case "[object Array]":
                //多条数据
                if(ArrData.map(e=>typeof e).some(e=>e == 'object')){
                    ArrData.forEach((e,index)=>this.insert(null,e,false,true, index,ArrData.length))
                }else {
                    let keyNames = `VALUES `;
                    if(insertMore && indexMore > 0){
                        keyNames = "";
                    };
                    this.selectSql += `${keyNames} (${ArrData.map(e=>this.isString(e)).join(",")}) ${MoreStr}`;
                }
                break;
            case "[object Object]":
                let keyNames = `(${Object.keys(ArrData).join(",")}) VALUES `;
                if(insertMore && indexMore > 0){
                    keyNames = "";
                };
                this.selectSql += `${keyNames} (${Object.keys(ArrData).map(e=>this.isString(ArrData[e])).join(",")}) ${MoreStr}`;
                break;
            default:
                this.selectSql += `${ArrData} `;
                break;
        }
        return this;
    }

    /**
     *
     * @param showSqlStr 是否输出sql字符串，默认不输出
     */
    delete(showSqlStr?:boolean){
        if(showSqlStr){this.showSqlStrBool = showSqlStr;}
        this.selectSql = `DELETE `;
        return this;
    }

    /**
     *
     * @param TabelName 表名
     * @param newData 新数据
     * @param showSqlStr  是否输出sql字符串，默认不输出
     */
    update(TabelName:string,newData?:object|string|[],showSqlStr?:boolean){
        if(showSqlStr){this.showSqlStrBool = showSqlStr;}
        this.selectSql = `UPDATE ${TabelName} SET `;
        if(newData){
            this.selectSql += this.sqlFormat(newData);
        }
        return this;
    }

    /**
     *
     * @param FieldName 需要排序的字段名
     * @param desc 倒叙或正序
     * @param showSqlStr 是否输出sql字符串，默认不输出
     */
    asc(FieldName:string,desc?:boolean,showSqlStr?:boolean){
        if(showSqlStr){this.showSqlStrBool = showSqlStr;}
        this.selectSql += `order by ${FieldName} ${(desc)?'desc':'asc'} `;
        return this;
    }

    /**
     *
     * @param FieldName 字段名称
     * @param index 需要处理的数量
     * @param desc 倒叙或正序
     * @param showSqlStr 是否输出sql字符串，默认不输出
     */
    limit(FieldName:string,index:string|number = 1,desc?:boolean,showSqlStr?:boolean){
        if(showSqlStr){this.showSqlStrBool = showSqlStr;}
        this.asc(FieldName,desc);
        this.selectSql += ` limit ${index} `;
        return this;
    }

    /**
     *
     * @param WhereArr 模糊查询条件数据
     * @param showSqlStr 是否输出sql字符串，默认不输出
     */
    like(WhereArr:object|string,showSqlStr?:boolean){
        if(showSqlStr){this.showSqlStrBool = showSqlStr;}
        this.where(WhereArr,showSqlStr,"LIKE");
        return this;
    }

    /**
     *
     * @param data 需要链表的数据
     * @param showSqlStr 是否输出sql字符串，默认不输出
     */
    join(data:object|string,showSqlStr?:boolean){
        if(showSqlStr){this.showSqlStrBool = showSqlStr;}
        switch (typeof  data) {
            case "object":
                this.selectSql += Object.keys(data).map(keyName=>`LEFT JOIN ${keyName} ON ${data[keyName]} `).join("");
                break;
            case "string":
                this.selectSql += data;
                break;
        }
        return this;
    }

}
export default mysql;


