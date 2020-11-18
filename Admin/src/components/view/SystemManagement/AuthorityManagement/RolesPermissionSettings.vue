<template>
    <div class="RolesPermissionSettings">
        <layout-box>
            <layout-filter-content>
                <filter-content type="right"
                    slot="filter"
                    @save="save"
                    :config="{rightBtns:[
                    {name:'保存', emit:'save'}
                ]}">
                    <el-form label-width="90px" slot="leftBefore">
                        <el-form-item label="菜单类型：">
                            <el-select v-model="type">
                                <el-option v-for="(item,key) in list" :key="key" :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </filter-content>
                <horizontal-tree
                    :options="menus"
                    :checks="checkedMenuKeys"
                    @check="check"
                    class="MenuManagementPcTree"
                >
                </horizontal-tree>
            </layout-filter-content>
        </layout-box>
    </div>
</template>

<script>
export default {
    name: "RolesPermissionSettings",
    data(){
        return {
            menus:[],
            checkedMenuKeys:[],
            list:[],
            type:null,
        }
    },
    watch:{
        type(){
            this.init();
        }
    },
    mounted() {
        this.apis.AuthorityManagement.MenuType.list().then(res=>{
            this.list = res;
            if(res.length > 0){
                this.type = res[0].id;
            }
        });
    },
    methods:{
        // 初始化
        init(){
            this.apis.AuthorityManagement.Menu.list({type:this.type}).then(res=>{
                this.menus = res;
                this.apis.AuthorityManagement.RolesPermission.get({
                    menu_id:this.type,
                    roles_id:this.$route.query.id,
                }).then(res=>{
                    this.checkedMenuKeys = res.permission;
                });
            })
        },
        // check选择
        check(val) {
            this.checkedMenuKeys = val;
        },
        // 保存
        save(){
            this.apis.AuthorityManagement.RolesPermission.update({
                menu_id:this.type,
                roles_id:this.$route.query.id,
                permission:this.checkedMenuKeys,
            }).then(()=>{
                this.$message({type:"success",message:"保存成功"});
            });
        }
    }
}
</script>

<style scoped lang="less">
.RolesPermissionSettings{
}
</style>