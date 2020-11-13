<template>
    <div class="TreeTable">
        <layout-box>
            <el-row class="bodyContent-row header-row">
                <el-col v-for="(item,key) in columns" :span="item.span || 24" :key="key">{{item.label}}</el-col>
            </el-row>
            <Tree :options="currentOptions"
                  :optionsAll="currentOptions"
                  :indent="0"
                  isdraggable
                  class="TreeTableTree"
                  lazyLoading
                  v-if="show"
                  @draggable="(...agr)=>$emit('draggable',agr[0],agr[1],agr[2],agr[3],agr[4])"
            >
                <template slot-scope="{node, data}">
                    <div>
                        <el-row class="bodyContent-row">
                            <el-col v-for="(item,key) in columns"
                                    :span="item.span || 24"
                                    :key="`${node.keyMap}-${key}`"
                                    :class="`${item.className || ''}`"
                            >
                                <slot :node="node" :row="data" :column="item">
                                    <div v-if="item.type === 'operate'" class="operate">
                                        <slot name="operate" :node="node" :column="item" :row="data">
                                            <template v-if="item.btns">
                                                <z-button @click.native.stop="(btnItem.emit)? $emit(data):()=>{}" :class="`${btnItem.className}`"
                                                          v-for="(btnItem,key) in item.btns" :config="btnItem" :key="key + 'operate-'+node.keyMap"></z-button>
                                            </template>
                                        </slot>
                                    </div>
                                    <div v-else :title="data[item.prop]" :style="{marginLeft:(key === 0)?(node.level+1)*20+'px':null}">
                                        <template v-if="key === 0 && arrowsIcon">
                                            <div class="arrowsIcon">
                                                <template v-if="node.node_parent">
                                                    <span v-if="data.node_open" class="arrows up"></span>
                                                    <span v-else class="arrows down"></span>
                                                </template>
                                            </div>
                                        </template>
                                        <template>
                                            {{data[item.prop]}}
                                        </template>
                                    </div>
                                </slot>
                            </el-col>
                        </el-row>
                    </div>
                </template>
            </Tree>
        </layout-box>
    </div>
</template>

<script>
    export default {
        name: "TreeTable",
        props:{
            options:{
                type:Array,
                default:Array
            },
            columns:{
                type:Array,
                default:Array
            },
            arrowsIcon:{
                type:Boolean,
                default:true
            }
        },
        data(){
            return {
                show:true,
                currentOptions:[]
            }
        },
        watch:{
            options(){
                this.init();
            }
        },
        mounted() {
            this.init();
        },
        methods:{
            init(){
                this.currentOptions = JSON.parse(JSON.stringify(this.options))
            }
        }
    }
</script>

<style scoped lang="less">
    @import "../../src/assets/style/less/publicFun";
    .TreeTable{
        @borderColor:#d8d8d8;
        &/deep/ .TreeTableTree{
            width: 100%;
            margin-top: 0;
            .node{
                width: 100%;
                &:hover{
                    background-color: #e5e5e5;
                }
            }
            .Tree{
                width: 100%;
            }
        }
        .bodyContent-row{
            .el-col{
                line-height: 50px;
                height: 50px;
                text-align: center;
                border: 1px solid @borderColor;
                border-top: 0;
                overflow: hidden;
                &+.el-col{
                    border-left: 0;
                }
            }
            &.header-row{
                border-top: 1px solid @borderColor;
                .el-col{
                    background-color: #f0f3fa;
                }
            }
        }
        .arrowsIcon{
            display: inline-block;
            margin-left: @unit10;
            color: #999999;
            margin-right: @unit10;
            width: 5px;
            span{
                display: inline-block;
                transform: translateY(-3px);
                &.arrows{
                    @size:5px;
                    width: @size;
                    height: @size;
                    display: inline-block;
                    @time: ease 0.3s;
                    &:before{
                        content: "";
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: @size;
                        height: @size;
                        border: 2px solid;
                        border-bottom: none;
                        border-right: none;
                        border-radius: 2px;
                    }
                    &.down{
                        transform: rotate(-135deg);
                        @keyframes animationDown
                        {
                            from {transform: rotate(45deg); opacity: 0;}
                            to {transform: rotate(-135deg); opacity: 1;}
                        }
                        animation: animationDown @time;
                        -moz-animation: animationDown @time;	/* Firefox */
                        -webkit-animation: animationDown @time;	/* Safari 和 Chrome */
                        -o-animation: animationDown @time;	/* Opera */
                    }
                    &.up{
                        transform: rotate(45deg);
                        @keyframes animationUp
                        {
                            from {transform: rotate(-135deg); opacity: 0;}
                            to {transform: rotate(45deg); opacity: 1;}
                        }
                        animation: animationUp @time;
                        -moz-animation: animationUp @time;	/* Firefox */
                        -webkit-animation: animationUp @time;	/* Safari 和 Chrome */
                        -o-animation: animationUp @time;	/* Opera */
                    }
                }
            }
        }
        &/deep/ .operate{
            .ZButton{
                &.el-button--text{
                    &:hover{
                        text-decoration: underline;
                    }
                    .colorInit();
                }
            }
        }
    }
</style>
