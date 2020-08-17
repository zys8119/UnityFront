import { SqlUtilsOptions } from "../UnityFrontUtils/typeStript";

export interface SqlModel {
    [key:string]:SqlModelTable;
    UserModel:SqlModelTable;
}

export interface  SqlModelTable extends SqlUtilsOptions{
    new (optionsConfig?:object,isEnd?:boolean):SqlUtilsOptions;
}
