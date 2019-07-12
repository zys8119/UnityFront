<template>
    <div class="UfColor">
        <p class="msg">背景</p>
        <div class="color" :style="{backgroundColor:color}">
            <div class="color-sketch-select">
                <color-sketch v-model="color" :presetColors="[]"></color-sketch>
            </div>
        </div>
    </div>
</template>

<script>
    import { Flexbox, FlexboxItem } from "vux"
    export default {
        name: "UfColor",
        components:{ Flexbox, FlexboxItem },
        data(){
            return {
                color:'#f00',
            }
        }
    }
</script>

<style scoped lang="less">
    .UfColor {
        @index:30px;
        line-height: @index;
        .msg{
            float: left;
        }
        .color{
            width: @index;
            height: @index;
            float: left;
            margin-left: 15px;
            cursor: pointer;
            box-shadow: inset 0 0 3px #000000;
            position: relative;
            .color-sketch-select{
                position: absolute;
                top:@index ;
                left: -(220px - @index);
                z-index: 1;
            }
        }
    }
</style>
