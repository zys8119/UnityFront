import {SqlModel} from "./interfaces";
import UserModel from "./User/UserModel"
import MenuTypeModel from "./AuthorityManagement/MenuType"
import MenuModel from "./AuthorityManagement/MenuModel"
import RolesTypeModel from "./AuthorityManagement/RolesType"
const SqlModelDefault:SqlModel = {
    UserModel:UserModel,
    MenuTypeModel:MenuTypeModel,
    RolesTypeModel:RolesTypeModel,
    MenuModel:MenuModel,
};
export default SqlModelDefault;
