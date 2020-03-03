<template>
    <div class="ComponentPane">
        <unity-front-layout-title title="缩略图"></unity-front-layout-title>
        <uf-box>
            <img class="thumbnail" :src="airforce.UnityFrontView.image">
        </uf-box>
    </div>
</template>

<script>
    import UnityFrontLayoutTitle from "@/components/layout/UnityFrontLayoutTitle"
    import { UfBox, ComponentTree } from "@/components"
    export default {
        name: "ComponentPane",
        components:{ UnityFrontLayoutTitle, UfBox, ComponentTree },
        provide(){
            return {
                treeData:this.list,
            }
        },
        data(){
            return {
                list:[
                ]
            }
        }
    }
</script>

<style scoped lang="less">
    .ComponentPane {
        position: relative;
        height: 150px;
        .thumbnail{
            position: absolute;
            left: 50%;
            bottom: 50%/2;
            width: 90%;
            max-height: 90%;
            max-height: ~"calc(100% - 50px)";
            transform: translate(-50%,50%/2);
        }
    }
</style>
