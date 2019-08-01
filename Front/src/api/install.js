export default {
    /**
     * 安装数据表
     */
    install(){
        this.$vux.loading.show();
        this.action({
            moduleName:"install_api",
            method:"post",
            url:"install/install",
            data:this.airforce.install,
            resthen:()=>{
                this.action({
                    moduleName: "install_api",
                    goods:null
                });
            }
        }).then(res=>{
            if(res.code == 200){
                this.$vux.toast.text(res.msg);
            }
        })
    },

    /**
     * 查询已安装的数据表
     */
    queryTableNameList(){
        this.$vux.loading.show();
        return this.action({
            moduleName:"queryTableNameList",
            method:"post",
            url:"install/queryTableNameList",
            data:this.airforce.install,
            resthen:()=>{
                this.action({
                    moduleName: "queryTableNameList",
                    goods:null
                });
            }
        })
    }
}
