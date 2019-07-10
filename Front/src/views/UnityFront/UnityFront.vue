<template>
    <div class="UnityFront">
        <unity-front-layout-menu></unity-front-layout-menu>
        <unity-front-layout-tool></unity-front-layout-tool>
        <unity-front-layout-component-pane></unity-front-layout-component-pane>
        <unity-front-layout-view></unity-front-layout-view>
    </div>
</template>

<script>
    import { UnityFrontLayoutMenu, UnityFrontLayoutTool, UnityFrontLayoutComponentPane, UnityFrontLayoutView } from "@/components/layout"
    export default {
        name: "UnityFront",
        components:{
            UnityFrontLayoutMenu,
            UnityFrontLayoutTool,
            UnityFrontLayoutComponentPane,
            UnityFrontLayoutView
        }
    }
</script>

<style scoped lang="less">
    .UnityFront {
    }
</style>
