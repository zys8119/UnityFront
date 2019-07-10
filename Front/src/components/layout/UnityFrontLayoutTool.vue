<template>
    <div class="UnityFrontLayoutTool">
        <tool-pane></tool-pane>
        <div class="borderLine"></div>
        <component-view></component-view>
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
        overflow: hidden;
        background-color: @themeColor2;
        border-left: @borderLine;
    }
</style>
