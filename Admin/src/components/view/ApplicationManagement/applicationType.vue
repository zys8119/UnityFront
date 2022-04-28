<template>
    <div class="applicationType">
        <layout-box>
            <layout-filter-content>
                <filter-content slot="filter" :config="{rightBtns:[
                    {name:'新增类型', emit:'addType'}
                ]}" @addType="addType" @search="search" @reset="reset" v-model="params.search"></filter-content>
                <content-table ref="table"
                               :params="params"
                               :columns="columns"
                               :apiPath="apis.LogNakadai.ApplicationType.list"
                               @editRow="addType"
                               @delRow="delRow"
                ></content-table>
            </layout-filter-content>
        </layout-box>
    </div>
</template>

<script>
export default {
    name: "applicationType",
    data(){
        return {
            columns:[
                {label:"应用类型名称", prop:"name"},
                {label: "操作", type:"operate", btns:[
                    {name:"编辑", type:"text", className:"primary", emit:'editRow'},
                    {name:"删除", type:"text", className:"delete", emit:"delRow"}
                ]},
            ],
            params:{}
        }
    },
    mounted() {
        this.init()
    },
    methods:{
        init(){
            this.reset()
        },
        reset(){
            this.params = {}
            this.search()
        },
        search(){
            this.$refs.table.init();
        },
        addType(_, row){
            this.$ZAlert.show({
                title:row ? "编辑应用类型":"新增应用类型",
                components:require("./Alert/AddType"),
                props:{
                    row:()=>row
                },
                _event:{
                    save:()=>{
                        this.reset()
                    }
                }
            })
        },
        delRow(data, row){
            this.$utils.$$confirm("该应用类型").then(()=>{
                this.apis.LogNakadai.ApplicationType.delete({id:row.id}).then(()=>{
                    this.$message({type:"success",message:"删除成功"});
                    this.reset();
                })
            })
        }
    }
}
</script>

<style scoped lang="less">
.applicationType {
}
</style>
