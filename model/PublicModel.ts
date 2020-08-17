import mysql from "../UnityFrontUtils/mysql";

export default class extends mysql{
    constructor(optionsConfig:object = {}) {
        super(optionsConfig);
    }
    from(TableName: string, showSqlStr?: boolean): this {
        console.log(333333)
        return super.from(TableName, showSqlStr);
    }
}
