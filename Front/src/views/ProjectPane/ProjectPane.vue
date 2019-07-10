<template>
    <div class="ProjectPane">
        <unity-front-layout-title title="项目"></unity-front-layout-title>
        <uf-box>
            <div v-for="i in 100">{{i}}</div>
        </uf-box>
    </div>
</template>

<script>
    import UnityFrontLayoutTitle from "@/components/layout/UnityFrontLayoutTitle"
    import UfBox from "@/components/UfBox"
    export default {
        name: "ProjectPane",
        components:{ UnityFrontLayoutTitle, UfBox }
    }
</script>

<style scoped lang="less">
    .ProjectPane {
        position: relative;
        height: 30%;
    }
</style>
