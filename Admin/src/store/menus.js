export default [
    {
        title:"首页",
        path:"/home",
        children:[]
    },
    {
        title:"系统管理",
        path:"/system-management/authority-management/menu-management",
        children:[
            {title:"权限管理", path:"/system-management/authority-management/menu-management",children:[
                {title:"菜单管理", path:"/system-management/authority-management/menu-management"},
            ]},
        ]
    }
]