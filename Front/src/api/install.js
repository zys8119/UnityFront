export default {
    install(){
        this.$vux.loading.show();
        this.action({
            moduleName:"install_api",
            method:"post",
            url:"/install/install/install",
            data:this.airforce.install,
            resthen:()=>{
                this.action({
                    moduleName: "install_api",
                    goods:null
                });
            }
        }).then(res=>{
            console.log(res);
        })
    }
}
