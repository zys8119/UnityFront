/**
 * 全局控制器方法扩展
 */
import {ControllerInitDataOptions} from "../UnityFrontUtils/typeStript";
class Interceptor implements ControllerInitDataOptions{
    /**
     * Interceptor 全局拦截器
     * @constructor
     * @return { Promise } then 执行 、 catch 终止
     */
    Interceptor(){
        return Promise.resolve();
    }

    constructor() {
        // return true;
    }
};


export default Interceptor;