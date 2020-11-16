import {SqlModel} from "./interfaces";
import UserModel from "./User/UserModel"
import MenuTypeModel from "./AuthorityManagement/MenuType"
import MenuModel from "./AuthorityManagement/MenuModel"
const SqlModelDefault:SqlModel = {
    UserModel:UserModel,
    MenuTypeModel:MenuTypeModel,
    MenuModel:MenuModel,
};
export default SqlModelDefault;
