<template>
    <div class="ComponentTree">
        <div v-if="item.child" class="ComponentTreeRow" :class="{init:init,open:item.open}" @click.stop="OpenChild(item)">
            <p class="msg text-overflow">
                <span class="iconfont" v-if="item.open">&#xe634;</span>
                <span class="iconfont" v-else>&#xe638;</span>
                {{item.name}}
            </p>
            <component-tree v-for="itemChild,key in item.child" :item="itemChild" :key="key"></component-tree>
        </div>
        <div class="ComponentTreeRow" v-else @click.stop="SelectChild(item)">
            <p class="msg text-overflow">
                <span class="iconfont"></span>
                {{item.name}}
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ComponentTree",
        props:{
            item:{
                type:Object,
                default:Object
            },
            init:{
                type:Boolean,
                default:false
            }
        },
        methods:{
            OpenChild(item){
                item.open = !item.open;
            },
            SelectChild(item){

            }
        }
    }
</script>

<style scoped lang="less">
    @import "../assets/less/vars";
    .ComponentTree {
        line-height: 30px;
        &/deep/ .ComponentTreeRow{
            padding-left: 15px;
            display: none;
            p{
                &.msg{
                    span{
                        float: left;
                        width: 20px;
                        height: 20px;
                        &.iconfont{
                            font-size: 20px;
                        }
                    }
                }
            }
            &:hover > .msg{
                background-color: @themeLogoColor/0.8;
                color: #FFFFFF;
            }
            &.init{
                display: block;
                padding-left: 0;
            }
            &.open >  .ComponentTree{
                & > .ComponentTreeRow{
                    display: block;
                }

            }
        }
    }
</style>
