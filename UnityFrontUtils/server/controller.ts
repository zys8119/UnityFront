import { ControllerInitDataOptions } from "../typeStript"
import { ServerConfig } from "../config";

export default class controller{
    /**
     * 控制器入口
     * @param request //请求
     * @param response //返回
     * @param ControllerInitData //控制器初始化数据
     */
    constructor(request:any, response:any,ControllerInitData:ControllerInitDataOptions){
        switch (ControllerInitData.$_url) {
            case "/":
                const Index = require("../../application/Index/Controller/Index");
                for (let keyName in ControllerInitData){
                    switch (keyName) {
                        case "$_send":
                            Index.Index.prototype[keyName] = function (data) {
                                let RequestData = "";
                                if(this.$_RequestHeaders && this.$_RequestHeaders['Content-Type'] && this.$_RequestHeaders['Content-Type'].indexOf("text/json") > -1){
                                    RequestData = JSON.stringify(data);
                                }else {
                                    RequestData = data;
                                };
                                let sendData = {
                                    data:RequestData,
                                    RequestStatus:this.$_RequestStatus || ServerConfig.headers,
                                    headers:(<any>Object).assign(ServerConfig.headers,this.$_RequestHeaders)
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
