<template>
    <div class="UnityFrontLayoutMenu">
        <ul>
            <li v-for="item in MenuList">
                <div>{{item.title}}</div>
                <unity-front-layout-menu-item v-if="item.child && item.child.length > 0" :list="item.child"></unity-front-layout-menu-item>
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
    import { MenuList } from "@/data"
    export default {
        name: "UnityFrontLayoutMenu",
        components:{
            UnityFrontLayoutMenuItem
        },
        data(){
            return {
                MenuList:_.cloneDeep(MenuList)
            }
        },
        mounted() {
            try {
                this.api().getMenuUi().then(res=>{
                    if(res.code == 200){
                        this.MenuList[1].child[0].child = res.data.map(e=>{
                            return {
                                ...e,
                                title:e.name,
                                run:item=>{
                                    console.log(item.path)
                                }
                            }
                        });
                    }
                });
            }catch (e) {}
            try {
                this.api().getProjectList().then(res=>{
                    if(res.code == 200){
                        this.MenuList[0].child[2].child = res.data.map(e=>{
                            return {
                                ...e,
                                title:e.project_name,
                                run:item=>{
                                    console.log(item)
                                }
                            }
                        });
                    }
                });
            }catch (e) {}
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
