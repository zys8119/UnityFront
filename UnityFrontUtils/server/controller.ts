import { ControllerInitDataOptions, SendDataOptions } from "../typeStript"
import {mysqlConfig, ServerConfig} from "../config";
import staticIndex from "../static";
const path = require("path");
const fs = require("fs");
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
                let filePath =  "../../application/Index/Controller/Index";
                let $methodName = "index";
                const Index = require(filePath);
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
                                let headers = JSON.parse(JSON.stringify(ServerConfig.headers));
                                for(let k in this.$_RequestHeaders){
                                    headers[k] = this.$_RequestHeaders[k];
                                };
                                let sendData = <SendDataOptions>{
                                    data:RequestData,
                                    RequestStatus:this.$_RequestStatus || ServerConfig.RequestStatus,
                                    headers
                                };
                                ControllerInitData[keyName](sendData);
                            }
                            break;
                        default:
                            Index.Index.prototype[keyName] = ControllerInitData[keyName];
                            break;
                    }
                };
                Index.Index.prototype.__dir = path.resolve(__dirname,filePath);
                Index.Index.prototype.$methodName = $methodName;
                new Index.Index().index();
                break;
            case '/favicon.ico':
                break;
            default:
                //todo ====开放资源目录==start
                new staticIndex(ControllerInitData,()=>{
                    //todo 其他路径处理
                    let urlArr = ControllerInitData.$_url.split("/").filter(e=>e.length > 0);
                    console.log(urlArr);
                    let filePath =  `../../application/${urlArr[0]}`;
                    if(!fs.existsSync(path.resolve(__dirname,filePath))){

                    };
                    ControllerInitData.$_send(<SendDataOptions>{
                        RequestStatus:200,
                        data:"asdad"
                    });
                });
                break;

        }
    }
}
