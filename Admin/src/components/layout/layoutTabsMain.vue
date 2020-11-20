<template>
    <div class="layoutTabsMain">
        <div class="layoutTabsMainContent">
            <el-tabs class="el-tabs" type="card" closable
                     v-if="airforce.tabs"
                     v-model="activeName"
                     @tab-remove="tabRemove"
                     @tab-click="tabClick"
            >
                <el-tab-pane
                    v-for="(item, index) in airforce.tabs"
                    :key="index"
                    :label="item.title"
                    :name="item.id"
                    :path="item.path"
                ></el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
export default {
    name: "layoutTabsMain",
    data(){
        return {
            activeName:null,
        }
    },
    created() {
        this.$root.$on("addTabs",(route)=>{
            let Tabs = this.$utils.lodash.cloneDeep(this.airforce.tabs);
            let is_not_exist = !Tabs.find(e=>e.id === route.id);
            if(is_not_exist){
                // 不存在则添加
                Tabs.push(route);
            }
            this.action({moduleName:"tabs", goods:[]})
            this.action({moduleName:"tabs", goods:Tabs})
            this.activeName = route.id;
        })
    },
    methods:{
        // 删除
        tabRemove(name){
            let Tabs = this.$utils.lodash.cloneDeep(this.airforce.tabs);
            let index = Tabs.findIndex(e=>e.id === this.activeName);
            if(index > -1){
                Tabs.splice(index,1);
            }
            this.action({moduleName:"tabs", goods:[]})
            this.action({moduleName:"tabs", goods:Tabs});
            if(name === this.activeName && Tabs.length > 0){
                this.activeName = Tabs[Tabs.length - 1].id;
            }
        },
        // 跳转
        tabClick(vm){
            console.log(vm.$attrs.path)
        }
    }
}
</script>

<style scoped lang="less">
.layoutTabsMain{
    .layoutTabsMainContent{
        background-color: #ffffff;
        /deep/.el-tabs{
            .el-tabs__content{
                display: none;
            }
            .el-tabs__header{
                margin-bottom: 0;
            }
        }
    }
}
</style>