<template>
    <div class="UnityFrontLayoutTool webkit-scrollbar">
        <tool-pane></tool-pane>
        <div v-for="i in 100">{{i}}</div>
        <div class="borderLine"></div>
        <component-view></component-view>
        <div class="dragdrop" v-dragdrop dragdrop=".UnityFrontLayoutTool"></div>
    </div>
</template>

<script>
    import ToolPane from "@/views/ToolPane/ToolPane"
    import ComponentView from "@/views/ComponentView/ComponentView"
    export default {
        name: "UnityFrontLayoutTool",
        components:{
            ToolPane,
            ComponentView
        }
    }
</script>

<style scoped lang="less">
    @import "../../assets/less/vars";
    .UnityFrontLayoutTool {
        position: fixed;
        right: 0;
        top: @UnityFrontLayoutMenuHeight;
        width: 400px;
        height: ~"calc(100% - @{UnityFrontLayoutMenuHeight})";
        background-color: @themeColor2;
        border-left: @borderLine;
        .dragdrop{
            position: absolute;
            left: -@borderLineWidth;
            top: 0;
            height: 100%;
            width: @borderLineWidth;
            z-index: 2;
            cursor: w-resize;
        }
    }
</style>
