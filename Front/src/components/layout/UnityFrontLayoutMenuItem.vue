<template>
    <div class="UnityFrontLayoutMenuItem" :class="{childItem:child}">
        <div class="item" :class="{'vux-1px-b':item.groupEnd}" v-for="item in list">
            <div class="itemRow" @click.stop="select(item)">
                <span class="iconfont icon" v-if="item.icon" v-html="item.icon" :style="{fontSize:item.fontSize}"></span>
                <span class="iconfont icon" v-else></span>
                {{item.title}}
                <span class="iconfont" v-if="item.child">&#xe635;</span>
            </div>
            <unity-front-layout-menu-item  v-if="item.child && item.child.length > 0" :list="item.child" child></unity-front-layout-menu-item>
        </div>
    </div>
</template>

<script>
    export default {
        name: "UnityFrontLayoutMenuItem",
        props:{
            list:{
                type:Array,
                default:Array
            },
            child:{
                type:Boolean,
                default:false
            }
        },
        methods:{
            select(item){
                if(!item.child && typeof item.run == "function"){
                    item.run.call(this,item);
                }
            }
        }
    }
</script>

<style scoped lang="less">
    @import "../../assets/less/vars";
    .UnityFrontLayoutMenuItem {
        position: absolute;
        left: 0;
        top: @UnityFrontLayoutMenuHeight;
        background-color: #f2f2f2;
        z-index: 2;
        box-shadow: 0 0 2px #999;
        width: 250px;
        padding: 2px;
        display: none;
        &.childItem{
            left: 250px;
            top: 0;
        }
        .item{
            /*padding: 0 15px;*/
            position: relative;
            &:hover{
                background-color: #91c9f7;
                & > .UnityFrontLayoutMenuItem{
                    display: block;
                }
            }
            .itemRow{
                overflow:hidden;
                text-overflow:ellipsis;
                -o-text-overflow:ellipsis;
                -webkit-text-overflow:ellipsis;
                -moz-text-overflow:ellipsis;
                white-space:nowrap;
                .iconfont{
                    float: right;
                    line-height: @UnityFrontLayoutMenuHeight;
                    width: 30px;
                    text-align: center;
                    height: @UnityFrontLayoutMenuHeight;
                    &.icon{
                        float: left;
                    }
                }
            }
        }
    }
</style>
