<template>
    <div class="ComponentPane">
        <unity-front-layout-title title="组件"></unity-front-layout-title>
        <uf-box>
            <component-tree :item="item" v-for="item,key in list" :key="key" init></component-tree>
        </uf-box>
    </div>
</template>

<script>
    import UnityFrontLayoutTitle from "@/components/layout/UnityFrontLayoutTitle"
    import { UfBox, ComponentTree } from "@/components"
    export default {
        name: "ComponentPane",
        components:{ UnityFrontLayoutTitle, UfBox, ComponentTree },
        data(){
            return {
                list:[
                    {name:"场景组件",open:false,child:[
                    ]}
                ]
            }
        }
    }
</script>

<style scoped lang="less">
    .ComponentPane {
        position: relative;
        height: 70%;
    }
</style>
