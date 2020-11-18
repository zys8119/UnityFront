export default {
    get(data){
        return this.axios({
            url:"/AuthorityManagement/RolesPermission/get",
            method:"get",
            data,
        })
    },
    add(data){
        return this.axios({
            url:"/AuthorityManagement/RolesPermission/add",
            method:"post",
            data,
        })
    },
    update(data){
        return this.axios({
            url:"/AuthorityManagement/RolesPermission/update",
            method:"put",
            data,
        })
    },
    delete(data){
        return this.axios({
            url:"/AuthorityManagement/RolesPermission/delete",
            method:"post",
            data,
        })
    }
}