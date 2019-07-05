import applicationController from "../../index"
export class Index extends applicationController{
    constructor(){
        super();
        this.setRequestStatus(400);
        this.setHeaders({
            'Content-Type': 'text/html; charset=utf-8',
        });
        // this.$_RequestHeaders = null;
        this.$_send("<h1 style='text-align: center'>Hello world1212</h1>");
    }
}
