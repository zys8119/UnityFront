import mysql from "./index";

namespace  SqlModel {
    export class UserModel extends mysql{
        constructor(optionsConfig:object = {}) {
            super(optionsConfig);
        }
    }
}

export default SqlModel;
