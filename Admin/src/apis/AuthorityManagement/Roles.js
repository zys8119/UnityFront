export default {
    list(data){
        return this.axios({
            url:"/AuthorityManagement/Roles/list",
            method:"get",
            data,
        })
    },
    add(data){
        return this.axios({
            url:"/AuthorityManagement/Roles/add",
            method:"post",
            data,
        })
    },
    update(data){
        return this.axios({
            url:"/AuthorityManagement/Roles/update",
            method:"put",
            data,
        })
    },
    delete(data){
        return this.axios({
            url:"/AuthorityManagement/Roles/delete",
            method:"post",
            data,
        })
    }
}