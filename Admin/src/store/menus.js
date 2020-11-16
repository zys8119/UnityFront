let id = 0;
const getId = ()=>{
    id += 1;
    return id.toString();
}
export default [
    {
        title:"首页",
        path:"/home",id:getId(),
        children:[]
    },
    {
        title:"系统管理",
        path:"/system-management/authority-management/menu-management",id:"2",
        children:[
            {title:"权限管理",id:getId(), path:"/system-management/authority-management/menu-management",children:[
                {title:"菜单管理",id:getId(), path:"/system-management/authority-management/menu-management"},
                {title:"菜单类型管理",id:getId(), path:"/system-management/authority-management/menu-type-management"},
            ]},
        ]
    }
]