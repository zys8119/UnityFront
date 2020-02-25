<template>
    <div class="UnityFrontLayoutView webkit-scrollbar">
        <unity-front-view></unity-front-view>
    </div>
</template>

<script>
    import UnityFrontView from "@/views/UnityFrontView/UnityFrontView"
    export default {
        name: "UnityFrontLayoutView",
        components:{
            UnityFrontView
        }
    }
</script>

<style scoped lang="less">
    @import "../../assets/less/vars";
    .UnityFrontLayoutView {
        position: fixed;
        background-color: @viewsColor;
        @index:400px + @borderLineWidth;
        left: @index;
        top: @UnityFrontLayoutMenuHeight;
        width: ~"calc(100% - @{index} -  @{index})";
        height: ~"calc(100% - @{UnityFrontLayoutMenuHeight})";
        overflow: hidden;
        &.toolShow{
            width: ~"calc(100% - @{index})";
        }
    }
</style>
