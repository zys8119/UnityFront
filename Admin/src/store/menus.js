export default [
    {
        title:"首页",
        path:"/home",id:"1",
        children:[]
    },
    {
        title:"系统管理",
        path:"/system-management/authority-management/menu-management",id:"2",
        children:[
            {title:"权限管理",id:"3", path:"/system-management/authority-management/menu-management",children:[
                {title:"菜单管理",id:"4", path:"/system-management/authority-management/menu-management"},
            ]},
        ]
    }
]