export default {
    list(data){
        return this.axios({
            url:"/AuthorityManagement/RolesType/list",
            method:"get",
            data,
        })
    },
    add(data){
        return this.axios({
            url:"/AuthorityManagement/RolesType/add",
            method:"post",
            data,
        })
    },
    update(data){
        return this.axios({
            url:"/AuthorityManagement/RolesType/update",
            method:"put",
            data,
        })
    },
    delete(data){
        return this.axios({
            url:"/AuthorityManagement/RolesType/delete",
            method:"post",
            data,
        })
    }
}