import PublicModel from "./PublicModel";

export default class extends PublicModel{
    from(TableName: string = "user", showSqlStr?: boolean): this {
        return super.from(TableName, showSqlStr);
    }
}
