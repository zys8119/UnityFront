<template>
    <div class="CheckTree">
        <el-tree :ref="'tree'+key" v-for="(item,key) in options" :data="[item]" :key="key"
                 show-checkbox
                 :props="{children:'list',label:'name'}"
                 node-key="id"
                 default-expand-all
                 :default-checked-keys="checks"
                 @check="elTreeCheck"
        >
			<span slot-scope="{node , data}">
				<slot :node="node" :data="data"></slot>
			</span>
		</el-tree>
    </div>
</template>

<script>
export default {
    name: "CheckTree",
    props:{
        options:{
            type:Array,
            default:Array
        },
        checks:{
            type:Array,
            default:Array
        }
    },
    methods:{
        elTreeCheck(){
            let data = [];
            Object.keys(this.$refs).forEach(e=>{
                data = data.concat(this.$refs[e][0].getCheckedKeys());
            });
            this.$emit("check",data);
        }
    }
}
</script>

<style lang="less">
    .CheckTree {
        .el-tree{
            border:1px solid rgba(238,238,238,1);
            border-bottom: 0;
            margin-bottom: 16px;
            .el-tree-node{
                .el-tree-node__label{
                    color: #526371;
                }
                .el-tree-node__content{
                    height: 40px;
                    border-bottom:1px solid rgba(238,238,238,1);
                }
                .el-tree-node__expand-icon{
                    display: none;
                }
                .el-checkbox{
                    margin-right: 14px;
                    margin-left: 15px;
                }
            }
            &> .el-tree-node{
                & > .el-tree-node__content{
                    background-color: #EEEEEE;
                    .el-tree-node__label{
                        color: #333333;
                        font-weight: bold;
                    }
                }
            }
        }

    }
</style>
