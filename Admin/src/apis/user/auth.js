export default {
    register(data){
        return this.axios({
            url:"/User/Auth/register",
            method:"post",
            data,
        })
    },
    login(data){
        return this.axios({
            url:"/User/Auth/login",
            method:"post",
            data,
        })
    },
}