import axios from "axios"
import {Message} from "element-ui"
export default class {
    AxiosInstance
    constructor() {
        return this.create();
    }

    /**
     * 创建
     */
    create(){
        this.AxiosInstance = axios.create({
            baseURL:"http://localhost:81"
        });
        this.request_interceptors();
        this.response_interceptors();
        return this.AxiosInstance;
    }

    /**
     * 请求拦截
     */
    request_interceptors(){
    }

    /**
     * 响应拦截
     */
    response_interceptors(){
        this.AxiosInstance.interceptors.response.use(res => {
            if (res.status >= 200 && res.status <  300 ){
                // 正常响应
                // resolve(res.target);
                if(res.data && res.data.code === 200){
                    // 服务器内部正常请求
                    return res.data.data;
                }else {
                    // 服务器内部异常请求
                    Message.error(res.data.msg);
                    return Promise.reject(res.data);
                }
            }else {
                // 非正常响应
                Message.error("请求错误");
                return Promise.reject(res.data);
            }
        }, error => {
            Message.error("请求失败");
            return Promise.reject(error);
        })

    }
}