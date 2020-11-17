<template>
    <div class="MenuTypeManagement">
        <layout-box>
            <layout-filter-content>
                <filter-content
                    :config="{rightBtns:[
                        {name:'新增分类', emit:'addType'}
                    ]}"
                    v-model="params.search"
                    @reset="reset"
                    @search="search"
                    @addType="addType"
                    slot="filter">
                    <el-form slot="leftBefore">
                        <el-form-item required>
                            分类:
                            <el-select v-model="params.type" @change="search()" clearable>
                                <el-option v-for="(item,key) in typeOptions" :key="key" :value="item.value" :label="item.label"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </filter-content>
                <content-table
                    ref="table"
                    @editRow="addType"
                    @deleteRow="deleteRow"
                    :apiPath="apis.AuthorityManagement.MenuType.list"
                    :params="params"
                    :columns="columns"></content-table>
            </layout-filter-content>
        </layout-box>
    </div>
</template>

<script>
export default {
    name: "MenuTypeManagement",
    data(){
        return {
            typeOptions:[
                {label:"后台", value:1},
                {label:"前台", value:2},
                {label:"其他", value:3},
            ],
            columns:[
                {label:"序号",type:"number"},
                {label:"类型名称", prop:"name"},
                {label:"分类", prop:"type", type:"textType", filterLabel:row=>(this.typeOptions.find(e=>e.value == row.type) || {}).label},
                {label:"操作", type:"operate", btns:[
                    {name:"编辑", type:"text", className:"primary", emit:"editRow"},
                    {name:"删除", type:"text", className:"delete", emit:"deleteRow"},
                ]},
            ],
            params:{}
        }
    },
    mounted() {
        this.reset();
    },
    methods:{
        // 添加类型
        addType(data,row){
            this.$ZAlert.show({
                title:row?"编辑分类":"新增分类",
                width:"500px",
                components:require("./Alert/AddType"),
                _event:{
                    save:this.reset,
                },
                props:{
                    row:()=>row,
                    typeOptions:()=>this.typeOptions
                }
            })
        },
        // 重置
        reset(){
            this.params = {
                search:null,
                type:null,
            };
            this.search();
        },
        // 搜素
        search(){
            this.$refs.table.init();
        },
        // 删除
        deleteRow(data,row){
            this.$utils.$$confirm("该分类").then(()=>{
                this.apis.AuthorityManagement.MenuType.delete({id:row.id}).then(()=>{
                    this.$message({type:"success",message:"删除成功"});
                    this.reset();
                })
            })
        }
    }
}
</script>

<style scoped lang="less">
.MenuTypeManagement{
}
</style>