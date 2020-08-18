import mysql from "../UnityFrontUtils/mysql";

export interface PublicModelInterface {
    // 表名
    $TableName:string;
    // 表字段sql配置
    $sqlFieldConfig?:$sqlFieldConfigType
}

export type $sqlFieldConfigType = {
    [key:string]:'int'|'string'|'float'|'datetime';
}

export default class extends mysql implements PublicModelInterface{
    $TableName:string;
    $sqlFieldConfig?:$sqlFieldConfigType;
    constructor(optionsConfig:object = {}) {
        super(optionsConfig);
    }

    select(TableFieldName?: string, showSqlStr?: boolean): this {
        if(Object.prototype.toString.call(TableFieldName) !== "[object String]"){
            TableFieldName = Object.keys(this.$sqlFieldConfig).join(",");
        }
        return super.select(TableFieldName || "*", showSqlStr);
    }

    from(TableName?: string, showSqlStr?: boolean): this {
        return super.from(TableName || this.$TableName, showSqlStr);
    }

    update(TabelName?: string, newData?: object | string | [], showSqlStr?: boolean): this {
        if(Object.prototype.toString.call(TabelName) === "[object Object]"){
            newData = TabelName;
            TabelName = null;
        }
        return super.update(TabelName || this.$TableName, newData, showSqlStr);
    }

    insert(TabelName?: string, ArrData: any = [], insertMore?: boolean, showSqlStr?: boolean, indexMore?: number, indexMaxMore?: number): this {
        if(Object.prototype.toString.call(TabelName) === "[object Object]"){
            ArrData = TabelName;
            TabelName = null;
        }
        return super.insert(TabelName || this.$TableName, ArrData, insertMore, showSqlStr, indexMore, indexMaxMore);
    }
}
