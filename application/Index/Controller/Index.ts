import applicationController from "../../index"
export class Index extends applicationController{
    constructor(){
        super();
        this.DB()
            .select()
            .from("aa")
            .query()
        .then(res=>{
            console.log(res);
            this.DB(true).select().from("aa").where({id:24}).query().then(ress=>{
                console.log(ress);
            });
            // this.$_send("<h1 style='text-align: center'>Hello world1212</h1>");
            this.$_send(res);
        });

    }
}
