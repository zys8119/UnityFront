import applicationController from "../../index"
export class Index extends applicationController{
    constructor(){
        super();
        Promise.all([
            this.DB({
                host: '192.168.6.23',
                user: 'root',
                password: 'abc123456',
                port: '3306',
                database: 'user_center',
            }).select().from("auto_brand").where({id:2167}).query(),
            this.DB()
                .select()
                .from("aa")
                .query()
        ]).then(res=>{
           this.$_send(res);
        })
    }
}
