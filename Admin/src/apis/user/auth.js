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
    getUserInfo(data){
        return this.axios({
            url:"/User/Auth/getUserInfo",
            method:"get",
            data,
        })
    },

    /**
     * 更新用户信息
     * @param data
     * @returns {*}
     */
    updateUserInfo(data){
        return this.axios({
            url:"/User/Auth/updateUserInfo",
            method:"post",
            data,
        })
    },

    /**
     * 用户列表
     * @param data
     * @returns {*}
     */
    list(data){
        return this.axios({
            url:"/User/Auth/list",
            method:"get",
            data,
        })
    },

    /**
     * 删除用户列表
     * @param data
     * @returns {*}
     */
    delete(data){
        return this.axios({
            url:"/User/Auth/delete",
            method:"post",
            data,
        })
    }
}