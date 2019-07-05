import applicationController from "../../index"
export class Index extends applicationController{
    constructor(){
        super();
        this.$_RequestHeaders = {
            'Content-Type': 'text/html; charset=utf-8',
        };
        this.$_send("<h1>Hello world1212</h1>");
    }
}
