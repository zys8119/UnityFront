<template>
    <div class="weather">
        <span :class="`icon ${today.icon}`"></span>
        {{today.wea}}
        {{today.tem}}
    </div>
</template>

<script>
    export default {
        name: "weather",
        title:"天气",
        data(){
            return {
                today:{}
            }
        },
        mounted() {
            this.api().bigdata_weather("宁波").then(res=>{
                if(res.code === 200){
                    this.today = res.data.today
                }
            })
        }
    }
</script>

<style scoped lang="less">
.weather{
    color: #ffffff;
    line-height: 28px;
    overflow: hidden;
    .icon {
        background-image: url(https://i.tq121.com.cn/i/weather2015/png/white30.png);
        height: 30px;
        width: 30px;
        display: none;
        float: left;
        margin-right: 5px;
    }
    .d00 {background-position: 0 0;display: inline-block;}
    .d01 {background-position: -80px 0;display: inline-block;}
    .d02 {background-position: -160px 0;display: inline-block;}
    .d03 {background-position: -240px 0;display: inline-block;}
    .d04 {background-position: -320px 0;display: inline-block;}
    .d05 {background-position: -400px 0;display: inline-block;}
    .d06 {background-position: -480px 0;display: inline-block;}
    .d07 {background-position: -560px 0;display: inline-block;}
    .d08 {background-position: -640px 0;display: inline-block;}
    .d09 {background-position: -720px 0;display: inline-block;}
    .d10 {background-position: -800px 0;display: inline-block;}
    .d11 {background-position: -880px 0;display: inline-block;}
    .d12 {background-position: 0 -80px;display: inline-block;}
    .d13 {background-position: -80px -80px;display: inline-block;}
    .d14 {background-position: -160px -80px;display: inline-block;}
    .d15 {background-position: -240px -80px;display: inline-block;}
    .d16 {background-position: -320px -80px;display: inline-block;}
    .d17{background-position: -400px -80px;display: inline-block;}
    .d18 {background-position: -480px -80px;display: inline-block;}
    .d19 {background-position: -560px -80px;display: inline-block;}
    .d20{background-position: -640px -80px;display: inline-block;}
    .d21 {background-position: -720px -80px;display: inline-block;}
    .d22 {background-position: -800px -80px;display: inline-block;}
    .d23 {background-position: -880px -80px;display: inline-block;}
    .d24 {background-position: 0 -160px;display: inline-block;}
    .d25 {background-position:  -80px -160px;display: inline-block;}
    .d26 {background-position: -160px -160px;display: inline-block;}
    .d27 {background-position: -240px -160px;display: inline-block;}
    .d28 {background-position: -320px -160px;display: inline-block;}
    .d29 {background-position: -400px -160px;display: inline-block;}
    .d30 {background-position: -480px -160px;display: inline-block;}
    .d31{background-position: -560px -160px;display: inline-block;}
    .d53 {background-position: -640px -160px;display: inline-block;}
    .d99 {background-position: -720px -160px;display: inline-block;}
    .d32 {background-position: -800px -160px;display: inline-block;}
    .d49 {background-position: -880px -160px;display: inline-block;}
    .d54 {background-position: 0 -240px;display: inline-block;}
    .d55 {background-position: -80px -240px;display: inline-block;}
    .d56 {background-position: -160px -240px;display: inline-block;}
    .d57 {background-position: -240px -240px;display: inline-block;}
    .d58 {background-position: -320px -240px;display: inline-block;}
    .d301 {background-position: -400px -240px;display: inline-block;}
    .d302 {background-position: -480px -240px;display: inline-block;}
}
</style>