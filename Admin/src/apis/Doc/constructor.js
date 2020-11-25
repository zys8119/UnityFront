export default {
    /**
     * 获取api接口信息
     */
    index(data){
        return this.axios({
            url:"/Doc/Index/index",
            method:"get",
            data,
        })
    }
}