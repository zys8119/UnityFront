<template>
    <div class="Home">
        <el-button @click="$utils.logout.call(_self)">退出登录</el-button>
    </div>
</template>

<script>
export default {
    name: "Home",
    mounted() {
        this.apis.user.auth.login()
    }
}
</script>

<style scoped lang="less">
.Home{
}
</style>