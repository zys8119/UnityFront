export default {
    /**
     * 注册
     * @param data
     * @returns {*}
     */
    register(data){
        return this.axios({
            url:"/User/Auth/register",
            method:"post",
            data,
        })
    },
    /**
     * 登陆
     * @param data
     * @returns {*}
     */
    login(data){
        return this.axios({
            url:"/User/Auth/login",
            method:"post",
            data,
        })
    },
    /**
     * 获取用户信息
     * @returns {*}
     */
    getUserInfo(){
        return this.axios({
            url:"/User/Auth/getUserInfo",
            method:"get",
        })
    }
}