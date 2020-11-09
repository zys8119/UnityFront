import vue from "vue"
import vueRouter, { RouterOptions } from "vue-router"
vue.use(vueRouter)
export default new vueRouter(<RouterOptions>{
    routes : [
        {
            path:"/",
        }
    ]
})