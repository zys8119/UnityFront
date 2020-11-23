import axios from "axios"
import {Message} from "element-ui"
import store from "store-vue"
import storeConfigData from "@/store/index"
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
            baseURL:storeConfigData.baseUrl,
            withCredentials:true
        });
        this.request_interceptors();
        this.response_interceptors();
        return (options)=>{
            let data = options.data || {};
            let params = {};
            // isFormData
            if(options.isFormData){
                let fd = new FormData();
                for (let k in data){
                    switch (Object.prototype.toString.call(data[k])){
                        case "[object object]":
                            fd.append(k,JSON.stringify(data[k]));
                            break;
                        case "[object Array]":
                            data[k].forEach(item=>{
                                fd.append(k,item);
                            });
                            break;
                        default:
                            fd.append(k,data[k]);
                            break;
                    }
                }
                data = fd;
            }
            // get 处理
            if(options.method.toLocaleLowerCase() === "get"){
                params = data;
                data = {};
            }
            return this.AxiosInstance({
                ...options,
                data,
                params,
            })
        };
    }

    /**
     * 请求拦截
     */
    request_interceptors(){
        this.AxiosInstance.interceptors.request.use(config => {
            try {
                let login = store.state.airforce.login;
                if(login && login.code === 200 && login.data && login.data.token){
                    config.headers["token"] = login.data.token;
                    config.headers["token_url"] = window._this.$route.path;
                }
            }catch (e){
                //
            }
            return config;
        })
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
                    if(res.data && res.data.code === 110001){
                        // 退出登录
                        window._this.$utils.logout.call(window._this);
                    }
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