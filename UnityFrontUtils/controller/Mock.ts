import applicationController from "./applicationController"
type Mock = {
    [key:string]:MockFun;
}
type MockFun = (this:applicationController)=>void;
const getId = ()=>Buffer.from(Date.now().toString()).toString("base64");
const MockFun:MockFun = function (){
    this.$_success("成功", {
        list:new Array(10).toString().split("").map(()=> {
            return {
                name:"asdas",
                id:getId(),
                title:"Asd",
                state:["-1","1","2","3"][Math.round(Math.random()*3)]
            }
        }),
        pageNo: 1,
        pageSize: 10,
        total: 600,
    },0);
}
const MockSuccess:MockFun = function (){

}
export default <Mock>{
    "v1\/pc\/news\/auditnews\/getMyAN":MockFun,
    "v1\/pc\/news\/auditnews\/getANType":MockFun,
}