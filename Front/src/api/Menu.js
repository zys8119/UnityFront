export default {
    getMenuUi(){
        return this.action({
            moduleName:"Menu_getMenuUi",
            method:"post",
            url:"Menu/getMenuUi",
            data:this.airforce.install,
            resthen:()=>{
                this.action({
                    moduleName: "Menu_getMenuUi",
                    goods:null
                });
            }
        });
    }
}
