import applicationController from "../../index"
export class Index extends applicationController{
    constructor(){
        super();
        this.DB();
        this.$_send("<h1 style='text-align: center'>Hello world1212</h1>");
    }
}
