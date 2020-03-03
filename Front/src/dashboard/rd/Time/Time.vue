<template>
    <div class="Time">
        <span class="iconfont" v-if="icon">&#xe73c;</span>
        <span>{{time}}</span>
    </div>
</template>

<script>
    import { dateFormat } from "vux"
    export default {
        name: "Time",
        title:"时间",
        props:{
            icon:{type:Boolean,default:false},
            fmt:{type:String,default:"YYYY-MM-DD HH:mm:ss"},
        },
        data(){
            return {
                time:"",
                week:"",
                sc:"",
            }
        },
        mounted() {
            this.init();
            setInterval(()=>{
                this.init();
            },1000);
        },
        methods:{
            init(){
                let date = new Date;
                let hour = date.getHours();
                this.week = ["星期一","星期二","星期三","星期四","星期五","星期六","星期日"][date.getDay()];
                if(hour >= 0 && hour < 5){this.sc = '凌晨';}
                else if(hour > 5 && hour <= 7){this.sc = '早上';}
                else if(hour > 7 && hour <= 11){this.sc = '上午';}
                else if(hour > 11 && hour <= 13){this.sc = '中午';}
                else if(hour> 13 && hour <= 18){this.sc = '下午';}
                else if(hour > 18 && hour <= 23){this.sc = '晚上';}
                this.time = dateFormat(date,this.fmt);
            }
        }
    }
</script>

<style scoped lang="less">
.Time{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    color: #ffffff;
    text-align: center;
    span{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        width: 100%;
    }
}
</style>