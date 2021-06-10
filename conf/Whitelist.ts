/**
 * @白名单配置文件
 */

/**
 * @路由白名单,在白名单列表的接口不需要token
 * */
export default [
    "/User/Auth/login",
    "/User/Auth/register",
    "/User/Auth/VerificationCode",
].map(e=>e.toLocaleLowerCase())

/**
 * @域名白名单
 * */
export const DomainWhitelist = [
    "http://localhost:8081",
].map(e=>e.toLocaleLowerCase())