<template>
    <div class="TransferTree">
        <div class="TransferTreeItem header" v-if="top">
            <slot name="header"></slot>
        </div>
        <div v-for="(data,key) in options" :key="key" class="TransferTreeItem" :class="{
            show:data.open && !top,
            hide:!data.open && !top,
            level0:level === 0,
            line:!line
            }"
             @click.stop="nodeClick(data)"
             v-if="!data.$$Filter"
        >
            <div class="TransferTreeItemBox" :style="{marginLeft:level == 0?0:indent+'px'}">
                <div class="TransferTreeItemBoxContent">
                    <slot :node="{data:data}" :data="data">
                        {{data[showNameField]}}
                    </slot>
                </div>
                <template v-if="data[childrenField]">
                    <transfer-tree
                        :options="data[childrenField]"
                        :showNameField="showNameField"
                        :childrenField="childrenField"
                        :nodeIdField="nodeIdField"
                        :top="false"
                        :level="level+1"
                        :line="line"
                        :indent="indent"
                    >
                        <template slot-scope="{node,data}">
                            <slot :node="node" :data="data">
                                {{data[showNameField]}}
                            </slot>
                        </template>
                    </transfer-tree>
                </template>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name:"transfer-tree",
        props:{
            top:{type:Boolean,default:true},
            options:{type:Array,default:Array},
            showNameField:{type:String,default:"node_name"},
            childrenField:{type:String,default:"children"},
            nodeIdField:{type:String,default:"node_id"},
            level:{type:Number,default:0},
            line:{type:Boolean,default:false},
            indent:{type:Number,default:30},
        },
        methods:{
            nodeClick(data){
                this.$set(data,"node_open",!data.node_open);
                if(data[this.childrenField]){
                    data[this.childrenField].forEach(item=>{
                        this.$set(item,"open",!item.open);
                    })
                }
            }
        }
    }
</script>

<style scoped lang="less">
    .TransferTree{
        .TransferTreeItem{
            line-height: 50px;
            cursor: pointer;
            user-select: none;
            min-width: 300px;
            position: relative;
            @themeColor:#999;
            &:after{
                content: "";
                position: absolute;
                left:21px;
                top: 0;
                width: 2px;
                height: 4px;
                background-color: @themeColor;
                box-shadow:
                        0 -25px 0 @themeColor,
                        0 -20px 0 @themeColor,
                        0 -15px 0 @themeColor,
                        0 -10px 0 @themeColor,
                        0 -5px 0 @themeColor,
                    0 5px 0 @themeColor,
                    0 10px 0 @themeColor,
                    0 15px 0 @themeColor,
                    0 20px 0 @themeColor
            ;
            }
            &:before{
                content: "";
                position: absolute;
                left:21px;
                top: 24px;
                width: 4px;
                height: 2px;
                background-color: @themeColor;
                box-shadow:
                    5px 0 0 @themeColor,
                    10px 0 0 @themeColor,
                    15px 0 0 @themeColor
            ;
            }
            &.level0,&.header,&.line{
                &:after{
                    display: none;
                }
                &:before{
                    display: none;
                }
            }
            &.show{
                display:block;
            }
            &.hide{
                display: none;
            }
            .TransferTreeItemBoxContent{
                height: 50px;
                overflow: hidden;
                text-overflow: ellipsis;
                word-wrap: break-word;
                word-break: break-all;
                white-space: nowrap;
                &:hover{
                    background-color: #e5e5e5;
                    span{
                        &.close{
                            display: block;
                        }
                    }
                    /*
                        @color:@themeColor;
                        *{
                            color: @color;
                        }
                        span{
                            &.iconfont{
                                &.checkbox{
                                    box-shadow:inset 0 0 0 1px @color;
                                    color: #ffffff;
                                    background-color: @color;
                                }
                                &.uncheckbox{
                                    box-shadow:inset 0 0 0 1px @color !important;
                                    color: transparent !important;
                                    background-color:transparent !important;
                                }
                            }
                        }
                    //*/
                }
            }
        }
    }
</style>