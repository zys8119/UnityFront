export default {
    list(data){
        return this.axios({
            url:"/AuthorityManagement/Menu/list",
            method:"get",
            data,
        })
    },
    add(data){
        return this.axios({
            url:"/AuthorityManagement/Menu/add",
            method:"post",
            data,
        })
    },
    delete(data){
        return this.axios({
            url:"/AuthorityManagement/Menu/delete",
            method:"post",
            data,
        })
    },
    update(data){
        return this.axios({
            url:"/AuthorityManagement/Menu/update",
            method:"put",
            data,
        })
    }
}