import {applicationController} from "../../../UnityFrontUtils/controller/applicationController";

export class ServeDomeController extends applicationController{
    constructor() {
        super();
    }

    index(){
        this.DB()
            .select("roles.*, roles_type.name as type_str")
            .from("roles")
            .join({
                "roles_type":"roles.type = roles_type.id"
            })
            // .where({
            //     "roles.is_del":1,
            // })
            .like({
                "roles.name":"%管理%"
            })
            .AND()
            .concat({
                "roles.is_del >=": 1,
            })
            .query()
            .then(res=>{
                this.$_success(res);
            }).catch(err=>{
                this.$_error(err.message)
            })
    }
}