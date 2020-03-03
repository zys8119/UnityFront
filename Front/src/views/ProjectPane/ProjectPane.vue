<template>
    <div class="ProjectPane">
        <unity-front-layout-title title="元件"></unity-front-layout-title>
        <uf-box>
            <project-grid></project-grid>
        </uf-box>
    </div>
</template>

<script>
    import UnityFrontLayoutTitle from "@/components/layout/UnityFrontLayoutTitle"
    import { UfBox, ProjectGrid } from "@/components"

    export default {
        name: "ProjectPane",
        components:{ UnityFrontLayoutTitle, UfBox, ProjectGrid },
    }
</script>

<style scoped lang="less">
    .ProjectPane {
        position: relative;
        height: 70%;
        height: ~"calc(100% - 150px)";
    }
</style>
