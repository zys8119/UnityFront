export default {
    list(data){
        return this.axios({
            url:"/LogNakadai/ApplicationType/list",
            method:"get",
            data,
        })
    },
    add(data){
        return this.axios({
            url:"/LogNakadai/ApplicationType/add",
            method:"post",
            data,
        })
    },
    update(data){
        return this.axios({
            url:"/LogNakadai/ApplicationType/update",
            method:"put",
            data,
        })
    },
    delete(data){
        return this.axios({
            url:"/LogNakadai/ApplicationType/delete",
            method:"post",
            data,
        })
    },
}
