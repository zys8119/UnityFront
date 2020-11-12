<template>
    <div class="layoutHeaderMain">
        <div class="logo">
            <img src="/images/login/logo_text.png">
        </div>
        <ul class="conetntMenu">
            <li v-for="(item,key) in 100" :key="key">asda</li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "layoutHeaderMain"
}
</script>

<style scoped lang="less">
.layoutHeaderMain{
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
    .conetntMenu{
        flex: 1;
        color: #ffffff;
        overflow: hidden;
        li{
            float: left;
            line-height: @layoutHeader;
            padding: 0 @unit15;
            cursor: pointer;
            min-width: 100px;
            text-align: center;
            &:hover{
                background-color: tint(@themeColorBg,50%);
            }
        }
    }
}
</style>