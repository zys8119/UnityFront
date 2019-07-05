import { ControllerInitDataOptions } from "../typeStript"
const url = require("url");
export default class controller{
    /**
     * 控制器入口
     * @param request //请求
     * @param response //返回
     * @param ControllerInitData //控制器初始化数据
     */
    constructor(request:any, response:any,ControllerInitData:ControllerInitDataOptions){
        console.log("===============",Date.now());
        switch (ControllerInitData.$_url) {
            case "/":
                const Index = require("../../application/Index/Controller/Index");
                for (let keyName in ControllerInitData){
                    switch (keyName) {
                        case "$_send":
                            console.log(ControllerInitData.$_RequestStatus,2222)
                            Index.Index.prototype[keyName] = function (data) {
                                let sendData = {
                                    data,
                                    RequestStatus:this.$_RequestStatus,
                                    headers:this.$_RequestHeaders
                                };
                                ControllerInitData[keyName](sendData);
                            }
                            break;
                        default:
                            Index.Index.prototype[keyName] = ControllerInitData[keyName];
                            break;
                    }
                };
                new Index.Index();
                break;
            case '/favicon.ico':
                break;
            default:
                let urlArr = ControllerInitData.$_url.split("/").filter(e=>e.length > 0);
                ControllerInitData.$_send("sdfsdf");
                break;
        }
    }
}
