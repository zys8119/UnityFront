import applicationController, {method_post} from "../../../UnityFrontUtils/controller/applicationController";
const path = require("path")
const fs = require("fs")
export class IndexController extends applicationController {
    a:string;
    constructor(){
        super();
    }

    async index(){
        await this.DB().from().select().query();
        this.$_success("Asdas");
    }
}
