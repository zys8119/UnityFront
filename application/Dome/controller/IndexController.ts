import applicationController, {method_post} from "../../../UnityFrontUtils/controller/applicationController";
const path = require("path")
const fs = require("fs")
export class IndexController extends applicationController {
    a:string;
    constructor(){
        super();
    }
    async index(){
        // await this.DB().insert("test",new Array(1000).fill(0).map(()=>({
        //     name:"asdasda",
        // }))).query()
        await this.DB().delete().from("test").where({
            "id > ":`0`,
        }).query()
        this.$_success();
    }
}
