<template>
    <div class="HornyLine">
        <div v-for="i in index" :class="`HL HL_${i}`"
            :style="{
                borderWidth:config.info.style.borderWidth,
                borderColor:config.info.style.color
            }"
        ></div>
    </div>
</template>

<script>
    export default {
        name: "HornyLine",
        props:{
            config:{type:Object,default:Object},
            index:{type:Number,default:4},
        }
    }
</script>

<style scoped lang="less">
.HornyLine{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    .HL{
        position: absolute;
        @s:20px;
        width: @s;
        height: @s;
        border:2px solid #ffffff;
        &.HL_1{left: 0;top: 0;border-bottom: 0;border-right: 0}
        &.HL_2{left: 0;bottom: 0;border-top: 0; border-right: 0}
        &.HL_3{right: 0;top: 0;border-left: 0;border-bottom: 0}
        &.HL_4{right: 0;bottom: 0;border-top: 0;border-left: 0}
    }
}
</style>