// import { mysqlConfig } from "../../../UnityFrontUtils/config/index"
export default {
    $t:"zh-cn",
    install:{
        sql:{
            dataBaseName:"unity_front",
            prefix:"uf_",
        },
    },
    CreateNewProjects:{
        project_name:null,
        rmarks:null,
    },
    UnityFrontView:{
        // 视图组件
        component:[],
        scaleIndex:1,
        backgroundColor:"#0078ff",
        backgroundImage:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582621564603&di=cb8a28623ad45a988b9b34815768e70b&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Fback_pic%2F05%2F81%2F69%2F035c394e7d0aebd.jpg",
        left:0,
        top:0,
        width:1920,
        height:1080,
        title:"测试"
    },
    ProjectGrid:[
        {name:"图片",icon:"&#xe674;",type:"images"},
        {name:"布局",icon:"&#xe627;",type:"layout"},
        {name:"文字",icon:"&#xe69b;",type:"text"},
    ]
}
