export default {
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
}
