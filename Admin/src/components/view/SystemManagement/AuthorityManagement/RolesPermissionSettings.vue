<template>
    <div class="RolesPermissionSettings">
        <layout-box>
            <layout-filter-content>
                <filter-content type="right" slot="filter" :config="{rightBtns:[
                    {name:'保存'}
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
            })
        },
        // check选择
        check(val) {
            this.checkedMenuKeys = val;
            console.log(val)
        },
    }
}
</script>

<style scoped lang="less">
.RolesPermissionSettings{
}
</style>