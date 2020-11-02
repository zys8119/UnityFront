export default {
    /**
     *获取基础UI
     */
    getMenuUi(){
        return this.action({
            moduleName:"Menu_getMenuUi",
            method:"post",
            url:"Menu/getMenuUi",
            resthen:()=>{
                this.action({
                    moduleName: "Menu_getMenuUi",
                    goods:null
                });
            }
        });
    },
    /**
     *获取项目记录
     */
    getProjectList(){
        return this.action({
            moduleName:"getProjectList",
            method:"post",
            url:"Menu/getProjectList",
            resthen:()=>{
                this.action({
                    moduleName: "getProjectList",
                    goods:null
                });
            }
        });
    },
    /**
     *创建新项目
     */
    CreateNewProjects(){
        return this.action({
            moduleName:"CreateNewProjects_post",
            method:"post",
            url:"Menu/CreateNewProjects",
            data:this.airforce.CreateNewProjects,
            resthen:()=>{
                this.action({
                    moduleName: "CreateNewProjects_post",
                    goods:null
                });
            }
        });
    }
}
