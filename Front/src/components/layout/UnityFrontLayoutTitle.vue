<template>
    <div class="UnityFrontLayoutTitle">
        <div class="UnityFrontLayoutTitle">
            <p class="msg"><span>{{title}}</span></p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "UnityFrontLayoutTitle",
        props:{
            title:{
                type:String,
                default:null
            }
        }
    }
</script>

<style scoped lang="less">
    @import "../../assets/less/vars";
    .UnityFrontLayoutTitle {
        background-color: @themeColor;
        overflow: hidden;
        padding-top: 5px;
        padding-bottom: 2px;
        span{
            background-color: @themeColor2;
            line-height: 25px;
            float: left;
            margin-left: 2px;
            padding: 0 15px;
            border-radius: 5px 5px 0 0;
            box-shadow: 0 -2px 2px #000000;
        }
    }
</style>
