<template>
    <div class="About">
        <img :src="require('@/assets/lodo_text.png')">
        <p class="msg vux-1px-b">UnityFront前端可视化软件 <span>版本号：V {{version}}</span></p>
        <p class="msg box">
            UnityFront是一个前端可视化软件。<br>
            致力于未来前端的拖拽式开发模式，省去了前端开发消耗在Ui制作的时间，更快的开发出产品需要的Ui界面；<br>
            同时为组件化生成及个性化组件制作提供了更高效便捷的拖拽式存储功能。<br>
            UnityFront的服务端是由纯node开发的UnityFrontUtils服务框架作为支撑,这样在开发产品的同时，也为全站式
            开发模式打下了良好的基础，便于前端职业的发展与进步。
        </p>
    </div>
</template>

<script>
    export default {
        name: "About",
        data(){
            return {
                version:packageJson_version
            }
        }
    }
</script>

<style scoped lang="less">
    .About {
        img{
            width: 100%;
        }
        .msg{
            margin-top: 15px;
            overflow: hidden;
            padding-bottom: 15px;
            span{
                float: right;
            }
        }
    }
</style>
