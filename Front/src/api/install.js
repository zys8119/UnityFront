export default {
    install(){
        this.$vux.loading.show();
        this.action({
            moduleName:"install",
            method:"post",
            url:"/install/install/install",
            resthen:()=>{
                this.action({
                    moduleName: "install",
                    goods:null
                });
            }
        }).then(res=>{
            this.$vux.loading.hide();
        }).catch(err=>{
            this.$vux.loading.hide();
        })
    }
}
