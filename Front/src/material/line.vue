<template>
    <div class="line" :style="{
        background:`linear-gradient(to right, rgba(0,0,0,0),${config.info.style.color},rgba(0,0,0,0))`,
        height:getStyle.height
    }"></div>
</template>

<script>
    export default {
        name: "line",
        props:{
            config:{type:Object,default:Object},
            getStyle:{type:Object,default:Object},
        }
    }
</script>

<style scoped lang="less">
.test{

}
</style>