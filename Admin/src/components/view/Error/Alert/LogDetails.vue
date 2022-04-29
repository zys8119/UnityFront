<template>
    <div class="LogDetails">
        基本信息
        {{ info }}
    </div>
</template>

<script>
export default {
    name: "LogDetails",
    props:{
        info:{
            type:Object,
            default:()=>({})
        }
    }
}
</script>

<style scoped lang="less">
.LogDetails {
}
</style>
