import SqlModel from "../../model/SqlModel"
export default class sqlModelAuto{
    constructor() {
        new Promise()
        console.log(new SqlModel.UserModel().$sqlFieldConfig);
        process.exit();
    }
}