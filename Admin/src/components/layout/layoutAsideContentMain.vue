<template>
    <div class="layoutAsideContentMain">
        <el-tree class="el-tree" :data="data" :props="defaultProps" accordion>
            <div slot-scope="{node,data}" class="layoutAsideContentMainItem">
                <span class="data_label ellipsis-1">{{ data.label }}</span>
                <i class="icons" v-if="!node.isLeaf" :class="{
                    'el-icon-arrow-down':node.expanded,
                    'el-icon-arrow-right':!node.expanded,
                }"></i>
            </div>
        </el-tree>
    </div>
</template>

<script>
export default {
    name: "layoutAsideContentMain",
    data(){
        return {
            data: [{
                label: '一级 1一级 1一级 1一级 1一级 1一级 1一级 1一级 6',
                children: [{
                    label: '二级 1-1',
                    children: [{
                        label: '三级 1-1-1'
                    }]
                }]
            }, {
                label: '一级 2',
                children: [{
                    label: '二级 2-1',
                    children: [{
                        label: '三级 2-1-1'
                    }]
                }, {
                    label: '二级 2-2',
                    children: [{
                        label: '三级 2-2-1'
                    }]
                }]
            }, {
                label: '一级 3',
                children: [{
                    label: '二级 3-1',
                    children: [{
                        label: '三级 3-1-1'
                    }]
                }, {
                    label: '二级 3-2',
                    children: [{
                        label: '三级 3-2-1'
                    }]
                }]
            }],
            defaultProps: {
                children: 'children',
                label: 'label'
            }
        }
    },
    methods:{
        a(d){
            console.log(d)
        }
    }
}
</script>

<style scoped lang="less">
.layoutAsideContentMain {
    /deep/.el-tree{
        background-color: transparent;
        position: relative;
        margin-top: @unit15;
        &:before{
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            height: 1px;
            width: 100%;
            background:linear-gradient(to left,@layoutColor2, @themeColor, @layoutColor2);
        }
        .el-tree-node{
            &:focus{
                .el-tree-node__content{
                    background: transparent;
                }
            }
            &:hover{
                .el-tree-node__content{
                    background: transparent;
                }
            }
            .el-tree-node__content{
                position: relative;
                &:before{
                    content: "";
                    position: absolute;
                    left: 0;
                    bottom: 0;
                    height: 1px;
                    width: 100%;
                    background:linear-gradient(to left,@layoutColor2, @themeColor, @layoutColor2);
                }
            }
            &.is-expanded{
                background: @layoutColor/1.5;
            }
            &.is-current{
                &>.el-tree-node__content {
                    background: linear-gradient(to left, @layoutColor2, @themeColor, @layoutColor2);
                }
            }
        }
        .el-tree-node__content{
            height: @layoutHeader;
            padding: 0 !important;
            .el-tree-node__expand-icon{
                display: none;
            }
            .layoutAsideContentMainItem{
                display: flex;
                justify-content: center;
                align-items: center;
                height: @layoutHeader;
                width: 100%;
                padding: 0 @unit15;
                user-select: none;
                color: @white;
                .data_label{
                    flex: 1;
                }
                .icons{
                    margin-left: @unit15;
                    &:before{

                        transition: all ease-in-out 300ms;
                    }
                }
                &:hover{
                    background-color: transparent;
                    background: linear-gradient(to left,@layoutColor2, @themeColor, @layoutColor2);
                }
            }
        }
    }
}
</style>