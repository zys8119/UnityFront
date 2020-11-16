export default {
    list(data){
        return this.axios({
            url:"/AuthorityManagement/Menu/list",
            method:"get",
            data,
        })
    }
}