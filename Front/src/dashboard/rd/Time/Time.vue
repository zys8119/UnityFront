<template>
    <div class="Time">
        <span>{{time}}</span>
    </div>
</template>

<script>
    import { dateFormat } from "vux"
    export default {
        name: "Time",
        title:"时间",
        data(){
            return {
                time:"",
                fmt:"YYYY-MM-DD HH:mm:ss"
            }
        },
        mounted() {
            this.time = dateFormat(new Date,this.fmt);
            setInterval(()=>{
                this.time = dateFormat(new Date,this.fmt);
            },1000);
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