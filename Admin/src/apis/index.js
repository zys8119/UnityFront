import Vue from "vue"
import user from "./user"
import upload from "./upload"
import AuthorityManagement from "./AuthorityManagement"
import Doc from "./Doc"
import LogNakadai from "./LogNakadai"
import LogUp from "./LogUp"
const api = {
    user,
    upload,
    AuthorityManagement,
    Doc,
    LogNakadai,
    LogUp,
}
const apiClass = class {
    constructor() {
    }
}

class apiProxy {
    constructor(obj) {
        return new Proxy(obj,{
            get(obj, prop){
                switch (Object.prototype.toString.call(obj[prop])){
                case "[object Object]":
                    return  new apiProxy(obj[prop]);
                case "[object Function]":
                    return obj[prop].bind(Vue.prototype);
                default:
                    return obj[prop];
                }
            }
        });
    }
}
apiClass.prototype = new apiProxy(api);
export default apiClass
