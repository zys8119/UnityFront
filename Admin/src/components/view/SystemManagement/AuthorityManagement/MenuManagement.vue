<template>
    <div class="MenuManagement">
        <layout-box>
            <layout-filter-content>
                <filter-content type="none" slot="filter">
                    <el-form label-width="90px">
                        <el-form-item label="菜单类型：">
                            <el-select v-model="type">
                                <el-option v-for="(item,key) in list" :key="key" :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </filter-content>
                <horizontal-tree
                    type="add"
                    :options="menus"
                    :checks="checkedMenuKeys"
                    @add="add"
                    @more="add"
                    class="MenuManagementPcTree"
                >
                </horizontal-tree>
            </layout-filter-content>
        </layout-box>
    </div>
</template>

<script>
export default {
    name: "MenuManagement",
    data(){
        return {
            menus: [],
            checkedMenuKeys: [],
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
        })
    },
    methods:{
        // 初始化
        init(){
            this.apis.AuthorityManagement.Menu.list({
                type:this.type
            }).then(res=>{
                this.menus = res;
            })
        },
        // 添加菜单
        add(type,item){
            if(type === "delete"){
                this.$utils.$$confirm("该菜单").then(()=>{
                    this.apis.AuthorityManagement.Menu.delete({id:item.id}).then(()=>{
                        this.$message({type:"success",message:"删除成功"})
                        this.init();
                        this.$root.$emit("initUserInfo");
                    })
                })
                return ;
            }
            if(type === "btn"){
                return this.$message.error("功能开发中...");
            }
            this.$ZAlert.show({
                title:{
                    "directory":"添加菜单",
                    "child_directory":"添加子菜单",
                    "modify":"修改菜单",
                }[type],
                width:"500px",
                props:{
                    type:this.type,
                    type2:type,
                    parent:item && item.id ? item.id:null,
                    row:()=>item,
                },
                _event:{
                    save:()=>{
                        this.init();
                        this.$root.$emit("initUserInfo");
                        this.$root.$emit("initUserInfo");
                    }
                },
                components:require("./Alert/AddMenu")
            })
        }
    }
}
</script>

<style scoped>

</style>