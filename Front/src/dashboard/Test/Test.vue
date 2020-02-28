<template>
    <div class="Test">
        <Echarts :data="test" :height="(getStyle.height.indexOf('%') > -1)? '100%':getStyle.height"></Echarts>
    </div>
</template>

<script>
    import {Echarts} from "@/components"

    export default {
        name: "Test",
        props:{
          getStyle:Object
        },
        components: {
            Echarts
        },
        data() {
            return {
                test: {
                    "super_title": "履职活动统计",
                    "title": "履职活动总数量：",
                    "total": 84,
                    "legend_data": ["履职活动数量", "履职活动参与人次"],
                    "x_data": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                    "series": [{
                        "name": "履职活动数量",
                        "data": [2, 1, 0, 0, 17, 1, 5, 11, 15, 12, 3, 17]
                    }, {"name": "履职活动参与人次", "data": [2, 477, 0, 0, 160, 1, 5, 19, 142, 156, 1, 62]}]
                }
            }
        }
    }
</script>

<style scoped lang="less">
    .Test {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    }
</style>