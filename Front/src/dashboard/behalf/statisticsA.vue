<template>
    <div class="statistics">
        <Echarts :data="{}" type="statisticsA" height="100%"></Echarts>
    </div>
</template>

<script>
    import { Echarts } from "@/components"
    export default {
        name: "statisticsA",
        title:"代表团履职统计",
        components:{ Echarts },
        props:{
            getStyle:{type:Object,default:Object}
        }
    }
</script>

<style scoped lang="less">
.statistics{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
}
</style>