<template>
    <div class="ComponentPane">
        <unity-front-layout-title title="组件"></unity-front-layout-title>
        <uf-box>
            <div v-for="i in 100">{{i}}</div>
        </uf-box>
    </div>
</template>

<script>
    import UnityFrontLayoutTitle from "@/components/layout/UnityFrontLayoutTitle"
    import UfBox from "@/components/UfBox"
    export default {
        name: "ComponentPane",
        components:{ UnityFrontLayoutTitle, UfBox }
    }
</script>

<style scoped lang="less">
    .ComponentPane {
        position: relative;
        height: 70%;
    }
</style>
