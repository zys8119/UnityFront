<template>
    <div class="ToolPane">
        <unity-front-layout-title title="工具"></unity-front-layout-title>
        <uf-box>
            <tool-form></tool-form>
        </uf-box>
    </div>
</template>

<script>
    import UnityFrontLayoutTitle from "@/components/layout/UnityFrontLayoutTitle"
    import { UfBox, ToolForm } from "@/components"
    export default {
        name: "ToolPane",
        components:{ UnityFrontLayoutTitle, UfBox, ToolForm }
    }
</script>

<style scoped lang="less">
    .ToolPane {
        position: relative;
        height: 70%;
    }
</style>
