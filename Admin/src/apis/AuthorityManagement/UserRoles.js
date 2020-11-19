export default {
    get(data){
        return this.axios({
            url:"/AuthorityManagement/UserRoles/get",
            method:"get",
            data,
        })
    },
    update(data){
        return this.axios({
            url:"/AuthorityManagement/UserRoles/update",
            method:"put",
            data,
        })
    },
}