import mysql from "../UnityFrontUtils/mysql";

export interface PublicModelInterface {
    // 表名
    $TableName?:string;
    // 表字段sql配置
    $sqlFieldConfig?:object
}

export default class extends mysql implements PublicModelInterface{
    $TableName:string;
    constructor(optionsConfig:object = {}) {
        super(optionsConfig);
    }

    from(TableName?: string, showSqlStr?: boolean): this {
        return super.from(TableName || this.$TableName, showSqlStr);
    }
}
