import SqlModel from "../../model/SqlModel"
const path = require("path")
export default class sqlModelAuto{
    constructor() {
        console.log(new SqlModel.UserModel().$sqlFieldConfig);
        process.exit();
    }
}