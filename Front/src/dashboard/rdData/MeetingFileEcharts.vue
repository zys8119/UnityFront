<template>
    <div class="meeting-Echarts">
        <Echarts :data="{}" type="MeetingFileEcharts" height="100%"></Echarts>
    </div>
</template>

<script>
    import { Echarts } from "@/components"
    export default {
        name: "meeting-Echarts",
        title:"人大数据-会议文件图表",
        components:{ Echarts },
        props:{
            getStyle:{type:Object,default:Object}
        }
    }
</script>

<style scoped lang="less">
.meeting-Echarts{
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
}
</style>