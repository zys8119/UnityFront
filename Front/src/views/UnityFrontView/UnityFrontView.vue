<template>
    <div class="UnityFrontView">
        <unity-front-layout-title title="场景视图"></unity-front-layout-title>
        <div class="UnityFrontViewContent" ref="UnityFrontViewContent">

        </div>
    </div>
</template>

<script>
    import UnityFrontLayoutTitle from "@/components/layout/UnityFrontLayoutTitle"
    export default {
        name: "UnityFrontView",
        components:{ UnityFrontLayoutTitle },
        mounted() {
            this.$utils.windowAddMouseWheel((type,e)=>{
                console.log(type,e.target == this.$refs.UnityFrontViewContent);
            })
        }
    }
</script>

<style scoped lang="less">
    .UnityFrontView {
        &/deep/ .UnityFrontLayoutTitle{
            .UnityFrontLayoutTitleBox{
                z-index: 2;
            }
        }
        .UnityFrontViewContent{
            position: absolute;
            left: 0;
            top:0;
            top: ~"calc(32px)";
            width: 100%;
            height: 100%;
            height: ~"calc(100% - 32px)";
            background-color: #E59313;
        }
    }
</style>
