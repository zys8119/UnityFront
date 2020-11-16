<template>
    <div class="MenuTypeManagement">
        <layout-box>
            <layout-filter-content>
                <filter-content
                    :config="{rightBtns:[
                        {name:'新增类型'}
                    ]}"
                    slot="filter"></filter-content>
                <content-table :columns="columns"></content-table>
            </layout-filter-content>
        </layout-box>
    </div>
</template>

<script>
export default {
    name: "MenuTypeManagement",
    data(){
        return {
            columns:[
                {label:"序号",type:"number"},
                {label:"类型名称"},
                {label:"菜单类型"},
                {label:"操作", type:"operate", btns:[
                    {name:"编辑", type:"text", className:"success"},
                    {name:"删除", type:"text", className:"delete"},
                ]},
            ],
        }
    }
}
</script>

<style scoped lang="less">
.MenuTypeManagement{
}
</style>