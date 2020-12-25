import {applicationController} from "../../../UnityFrontUtils/controller/applicationController";

export class ServeDomeController extends applicationController{
    constructor() {
        super();
    }

    index(){
        this.DB()
            .select("a.*,b.*,b.id as id1, p.*")
            .from("user as a")
            .join({
                "user_roles as b":"a.id = b.user_id",
                "roles_permission as p":"p.roles_id REGEXP 4",
            })
            .where({
                "a.status": 1,
            })
            .query()
            .then(res=>{
                this.$_success(res);
            }).catch(err=>{
                this.$_error(err.message)
            })
    }
}