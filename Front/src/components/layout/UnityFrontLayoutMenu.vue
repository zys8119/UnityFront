<template>
    <div class="UnityFrontLayoutMenu">
        <ul>
            <li v-for="item in MenuList" v-dragdrop>
                <div>{{item.title}}</div>
                <unity-front-layout-menu-item v-if="item.chlid && item.chlid.length > 0" :list="item.chlid"></unity-front-layout-menu-item>
            </li>
        </ul>
        <div class="UnityFrontLayoutMenuTool">
            <span class="iconfont" @click="$utils.fullScreen" v-if="!airforce.isFull">&#xe640;</span>
            <span class="iconfont" @click="$utils.exitFullscreen" v-else>&#xe637;</span>
        </div>
    </div>
</template>

<script>
    import UnityFrontLayoutMenuItem from "./UnityFrontLayoutMenuItem"
    export default {
        name: "UnityFrontLayoutMenu",
        components:{
            UnityFrontLayoutMenuItem
        },
        data(){
            return {
                MenuList:[
                    { title:"文件" ,chlid:[]},
                    { title:"编辑" },
                    { title:"资源" },
                    { title:"UnityFront对象" },
                    { title:"窗口" },
                    { title:"帮助" ,chlid:[
                        {title:"关于UnityFront",run:item=>{
                             this.$ZAlert.show({
                                 title:"关于UnityFront",
                                 components: "About/About",
                                 width:"500px"
                             });
                        }}
                    ]},
                ]
            }
        }
    }
</script>

<style scoped lang="less">
    @import "../../assets/less/vars";
    .UnityFrontLayoutMenu {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        background-color: #FFFFFF;
        line-height: @UnityFrontLayoutMenuHeight;
        z-index: 1;
        height: @UnityFrontLayoutMenuHeight;
        ul{
            height: @UnityFrontLayoutMenuHeight;
            width: 100%;
            li{
                float: left;
                padding: 0 30px;
                position: relative;
                &:hover{
                    background-color: #cce8ff;
                    .UnityFrontLayoutMenuItem{
                        display: block;
                    }
                }
            }
        }
        .mediaInit(@maxWidth,@index){
            @media (max-width: @maxWidth) {
                ul{
                    li{
                        padding: 0 @index;
                    }
                }
            }
        }
        .mediaInit(600px,25px);
        .mediaInit(550px,20px);
        .mediaInit(400px,15px);
        .mediaInit(350px,10px);
        .mediaInit(300px,5px);
        .UnityFrontLayoutMenuTool{
            position: absolute;
            right: 15px;
            top: 0;
            .iconfont{
                font-size: 25px;
                color: #999999;
                &:hover{
                    color: @themeLogoColor;
                    cursor: pointer;
                }
            }
            @media  (max-width: 480px){
                display: none;
            }
        }
    }
</style>
