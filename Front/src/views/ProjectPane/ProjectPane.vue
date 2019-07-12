<template>
    <div class="ProjectPane">
        <unity-front-layout-title title="项目" search></unity-front-layout-title>
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
        height: 30%;
        #div1 {width:198px; height:66px;padding:10px;border:1px solid #aaaaaa;}
    }
</style>
