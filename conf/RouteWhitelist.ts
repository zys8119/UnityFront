/**
 * @路由白名单,在白名单列表的接口不需要token
 * */
export default [
    "/User/Auth/login",
    "/User/Auth/register",
].map(e=>e.toLocaleLowerCase())