<template>
    <div class="ComponentView">
        <unity-front-layout-title title="组件预览"></unity-front-layout-title>
        <uf-box>
            <div v-for="i in 100">{{i}}</div>
        </uf-box>
    </div>
</template>

<script>
    import UnityFrontLayoutTitle from "@/components/layout/UnityFrontLayoutTitle"
    import UfBox from "@/components/UfBox"
    export default {
        name: "ComponentView",
        components:{ UnityFrontLayoutTitle, UfBox }
    }
</script>

<style scoped lang="less">
    .ComponentView {
        position: relative;
        height: 30%;
    }
</style>
