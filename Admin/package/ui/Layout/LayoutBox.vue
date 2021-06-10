<template>
    <div class="LayoutBox" :style="{margin:span}">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: "layout-box",
    props:{
        span:{type:Number,default:null}
    }
}
</script>

<style scoped lang="less">
.LayoutBox{
    margin: @unit15;
}
</style>