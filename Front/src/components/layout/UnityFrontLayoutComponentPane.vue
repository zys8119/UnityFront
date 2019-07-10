<template>
    <div class="UnityFrontLayoutComponentPane">
        <component-pane></component-pane>
        <div class="borderLine"></div>
        <project-pane></project-pane>
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
        width: 400px;
        height: ~"calc(100% - @{UnityFrontLayoutMenuHeight})";
        overflow: hidden;
        background-color: @themeColor2;
        border-right: @borderLine;
    }
</style>
