/**
 * 全局控制器方法扩展注入
 * 这里声明的方法或属性，将会被所有应用调用，开放开发者自由封装
 *
 * 备注：Interceptor 是独占字段，不建议当作控制器方法使用，
 * 该字段存在，且类型为方法时，将被默认为拦截器调用
 */
import {ControllerInitDataOptions, $_public_success_log_callback_Data} from "../UnityFrontUtils/typeStript";
class Interceptor implements ControllerInitDataOptions{
    $_success(msg?: any, sendData?: any, code?: number): void {
    }
    $_error(msg?: any, sendData?: any, code?: number): void {
    }

    /**
     * Interceptor 全局拦截器注入
     * @constructor
     * @return { Promise } then 执行 、 catch 终止
     */
    Interceptor(){
        return Promise.resolve();
    }

    /**
     * 公共函数日志回调
     * @param data 回调数据
     */
    $_public_success_log_callback(data: $_public_success_log_callback_Data) {

    }

    constructor() {
        // return true;
    }
};


export default Interceptor;
