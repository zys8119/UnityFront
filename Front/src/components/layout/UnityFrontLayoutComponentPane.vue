<template>
    <div class="UnityFrontLayoutComponentPane">
        <component-pane></component-pane>
        <div class="borderLine" v-dragdrop dragdrop=".ComponentPane"></div>
        <project-pane></project-pane>
        <div class="dragdrop" v-dragdrop dragdrop=".UnityFrontLayoutComponentPane"></div>
    </div>
</template>

<script>
    import ComponentPane from "@/views/ComponentPane/ComponentPane"
    import ProjectPane from "@/views/ProjectPane/ProjectPane"
    export default {
        name: "UnityFrontLayoutComponentPane",
        components:{ ComponentPane, ProjectPane }
    }
</script>

<style scoped lang="less">
    @import "../../assets/less/vars";
    .UnityFrontLayoutComponentPane {
        position: fixed;
        left: 0;
        top: @UnityFrontLayoutMenuHeight;
        width: @layoutWidth;
        height: ~"calc(100% - @{UnityFrontLayoutMenuHeight})";
        background-color: @themeColor2;
        border-right: @borderLine;
        .dragdrop{
            position: absolute;
            right: -@borderLineWidth;
            top: 0;
            height: 100%;
            width: @borderLineWidth;
            z-index: 2;
            cursor: e-resize;
        }
        .borderLine{
            cursor: s-resize;
            position: relative;
            z-index: 2;
        }
    }
</style>
