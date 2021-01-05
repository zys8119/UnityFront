<template>
    <div class="buy-it">
        <template>
            <div class="item doc" @click="open('https://hooray.gitee.io/fantastic-admin/')">
                <svg-icon name="fixed-right-doc" />
                <span class="title">文档</span>
            </div>
            <div class="item code" @click="open('https://gitee.com/hooray/fantastic-admin/')">
                <svg-icon name="fixed-right-code" />
                <span class="title">源码</span>
            </div>
        </template>
    </div>
</template>

<script>
export default {
    methods: {
        open(url) {
            window.open(url, 'top')
        }
    }
}
</script>

<style lang="scss" scoped>
.buy-it {
    position: fixed;
    right: 0;
    top: 50%;
    margin-top: -120px;
    width: 60px;
    display: flex;
    flex-direction: column;
    .item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 60px;
        text-align: center;
        color: #fff;
        background-color: #409eff;
        border-bottom: 1px solid #fff;
        transition: 0.3s;
        opacity: 0.6;
        cursor: pointer;
        &:hover {
            opacity: 1;
        }
        &:first-child {
            border-top-left-radius: 5px;
        }
        &:last-child {
            border-bottom-left-radius: 5px;
            border-bottom: 0;
        }
        &.buy {
            border-radius: 0;
            border-bottom: 1px solid #fff;
            background-color: #ff4200;
        }
        &.doc {
            background-color: #727272;
        }
        &.code {
            background-color: #343b42;
        }
        .svg-icon {
            display: block;
            margin: 0 auto;
            font-size: 20px;
        }
        .title {
            display: inline-block;
            font-size: 12px;
        }
    }
}
.pay {
    text-align: center;
    .wechat,
    .alipay {
        display: inline-block;
        width: 160px;
        margin: 10px 10px;
        padding: 20px 20px 0;
        color: #fff;
        border-radius: 4px;
        &::after {
            display: block;
            height: 40px;
            line-height: 36px;
            font-size: 14px;
            font-weight: bold;
            text-align: center;
        }
    }
    .wechat {
        background-color: #22ab38;
        &::after {
            content: '请使用微信支付';
        }
    }
    .alipay {
        background-color: #1678ff;
        &::after {
            content: '请使用支付宝支付';
        }
    }
    .info {
        line-height: 20px;
        p {
            margin: 10px;
        }
    }
}
</style>
