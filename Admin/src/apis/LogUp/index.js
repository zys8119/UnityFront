export default {
    get(data){
        return this.axios({
            url:"/LogUp/Index/get",
            method:"get",
            data,
        })
    }
}
