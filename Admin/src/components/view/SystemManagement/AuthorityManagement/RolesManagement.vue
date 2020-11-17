<template>
    <div class="RolesTypeManagement">
        <layout-box>
            <layout-filter-content>
                <filter-content
                    :config="{rightBtns:[
                        {name:'新增角色', emit:'addRoles'}
                    ]}"
                    v-model="params.search"
                    @reset="reset"
                    @search="search"
                    @addRoles="addRoles"
                    slot="filter">
                    <el-form slot="leftBefore">
                        <el-form-item required>
                            分类:
                            <el-select v-model="params.type" @change="search()" clearable>
                                <el-option v-for="(item,key) in typeOptions" :key="key" :value="item.id" :label="item.name"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </filter-content>
                <content-table
                    ref="table"
                    @editRow="addRoles"
                    @deleteRow="deleteRow"
                    :apiPath="apis.AuthorityManagement.Roles.list"
                    :params="params"
                    :columns="columns"></content-table>
            </layout-filter-content>
        </layout-box>
    </div>
</template>

<script>
export default {
    name: "RolesTypeManagement",
    data(){
        return {
            typeOptions:[],
            columns:[
                {label:"序号",type:"number"},
                {label:"角色名称", prop:"name"},
                {label:"角色类型", prop:"type", type:"textType", filterLabel:row=>(this.typeOptions.find(e=>e.value == row.type) || {}).label},
                {label:"操作", type:"operate", btns:[
                    {name:"编辑", type:"text", className:"primary", emit:"editRow"},
                    {name:"删除", type:"text", className:"delete", emit:"deleteRow"},
                ]},
            ],
            params:{}
        }
    },
    mounted() {
        this.apis.AuthorityManagement.RolesType.list().then(res=>{
            this.typeOptions = res;
        })
        this.reset();
    },
    methods:{
        // 添加角色
        addRoles(data,row){
            this.$ZAlert.show({
                title:row?"编辑角色":"新增角色",
                width:"500px",
                components:require("./Alert/AddRoles"),
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
            this.$utils.$$confirm("该角色").then(()=>{
                this.apis.AuthorityManagement.RolesType.delete({id:row.id}).then(()=>{
                    this.$message({type:"success",message:"删除成功"});
                    this.reset();
                })
            })
        }
    }
}
</script>

<style scoped lang="less">
.RolesTypeManagement{
}
</style>