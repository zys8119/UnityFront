<template>
    <div class="layoutAsideContentMain">
        <el-tree class="el-tree" :data="data" :props="defaultProps">
            <div slot-scope="{node,data}" class="layoutAsideContentMainItem">
                <span class="data_label ellipsis-1">{{ data.label }}</span>
                {{a(node)}}
                <i class="icons" :class="{
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
        .el-tree-node__content{
            height: @layoutHeader;
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
                .data_label{
                    flex: 1;
                }
                .icons{
                    margin-left: @unit15;
                    &:before{

                        transition: all ease-in-out 300ms;
                    }
                }
            }
        }

    }
}
</style>