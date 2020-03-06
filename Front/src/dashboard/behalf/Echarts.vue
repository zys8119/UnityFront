<template>
    <div class="Echarts webkit-scrollbar">
        <div class="EchartsBottom">
            <div class="EchartsBottomItem">
                <x-circle class="x-circle"
                        :percent="percent"
                        :trail-width="width"
                        :trail-color="colorBg"
                        :stroke-width="width"
                        :stroke-color="color">
                    <span :style="{fontSize:px(23,3)}">{{ percent }}%</span>
                </x-circle>
                <div class="msg" :style="{fontSize:px(16,3)}">接待率</div>
            </div>
            <div class="EchartsBottomItem">
                <x-circle class="x-circle"
                        :percent="percent"
                        :trail-width="width"
                        :trail-color="colorBg"
                        :stroke-width="width"
                        :stroke-color="color">
                    <span :style="{fontSize:px(23,3)}">{{ percent }}%</span>
                </x-circle>
                <div class="msg" :style="{fontSize:px(16,3)}">反馈率</div>
            </div>
            <div class="EchartsBottomItem">
                <x-circle class="x-circle"
                        :percent="percent"
                        :trail-width="width"
                        :trail-color="colorBg"
                        :stroke-width="width"
                        :stroke-color="color">
                    <span :style="{fontSize:px(23,3)}">{{ percent }}%</span>
                </x-circle>
                <div class="msg" :style="{fontSize:px(16,3)}">到访率</div>
            </div>
            <div class="EchartsBottomItem">
                <x-circle class="x-circle"
                        :percent="percent"
                        :trail-width="width"
                        :trail-color="colorBg"
                        :stroke-width="width"
                        :stroke-color="color">
                    <span :style="{fontSize:px(23,3)}">{{ percent }}%</span>
                </x-circle>
                <div class="msg" :style="{fontSize:px(16,3)}">完成率</div>
            </div>
        </div>
    </div>
</template>

<script>
    import { XCircle } from 'vux'
    export default {
        name: "Echarts1",
        title:"代表联络站",
        components: { XCircle },
        props:{
            px:Function
        },
        data() {
            return {
                percent:50,
                width:6,
                colorBg:'#283B4B',
                color:['#56E0E8',  '#8149F0',]
            }
        }
    }
</script>

<style scoped lang="less">
.Echarts{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    .EchartsBottom{
        overflow: hidden;
        .EchartsBottomItem{
            width: ~"calc(100% / 4 - 33px)";
            float: left;
            position: relative;
            text-align: center;
            margin-top: 15px;
            margin-left: 16px;
            &/deep/ .x-circle{
                width: 70%;
                display: inline-block;
                span{
                    color: #ffffff;
                    font-size:23px;
                }
            }
            .msg{
                text-align: center;
                margin-top: 27px;
                color: rgba(161, 172, 181, 1);
                font-size:16px;
            }
            &+.EchartsBottomItem{
                margin-left: 33px;
            }
        }
    }
}
</style>