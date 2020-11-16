<template>
    <div class="MenuManagement">
        <layout-box>
            <layout-filter-content>
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
        }
    },
    methods:{
        // 添加菜单
        add(){

        }
    }
}
</script>

<style scoped>

</style>