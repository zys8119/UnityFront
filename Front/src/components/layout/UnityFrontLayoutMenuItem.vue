<template>
    <div class="UnityFrontLayoutMenuItem" :class="{chlidItem:chlid}">
        <div class="item" :class="{'vux-1px-b':item.groupEnd}" v-for="item in list">
            <div class="itemRow" @click.stop="select(item)">
                {{item.title}}
                <span class="iconfont" v-if="item.chlid">&#xe635;</span>
            </div>
            <unity-front-layout-menu-item  v-if="item.chlid && item.chlid.length > 0" :list="item.chlid" chlid></unity-front-layout-menu-item>
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
            chlid:{
                type:Boolean,
                default:false
            }
        },
        methods:{
            select(item){
                if(!item.chlid && typeof item.run == "function"){
                    item.run(item);
                }
            }
        }
    }
</script>

<style scoped lang="less">
    .UnityFrontLayoutMenuItem {
        position: absolute;
        left: 0;
        top: 40px;
        background-color: #f2f2f2;
        z-index: 2;
        box-shadow: 0 0 2px #999;
        width: 250px;
        padding: 2px;
        display: none;
        &.chlidItem{
            left: 250px;
            top: 0;
        }
        .item{
            padding: 0 15px;
            position: relative;
            &:hover{
                background-color: #91c9f7;
                & > .UnityFrontLayoutMenuItem{
                    display: block;
                }
            }
            .itemRow{
                .iconfont{
                    float: right;
                    line-height: 40px;
                }
            }
        }
    }
</style>
