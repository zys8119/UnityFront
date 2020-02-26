<template>
    <div class="ComponentTree">
        <div v-if="item.child" class="ComponentTreeRow" :class="{init:init,open:item.open,select:item.select,style:styleHover}" @click.stop="OpenChild(item)">
            <p class="msg text-overflow">
                <span class="iconfont" v-if="item.open">&#xe634;</span>
                <span class="iconfont" v-else>&#xe638;</span>
                <slot :data="item">{{item.name}}</slot>
            </p>
            <component-tree v-for="(itemChild,key) in item.child" :item="itemChild" :key="key" :styleHover="styleHover">
                <template slot-scope="{data}">
                    <slot :data="data">{{data.name}}</slot>
                </template>
            </component-tree>
        </div>
        <div class="ComponentTreeRow" :class="{select:item.select,init:init,style:styleHover}" v-else @click.stop="SelectChild(item)">
            <p class="msg text-overflow">
                <span class="iconfont"></span>
                <slot :data="item">{{item.name}}</slot>
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ComponentTree",
        inject:["treeData"],
        props:{
            item:{
                type:Object,
                default:Object
            },
            init:{
                type:Boolean,
                default:false
            },
            styleHover:{
                type:Boolean,
                default:true
            }
        },
        methods:{
            OpenChild(item){
                this.SelectChild(item);
                item.open = !item.open;
            },
            treeDataInit(data){
                try {
                    data = data.map(item=>{
                        item.select = false;
                        if(item.child){
                            return this.treeDataInit(item.child);
                        }
                        return item;
                    })
                }catch (e) {}
            },
            SelectChild(item){
                this.treeDataInit(this.treeData);
                item.select = true;
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
            &.style{
                &:hover > .msg{
                    background-color: @themeLogoColor/0.8;
                    color: #FFFFFF;
                }
                &.select{
                    & > .msg{
                        background-color: @themeLogoColor;
                        color: #FFFFFF !important;
                    }
                }
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
