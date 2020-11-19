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
import {SqlModel} from "../model/interfaces";
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
    $sqlModel?:SqlModel;

    /**
     * Interceptor 全局拦截器注入
     * @constructor
     * @return { Promise } then 执行 、 catch 终止
     */
    Interceptor(){
        const code = 110001;// 退出登录，或拒绝访问
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
                    return new Promise((resolve, reject) => {
                        new this.$sqlModel.UserModel().select().from().where({
                            id:this.userInfo.get("id"),
                            status:1,
                        }).query().then(res=>{
                            if(res.length === 0){
                                this.$_error("无效token或用户不存在", null, code);
                                return reject();
                            }
                            //todo 是否开启token_url页面级别权限控制，建议开启，第一次开发时可以关闭，不然无法设置权限页面
                            if(ServerConfig.token_url){
                                // 账号页面权限控制
                                this.getUserRoles.call(this,res[0].id, true).then(Roles=>{
                                    let token_url = this.$_headers["token_url"];
                                    if(token_url && Roles.find(e=>token_url.toLocaleLowerCase().indexOf(e.url.toLocaleLowerCase()) === 0)){
                                        // @ts-ignore
                                        this.userInfo = new Map(Object.keys(res[0]).map(e=>([e,res[0][e]])));
                                        resolve();
                                    }else {
                                        this.$_error("权限不足, 请联系管理员!", null, code);
                                        reject();
                                    }
                                }).catch(()=>{
                                    this.$_error("权限不足或系统错误, 请联系管理员!", null, code);
                                    reject();
                                })
                            }else {
                                // @ts-ignore
                                this.userInfo = new Map(Object.keys(res[0]).map(e=>([e,res[0][e]])));
                                resolve();
                            }
                        }).catch(()=>{
                            this.$_error("权限不足或系统错误", null, code);
                            reject();
                        })
                    });
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



    /**
     * 获取用户角色权限
     */
    getUserRoles(id:string, child_page?:boolean):Promise<any> | any{
        if(!id){return this.$_error("【id】 字段必填")}
        return new Promise((resolve, reject) => {
            // 根据用户id获取用户角色组
            new this.$sqlModel.UserRolesModel().select().from().where({
                user_id:id,
                is_del:1
            }).query().then(res=>{
                if(res[0]){
                    // 根据角色组获取具体角色信息
                    let user_roles_id = res[0].user_roles_id.split(",").filter(e=>e);
                    let where:any = "";
                    user_roles_id.forEach((e,k)=>{
                        where += `id = ${e} ${(user_roles_id.length - 1) === k ? "" : "or "}`
                    });
                    if(where){
                        where = `(${where}) AND is_del = 1`
                    }else {
                        where = `is_del = 1`
                    }
                    new this.$sqlModel.RolesModel().select().from().where(where).query().then(res=>{
                        if(res.length > 0){
                            let roles_arr = res;
                            let where_roles:any = "";
                            roles_arr.forEach((e,k)=>{
                                where_roles += `roles_id = ${e.id} ${(roles_arr.length - 1) === k ? "" : "or "}`
                            });
                            if(where_roles){
                                where_roles = `(${where_roles}) AND is_del = 1`
                            }else {
                                where_roles = `is_del = 1`
                            }
                            // 根据角色信息获取角色权限组
                            new this.$sqlModel.RolesPermissionModel().select().from().where(where_roles).query().then(res=>{
                                if(res.length > 0){
                                    // @ts-ignore
                                    let permission = (<any>Array).from(new Set(res.map(e=>e.permission.split(",").filter(e=>e)).reduce((a,b)=>a.concat(b))));
                                    let where_permission:any = "";
                                    permission.forEach((e,k)=>{
                                        where_permission += `id = ${e} ${(permission.length - 1) === k ? "" : "or "}`
                                    });
                                    if(where_permission){
                                        where_permission = `(${where_permission}) AND is_del = 1 `
                                    }else {
                                        where_permission = `is_del = 1 `
                                    }
                                    if(!child_page){
                                        where_permission += ` AND is_child_page = 1`
                                    }
                                    // 根据角色权限组获取对应菜单权限
                                    new this.$sqlModel.MenuModel().select("*,name as title, url as path").from().where(where_permission).asc("id").query().then(res=>{
                                        resolve(res)
                                    }).catch(()=>reject())
                                }else {
                                    resolve([])
                                }
                            }).catch(()=>reject())
                        }else {
                            resolve([])
                        }
                    }).catch(()=>reject())
                }else {
                    resolve([])
                }
            }).catch(()=>reject())
        })
    }

    constructor() {
        // return true;
    }
};


export default Interceptor;
