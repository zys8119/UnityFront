<template>
    <div class="UnityFrontLayoutTool">
        <tool-pane></tool-pane>
        <div class="borderLine" v-dragdrop dragdrop=".ToolPane"></div>
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
        width: @layoutWidth;
        height: ~"calc(100% - @{UnityFrontLayoutMenuHeight})";
        background-color: @themeColor2;
        border-left: @borderLine;
        z-index: 1;
        .dragdrop{
            position: absolute;
            left: -@borderLineWidth;
            top: 0;
            height: 100%;
            width: @borderLineWidth;
            z-index: 2;
            cursor: w-resize;
        }
        .borderLine{
            cursor: s-resize;
            position: relative;
            z-index: 3;
        }
    }
</style>
