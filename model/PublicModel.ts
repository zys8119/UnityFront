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

    select(TableFieldName: string = "all", showSqlStr?: boolean): this {
        if(TableFieldName === "all"){
            TableFieldName = Object.keys(this.$sqlFieldConfig).join(",");
        }
        return super.select(TableFieldName || "*", showSqlStr);
    }

    from(TableName?: string, showSqlStr?: boolean): this {
        return super.from(TableName || this.$TableName, showSqlStr);
    }
}
