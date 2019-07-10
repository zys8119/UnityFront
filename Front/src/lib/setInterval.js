import Utils from "../utils"
export default {
    isFull(){
        this.action({
            moduleName:"isFull",
            goods:Utils.isFull()
        })
    }
}
