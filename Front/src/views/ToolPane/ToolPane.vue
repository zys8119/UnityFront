<template>
    <div class="ToolPane">
        <unity-front-layout-title title="工具"></unity-front-layout-title>
        <uf-box>
            <div v-for="i in 100">{{i}}</div>
        </uf-box>
    </div>
</template>

<script>
    import UnityFrontLayoutTitle from "@/components/layout/UnityFrontLayoutTitle"
    import UfBox from "@/components/UfBox"
    export default {
        name: "ToolPane",
        components:{ UnityFrontLayoutTitle, UfBox }
    }
</script>

<style scoped lang="less">
    .ToolPane {
        position: relative;
        height: 70%;
    }
</style>
