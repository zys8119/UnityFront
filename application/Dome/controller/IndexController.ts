import applicationController, {method_post} from "../../../UnityFrontUtils/controller/applicationController";
const path = require("path")
const fs = require("fs")
export class IndexController extends applicationController {
    a:string;
    constructor(){
        super();
    }

    async index(){
        await this.DB().insert("test",[
            {name:2, b:"asdas"},
            {name:1},
            {name:1},
            {name:1},
            {name:1, b:"asdas"},
        ]).query()
        await this.DB().insert("test", {
            b:"AAAAAAAA"
        }).query()
        // await this.DB().select().from("test").query();
        this.$_success();
    }
}
