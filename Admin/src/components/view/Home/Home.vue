<template>
    <div class="Home">
        <div v-for="i in 200" :key="i">{{i}}</div>
    </div>
</template>

<script>
export default {
    name: "Home",
    mounted() {

    }
}
</script>

<style scoped lang="less">
.Home{

}
</style>