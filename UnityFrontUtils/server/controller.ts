import { ControllerInitDataOptions } from "../typeStript"
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
                    Index.Index.prototype[keyName] = ControllerInitData[keyName];
                };
                new Index.Index();
                break;
        }
    }
}
