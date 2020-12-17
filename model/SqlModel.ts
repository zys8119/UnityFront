import {SqlModel} from "./interfaces";
import UserModel from "./User/UserModel"
import OnlyOfficeModel from "./OnlyOfficeModel/OnlyOfficeModel"
const SqlModelDefault:SqlModel = {
    UserModel:UserModel,
    OnlyOfficeModel:OnlyOfficeModel,
};
export default SqlModelDefault;
