export default {
    /**
     * 天气
     */
    bigdata_weather(cityName){
        this.$vux.loading.show();
        return this.action({
            moduleName:"bigdata",
            method:"get",
            url:"bigdata/weather",
            params:{
                q:cityName
            },
            resthen:()=>{
                this.action({
                    moduleName: "bigdata",
                    goods:null
                });
            }
        })
    }
}