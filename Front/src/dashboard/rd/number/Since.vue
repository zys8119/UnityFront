<template>
    <div class="Since">
        <span v-for="i in value">{{i}}</span>
    </div>
</template>

<script>
    export default {
        name: "Since",
        title:"全市履职数量",
        data(){
            return {
                value:"2633"
            }
        }
    }
</script>

<style scoped lang="less">
.Since{
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