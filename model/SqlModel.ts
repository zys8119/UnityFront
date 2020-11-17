import {SqlModel} from "./interfaces";
import UserModel from "./User/UserModel"
import MenuTypeModel from "./AuthorityManagement/MenuType"
import MenuModel from "./AuthorityManagement/MenuModel"
import RolesTypeModel from "./AuthorityManagement/RolesType"
import RolesModel from "./AuthorityManagement/Roles"
const SqlModelDefault:SqlModel = {
    UserModel:UserModel,
    MenuTypeModel:MenuTypeModel,
    MenuModel:MenuModel,
    RolesTypeModel:RolesTypeModel,
    RolesModel:RolesModel,
};
export default SqlModelDefault;
