<template>
    <div class="layoutHeaderMain">
        <div class="logo">
            <img src="/images/login/logo_text.png">
        </div>
    </div>
</template>

<script>
export default {
    name: "layoutHeaderMain"
}
</script>

<style scoped lang="less">
.layoutHeader{
    display: flex;
    .logo{
        height: @layoutHeader;
        width: @layoutAside;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        img{
            height: 90%;
            display: inline-block;
        }
    }
}
</style>