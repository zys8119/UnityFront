<template>
    <div class="Meeting">
        <span v-for="i in value">{{i}}</span>
    </div>
</template>

<script>
    export default {
        name: "Since",
        title:"本届会议数量",
        data(){
            return {
                value:"583"
            }
        },
        mounted() {
            setInterval(()=>{
                this.value = (parseInt(Math.random()*10000)).toString()
            },1000)
        }
    }
</script>

<style scoped lang="less">
.Meeting{
    color: #ffffff;
    span{
        float: left;
        width: 42px;
        line-height: 53px;
        text-align: center;
        background-color: #333F53;
        font-size: 44px;
        color: #57DFE7;
        &+span{
            margin-left: 4px;
        }
    }
}
</style>