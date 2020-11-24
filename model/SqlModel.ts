import {SqlModel} from "./interfaces";
import UserModel from "./User/UserModel"
import MenuTypeModel from "./AuthorityManagement/MenuType"
import MenuModel from "./AuthorityManagement/MenuModel"
import RolesTypeModel from "./AuthorityManagement/RolesType"
import RolesModel from "./AuthorityManagement/Roles"
import RolesPermissionModel from "./AuthorityManagement/RolesPermissionModel"
import UserRolesModel from "./AuthorityManagement/UserRolesModel";
import LogModel from "./Log/LogModel";
const SqlModelDefault:SqlModel = {
    UserModel:UserModel,
    MenuTypeModel:MenuTypeModel,
    MenuModel:MenuModel,
    RolesTypeModel:RolesTypeModel,
    RolesModel:RolesModel,
    RolesPermissionModel:RolesPermissionModel,
    UserRolesModel:UserRolesModel,
    LogModel:LogModel,
};
export default SqlModelDefault;
