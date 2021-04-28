import applicationController, {method_post, method_get} from "../../../UnityFrontUtils/controller/applicationController";
const path = require("path")
const fs = require("fs")
export class IndexController extends applicationController {
    constructor(){
        super();
    }

    index(){
        this.$_success()
    }
}
