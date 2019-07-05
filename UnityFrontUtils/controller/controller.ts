import { ControllerInitDataOptions, SendDataOptions } from "../typeStript/index"
import {mysqlConfig, ServerConfig} from "../config/index";
import staticIndex from "../static/index";
import Utils from "../utils/index";
import {headersType} from "../typeStript/Types";
const path = require("path");
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
                this.ControllerParamesInit(request, response,ControllerInitData);
                break;
            case '/favicon.ico':
                break;
            default:
                //todo ====开放资源目录==start
                new staticIndex(ControllerInitData,()=>{
                    //todo 其他路径处理
                    this.ControllerParamesInit(request, response,ControllerInitData);
                });
                break;

        }
    }

    /**
     * 控制器参数初始化
     * @param request //请求
     * @param response //返回
     * @param ControllerInitData //控制器初始化数据
     */
    ControllerParamesInit(request:any, response:any,ControllerInitData:ControllerInitDataOptions){
        let filePath =  "./main";
        let $methodName = "index";
        const Main = require(filePath);
        for (let keyName in ControllerInitData){
            switch (keyName) {
                case "$_send":
                    Main.main.prototype[keyName] = function (data) {
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
                    };
                    break;
                default:
                    Main.main.prototype[keyName] = ControllerInitData[keyName];
                    break;
            }
        };
        Main.main.prototype.__dir = path.resolve(__dirname,filePath);
        Main.main.prototype.$methodName = $methodName;
        new Main.main().index();
    }
}
