<template>
    <layout-left-content :asideShow="false" class="LayoutFilterContent">
        <template>
            <div class="LayoutFilterContentHeader" v-if="$slots.header">
                <slot name="header"></slot>
            </div>
            <div class="LayoutFilterContentFilter" v-if="$slots.filter || $slots.filterLeft ||  $slots.filterRight">
                <slot name="filter">
                    <el-row v-if="$slots.filterLeft ||  $slots.filterRight">
                        <el-col :span="span.left" v-if="$slots.filterLeft" class="filterLeft">
                            <slot name="filterLeft"></slot>
                        </el-col>
                        <el-col :span="span.right" v-if="$slots.filterRight" class="filterRight">
                            <slot name="filterRight"></slot>
                        </el-col>
                    </el-row>
                </slot>
            </div>
            <div class="LayoutFilterContentContent" v-if="$slots.default">
                <div class="LayoutFilterContentContentBox">
                    <slot></slot>
                </div>
            </div>
        </template>
    </layout-left-content>
</template>

<script>
export default {
    name: "LayoutFilterContent",
    props:{
        span:{
            type:Object,
            default:()=>({
                left:16,
                right:8,
            })
        }
    }
}
</script>

<style lang="less">
.LayoutFilterContent{
    .LayoutFilterContentHeader{
        margin-bottom: @unit15;
    }
    .LayoutFilterContentFilter{
        background-color: #ffffff;
        padding: @unit15;
        margin-bottom: @unit15;
        overflow: hidden;
        .filterLeft{
            text-align: left;
        }
        .filterRight{
            text-align: right;
            float: right;
        }
    }
    .LayoutFilterContentContent{
        background-color: #ffffff;
        .LayoutFilterContentContentBox{
            padding: @unit15;
        }
    }
    padding: 0 !important;
    &> .el-container {
        .LayoutLeftContent-el-main {
            padding-left: 0;
        }
    }
}
</style>