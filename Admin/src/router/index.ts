import vue from "vue"
import vueRouter, { RouterOptions } from "vue-router"
vue.use(vueRouter)
export default new vueRouter(<RouterOptions>{
    routes : [
        {
            path:"*",
            redirect:"/",
        },
        {
            path:"/login",
            component:()=>import(<any>"@/components/view/Login/Login")
        },
        {
            path:"/",
            component:()=>import(<any>"@/components/layout/layout"),
            redirect:"home",
            meta:{
                isLogin:true
            },
            children:[
                {
                    path:"home",
                    component:()=>import(<any>"@/components/view/Home/Home"),
                }
            ]
        }
    ]
})