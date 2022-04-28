export default {
    list(data){
        return this.axios({
            url:"/LogNakadai/Application/list",
            method:"get",
            data,
        })
    },
    add(data){
        return this.axios({
            url:"/LogNakadai/Application/add",
            method:"post",
            data,
        })
    },
    update(data){
        return this.axios({
            url:"/LogNakadai/Application/update",
            method:"put",
            data,
        })
    },
    delete(data){
        return this.axios({
            url:"/LogNakadai/Application/delete",
            method:"post",
            data,
        })
    },
    get(data){
        return this.axios({
            url:"/LogNakadai/Application/get",
            method:"get",
            data,
        })
    },
}
