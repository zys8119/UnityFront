import { SqlUtilsOptions } from "../UnityFrontUtils/typeStript";
import {PublicModelInterface} from "./PublicModel";

export interface SqlModel {
    [key:string]:SqlModelTable;
    UserModel:SqlModelTable;
    MenuTypeModel:SqlModelTable;
    RolesTypeModel:SqlModelTable;
    RolesModel:SqlModelTable;
    RolesPermissionModel:SqlModelTable;
    MenuModel:SqlModelTable;
    UserRolesModel:SqlModelTable;
    LogModel:SqlModelTable;
    ApplicationTypeModel:SqlModelTable;
    ApplicationModel:SqlModelTable;
}

export interface  SqlModelTable extends SqlUtilsOptions{
    new (optionsConfig?:object,isEnd?:boolean):SqlUtilsOptions & PublicModelInterface;
}
