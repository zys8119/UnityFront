<template>
    <div class="UnityFront">
        <unity-front-layout-menu></unity-front-layout-menu>
        <unity-front-layout-tool v-if="toolShow"></unity-front-layout-tool>
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
        },
        beforeDestroy() {
            this.$ZAlert.hide();
        },
        computed:{
            toolShow(){
                try {
                    return this.airforce.UnityFrontView.component.find(e=>e.operate);
                }catch (e) {
                    console.log(e)
                }
            }
        }
    }
</script>

<style scoped lang="less">
    .UnityFront {
    }
</style>
