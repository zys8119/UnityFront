<template>
    <div class="Time">{{time}}</div>
</template>

<script>
    import { dateFormat } from "vux"
    export default {
        name: "Time",
        title:"时间",
        data(){
            return {
                time:"",
            }
        },
        mounted() {
            this.time = dateFormat(new Date);
            setInterval(()=>{
                this.time = dateFormat(new Date);
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
}
</style>