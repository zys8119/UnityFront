<template>
    <div class="Device webkit-scrollbar">
        <div class="DeviceBox">
            <flexbox>
                <flexbox-item>
                    <div class="DeviceItem">
                        <x-circle class="x-circle"
                                  :percent="percent"
                                  :trail-width="width"
                                  :trail-color="colorBg"
                                  :stroke-width="width"
                                  :stroke-color="color">
                            <span class="percentText">平板使用率<br>{{ percent }}%</span>
                        </x-circle>
                    </div>
                </flexbox-item>
                <flexbox-item>
                    <div class="DeviceItem">
                        <div class="row"><span></span>平板设备：600台</div>
                        <div class="row"><span></span>代表设备：485台</div>
                        <div class="row"><span></span>备用设备：115台</div>
                    </div>
                </flexbox-item>
            </flexbox>
        </div>
    </div>
</template>

<script>
    import { XCircle, Flexbox, FlexboxItem } from 'vux'
    export default {
        name: "DeviceIndex",
        title:"设备统计",
        components: { XCircle, Flexbox, FlexboxItem },
        data(){
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
.Device{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    .DeviceBox{
        margin-top: 45px;
        .DeviceItem{
            width: 80%;
            margin: auto;
            .percentText{
                color: rgba(255, 255, 255, 1);
                font-size: 18px;
            }
            .row{
                color: rgba(255, 255, 255, 1);
                font-size: 16px;
                &+.row{
                    margin-top: 24px;
                }
            }
        }
    }
}
</style>