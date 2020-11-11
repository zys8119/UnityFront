export default {
    register(data){
        return this.axios({
            url:"/User/Auth/register",
            method:"post",
            data,
        })
    },
    login(){

    },
}