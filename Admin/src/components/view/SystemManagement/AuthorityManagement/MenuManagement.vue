<template>
    <div class="MenuManagement">
        <layout-box>
            <layout-filter-content>
                <filter-content type="left" slot="filter">
                    <el-form>
                        <el-form-item>
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

        },
        // 添加菜单
        add(){

        }
    }
}
</script>

<style scoped>

</style>