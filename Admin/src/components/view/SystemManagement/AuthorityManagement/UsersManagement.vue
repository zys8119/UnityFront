<template>
    <div class="UsersManagement">
        <layout-box>
            <layout-filter-content>
                <filter-content
                    :config="{rightBtns:[
                        {name:'新增用户', emit:'addUser'}
                    ]}"
                    v-model="params.search"
                    @reset="reset"
                    @search="search"
                    @addUser="addUser"
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
                    @editRow="addUser"
                    @deleteRow="deleteRow"
                    :apiPath="apis.user.auth.list"
                    :params="params"
                    :columns="columns"></content-table>
            </layout-filter-content>
        </layout-box>
    </div>
</template>

<script>
export default {
    name: "UsersManagement",
    data(){
        return {
            typeOptions:[
                {label:"管理员", value:0},
                {label:"普通用户", value:1},
                {label:"api用户", value:2},
            ],
            columns:[
                {label:"序号",type:"number"},
                {label:"用户名称", prop:"name"},
                {label:"账号名称", prop:"username"},
                {label:"手机号", prop:"phone"},
                {label:"邮箱", prop:"email"},
                {label:"账号类型", prop:"type", type:"textType", filterLabel:row=>{
                    return this.typeOptions.find(e=>e.value === row.type).label
                }},
                {label:"操作", type:"operate", btns:[
                    {name:"编辑", type:"text", className:"primary", emit:"editRow"},
                    {name:"删除", type:"text", className:"delete", emit:"deleteRow", show:(data,row)=>row.type !== 0},
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
        addUser(data,row){
            this.$router.push({
                query:{
                    id:row? row.id : null,
                    type:row ? "edit":"add",
                },
                path:"/userInfo"
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
            this.$utils.$$confirm("该角色分类").then(()=>{
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
.UsersManagement{
}
</style>