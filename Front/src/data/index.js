export const MenuList = [
    { title:"文件" ,child:[
            { title:"保存" ,groupEnd:true ,icon:"&#xe612;",run:function () {
                this.save();
            }},
            { title:"创建新项目" ,icon:"&#xe60e;",run:function (item){
                this.$ZAlert.show({
                    title:"创建新项目",
                    components:"Alert/CreateNewProjects",
                    width:"500px",
                    props:{
                        vm:()=>this
                    }
                });
            }},
            { title:"打开项目" ,groupEnd:true ,icon:"&#xe669;",run:function () {
                this.$ZAlert.show({
                    title:"打开项目",
                    components: "Alert/OpenTheProject",
                    width:"500px",
                    props:{
                        vm:()=>this
                    }
                });
             }},
            { title:"打开记录",groupEnd:true ,icon:"&#xe64c;" , child:[
                ]},
            { title:"设置" ,icon:"&#xe621;",fontSize:"18px"},
            { title:"退出" ,icon:"&#xe673;" ,run:()=>{
                    window.close();
                }},
        ]},
    { title:"编辑",child:[
        { title:"创建UI" ,groupEnd:true ,child:[]}
    ] },
    { title:"资源" },
    { title:"UnityFront对象" },
    { title:"窗口" },
    { title:"帮助" ,child:[
        {title:"关于UnityFront" ,icon:"&#xe65d;",run:function () {
            this.$ZAlert.show({
                title:"关于UnityFront",
                components: "About/About",
                width:"500px"
            });
        }},
        {title:"初始化项目" ,icon:"&#xe62c;",run:function () {
            this.$router.push("/install");
        }}
    ]},
]
