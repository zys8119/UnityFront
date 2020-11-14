import mysql from "../UnityFrontUtils/mysql";
import {SqlUtilsOptions} from "../UnityFrontUtils/typeStript";

export interface PublicModelInterface {
    // 表名
    $TableName:string;
    // 表字段sql配置
    $sqlFieldConfig?:$sqlFieldConfigType;

    PRIMARY_KEY?:string;// 主键
    'CHARACTER SET'?:string | 'utf8';// 编码
    COLLATE?:string | 'utf8_unicode_ci';// 编码
    COMMENT?:string | `'数据库'`;// 备注
    [key:string]:any;
}

export type $sqlFieldConfigType = {
    // 字段类型
    'varchar'?:string | '(255)';
    'text'?:string | '';
    'int'?:string | '(10)';

    'CHARACTER SET'?:string | 'utf8';// 编码
    COLLATE?:string | 'utf8_unicode_ci';// 编码
    NOT?:string | 'NULL';// 不为空
    DEFAULT?:string | `'默认值'`;// 默认值
    COMMENT?:string | `'字段备注'`;// 备注
    [key:string]:string |  $sqlFieldConfigType;
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

    count(condition: any = "*"): SqlUtilsOptions{
        return super.count(condition).from(this.$TableName);
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
