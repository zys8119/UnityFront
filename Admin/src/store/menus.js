let id = 0;
const getId = ()=>{
    id += 1;
    return id.toString();
}

let menus = [];
if(process.env.NODE_ENV !== 'production'){
    menus = [
        {
            title:"系统管理",
            path:"/system-management/authority-management/menu-management",id:getId(),
            children:[
                {title:"权限管理",id:getId(), path:"/system-management/authority-management/menu-management",children:[
                    {title:"菜单管理",id:getId(), path:"/system-management/authority-management/menu-management"},
                    {title:"菜单类型管理",id:getId(), path:"/system-management/authority-management/menu-type-management"},
                    {title:"角色管理",id:getId(), path:"/system-management/authority-management/roles-management"},
                    {title:"角色分类管理",id:getId(), path:"/system-management/authority-management/roles-type-management"},
                    {title:"用户管理",id:getId(), path:"/system-management/authority-management/users-management"},
                ]},
            ]
        }
    ]
}
export default menus;