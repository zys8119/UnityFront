export default {
    list(data){
        return this.axios({
            url:"/LogUp/Index/list",
            method:"get",
            data,
        })
    },
    delete(data){
        return this.axios({
            url:"/LogUp/Index/delete",
            method:"post",
            data,
        })
    },
    get(data){
        return this.axios({
            url:"/LogUp/Index/get",
            method:"get",
            data,
        })
    }
}
