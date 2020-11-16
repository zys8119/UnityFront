export default {
    list(data){
        return this.axios({
            url:"/AuthorityManagement/MenuType/list",
            method:"get",
            data,
        })
    },
    add(data){
        return this.axios({
            url:"/AuthorityManagement/MenuType/add",
            method:"post",
            data,
        })
    },
    update(data){
        return this.axios({
            url:"/AuthorityManagement/MenuType/update",
            method:"put",
            data,
        })
    },
    delete(data){
        return this.axios({
            url:"/AuthorityManagement/MenuType/delete",
            method:"post",
            data,
        })
    }
}