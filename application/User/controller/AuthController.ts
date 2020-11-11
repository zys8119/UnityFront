import {applicationController} from "../../../UnityFrontUtils/controller/applicationController";

export class AuthController extends applicationController{
    constructor() {
        super();
    }

    register(){
        this.$sqlModel.UserModel.update({
            password:this.$_body.password,
            username:this.$_body.username,
            email:this.$_body.email,
            id:this.$md5(`${this.$_body.password}-${this.$_body.password}-${Date.now()}`)
        })
        this.$_success(this.$_body)
    }
}