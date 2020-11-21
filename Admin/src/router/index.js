import vue from "vue"
import vueRouter from "vue-router"
const routerPush = vueRouter.prototype.push
vueRouter.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(error => error)
}
vue.use(vueRouter)
const bodyBaColor = "#e5e5e5";
const layout = ()=>import("@/components/layout/layout");
const layoutContentMain = ()=>import("@/components/layout/layoutContentMain");
export default new vueRouter({
    routes: [
        {
            path: "*",
            redirect: "/",
        },
        {
            path: "/login",
            component: () => import("@/components/view/Login/Login")
        },
        {
            path:"/",
            component:layout,
            redirect:"home",
            meta:{
                isLogin:true,
            },
            children:[
                {
                    path:"home",
                    title: "首页",
                    component:()=>import("@/components/view/Home/Home"),
                    meta:{
                        bodyBaColor,
                        footerShow:true,
                    }
                },
                {
                    path:"userInfo",
                    title: "用户中心",
                    component:()=>import("@/components/view/UserInfo/UserInfo"),
                    meta:{
                        bodyBaColor,
                    }
                },
                {
                    path:"system-management",
                    title:"系统管理",
                    redirect:"authority-management",
                    component:layoutContentMain,
                    meta:{
                        bodyBaColor,
                    },
                    children:[
                        {
                            path:"authority-management",
                            title:"权限管理",
                            redirect:"menu-management",
                            component:layoutContentMain,
                            meta:{
                                bodyBaColor,
                            },
                            children:[
                                {
                                    path:"menu-management",
                                    title:"菜单管理",
                                    component:()=>import("@/components/view/SystemManagement/AuthorityManagement/MenuManagement"),
                                    meta:{
                                        bodyBaColor,
                                    }
                                },
                                {
                                    path:"menu-type-management",
                                    title:"菜单分类管理",
                                    component:()=>import("@/components/view/SystemManagement/AuthorityManagement/MenuTypeManagement"),
                                    meta:{
                                        bodyBaColor,
                                    }
                                },
                                {
                                    path:"roles-type-management",
                                    title:"角色分类管理",
                                    component:()=>import("@/components/view/SystemManagement/AuthorityManagement/RolesTypeManagement"),
                                    meta:{
                                        bodyBaColor,
                                    }
                                },
                                {
                                    path:"roles-management",
                                    title:"角色管理",
                                    component:()=>import("@/components/view/SystemManagement/AuthorityManagement/RolesManagement"),
                                    meta:{
                                        bodyBaColor,
                                    }
                                },
                                {
                                    path:"roles-permission-settings",
                                    title:"角色权限设置",
                                    component:()=>import("@/components/view/SystemManagement/AuthorityManagement/RolesPermissionSettings"),
                                    meta:{
                                        bodyBaColor,
                                    }
                                },
                                {
                                    path:"users-management",
                                    title:"用户管理",
                                    component:()=>import("@/components/view/SystemManagement/AuthorityManagement/UsersManagement"),
                                    meta:{
                                        bodyBaColor,
                                    }
                                },
                            ]
                        },
                    ]
                }
            ]
        }
    ]
})