import RouteWhitelist,{DomainWhitelist} from "./Whitelist";
/**
 * 全局控制器方法扩展注入
 * 这里声明的方法或属性，将会被所有应用调用，开放开发者自由封装
 *
 * 备注：Interceptor 是独占字段，不建议当作控制器方法使用，
 * 该字段存在，且类型为方法时，将被默认为拦截器调用
 */
import {ControllerInitDataOptions} from "../UnityFrontUtils/typeStript";
import {ServerConfig, ServerPublicConfig} from "../UnityFrontUtils/config";
class Interceptor implements ControllerInitDataOptions{
    $_success(msg?: any, sendData?: any, code?: number): void {
    }
    $_error(msg?: any, sendData?: any, code?: number): void {
    }
    $_headers:any;
    $_decode(str: string, newKey?: string): any {
    }
    userInfo:any;
    $_method:any;
    $_url:string;

    /**
     * Interceptor 全局拦截器注入
     * @constructor
     * @return { Promise } then 执行 、 catch 终止
     */
    Interceptor(){
        const code = 110001;// 退出登录
        if(this.$_headers['token']){
            try {
                const token = this.$_decode(this.$_headers['token']);
                if(token){
                    const tokenInfo = token.split("-");
                    const time = parseInt(tokenInfo[3]);
                    if(isNaN(time)){
                        this.$_error("无效token", null, code);
                        return Promise.reject()
                    }
                    if(Date.now() > time){
                        this.$_error("用户token已过期，请重新登录", null, code);
                        return Promise.reject();
                    }
                    // @ts-ignore
                    this.userInfo = new Map(tokenInfo.map((e,k)=>([{
                        0:"username",
                        1:"password",
                        2:"id",
                        3:"time",
                        4:"salt",
                    }[k],e])));
                    if(this.userInfo.get("salt") !== ServerPublicConfig.token_salt){
                        this.$_error("无效token，请重新登录", null, code);
                        return  Promise.reject();
                    }
                    // 域名白名单判断
                    if(ServerConfig.DomainWhite && this.$_headers['origin']){
                        const dw = (<any>DomainWhitelist).findIndex(d=>d === this.$_headers['origin'].toLocaleLowerCase());
                        if(dw === -1){
                            this.$_error("权限不足", null, code);
                            return Promise.reject();
                        }
                    }
                    return Promise.resolve();
                }else {
                    this.$_error("无效token", null, code);
                }
            }catch (e){
                console.error("token解析失败");
                console.error(e);
                this.$_error("拦截器错误", null, code);
            }
            return Promise.reject()
        }else {
            // 接口白名单判断
            if(this.$_method.toLocaleLowerCase() !== 'options'){
                const rw = (<any>RouteWhitelist).find(e=>this.$_url.toLocaleLowerCase().indexOf(e) === 0);
                if(rw){
                    // 域名白名单判断
                    if(ServerConfig.DomainWhite && this.$_headers['origin']){
                        const dw = (<any>DomainWhitelist).findIndex(d=>d === this.$_headers['origin'].toLocaleLowerCase());
                        if(dw === -1){
                            this.$_error("权限不足", null, code);
                            return Promise.reject();
                        }
                    }
                    // @ts-ignore
                    this.userInfo = new Map();
                    return Promise.resolve();
                }else {
                    this.$_error("权限不足", null, code);
                    return Promise.reject();
                }
            }
        }
        // @ts-ignore
        this.userInfo = new Map();
        return Promise.resolve();
    }

    constructor() {
        // return true;
    }
};


export default Interceptor;
