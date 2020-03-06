<template>
    <div class="Echarts webkit-scrollbar">
        <div class="EchartsTop">
            <div class="EchartsTopItem">
                <div class="title" :style="{fontSize:px(18,5)}">代表总人数</div>
                <div class="nb" :style="{fontSize:px(45,3)}">485</div>
            </div>
            <div class="EchartsTopItem symbolBox" :style="{fontSize:px(40,1)}">
                <div class="symbol">=</div>
            </div>
            <div class="EchartsTopItem">
                <div class="title" :style="{fontSize:px(18,4)}">男士人数</div>
                <div class="nb" :style="{fontSize:px(45,3)}">485</div>
            </div>
            <div class="EchartsTopItem symbolBox">
                <div class="symbol" :style="{fontSize:px(40,1)}">+</div>
            </div>
            <div class="EchartsTopItem">
                <div class="title" :style="{fontSize:px(18,4)}">女士人数</div>
                <div class="nb" :style="{fontSize:px(45,3)}">485</div>
            </div>
        </div>
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
                <div class="msg" :style="{fontSize:px(16,5)}">代表变动率</div>
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
                <div class="msg" :style="{fontSize:px(16,5)}">本科学历占比</div>
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
                <div class="msg" :style="{fontSize:px(16,5)}">共产党占比</div>
            </div>
        </div>
    </div>
</template>

<script>
    import { XCircle } from 'vux'
    export default {
        name: "Echarts1",
        title:"代表统计图表",
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
    .EchartsTop{
        overflow: hidden;
        .EchartsTopItem{
            @w:50px;
            float: left;
            width: ~"calc((100% - (@{w} * 2))/3)";
            text-align: center;
            .title{
                font-size:18px;
                color:rgba(161,172,181,1);
                line-height:24px;
            }
            .symbol{
                color: #4B4F52;
                font-size: 40px;
                width: @w;
                text-align: center;
                line-height: 80px;
            }
            .nb{
                font-size:45px;
                color:rgba(87,223,233,1);
                line-height:47px;
                margin-top: 9px;
                font-family:LCDMonoNormal;
            }
            &.symbolBox{
              width: @w;
            }
        }
    }
    .EchartsBottom{
        overflow: hidden;
        .EchartsBottomItem{
            width: ~"calc(100% / 3 - 33px)";
            float: left;
            position: relative;
            text-align: center;
            margin-top: 35px;
            margin-left: 16px;
            &/deep/ .x-circle{
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