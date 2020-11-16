import { SqlUtilsOptions } from "../UnityFrontUtils/typeStript";
import {PublicModelInterface} from "./PublicModel";

export interface SqlModel {
    [key:string]:SqlModelTable;
    UserModel:SqlModelTable;
    MenuTypeModel:SqlModelTable;
    MenuModel:SqlModelTable;
}

export interface  SqlModelTable extends SqlUtilsOptions{
    new (optionsConfig?:object,isEnd?:boolean):SqlUtilsOptions & PublicModelInterface;
}
