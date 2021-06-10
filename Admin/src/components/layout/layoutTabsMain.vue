<template>
    <div class="layoutTabsMain">
        <div
            :class="{
                show:showAside,
                hide:!showAside,
            }"
            class="layoutTabsMainContent">
            <el-tabs class="el-tabs" type="card" closable
                     v-model="activeName"
                     @tab-remove="tabRemove"
                     @tab-click="tabClick"
            >
                <el-tab-pane
                    v-for="(item, index) in airforce.tabs"
                    :key="index+Math.random()"
                    :label="item.title"
                    :name="item.id"
                    :path="item.path"
                    :item="item"
                ></el-tab-pane>
            </el-tabs>
            <el-dropdown v-if="airforce.layout.tabsShowBtn">
                <span class="el-dropdown-link">
                    <i class="el-icon-menu"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item class="t-a-c" @click.native="RefreshCurrentPage">刷新当前页面</el-dropdown-item>
                    <el-dropdown-item class="t-a-c" @click.native="closeAllPage">关闭除此之外的页面</el-dropdown-item>
                    <el-dropdown-item class="t-a-c" @click.native="closeAllPage('Before')">关闭左侧所有页面</el-dropdown-item>
                    <el-dropdown-item class="t-a-c" @click.native="closeAllPage('After')">关闭右侧所有页面</el-dropdown-item>
                    <el-dropdown-item class="t-a-c" :divided="key === 0" v-if="airforce.layout.tabsShowBtnArr" v-for="(item,key) in airforce.layout.tabsShowBtnArr" @click.native="item.click ? item.click() : ()=>{}" :key="key" v-html="item.label"></el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
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
    computed:{
        showAside(){
            return this.airforce.menusInfo && this.airforce.menusInfo.children && this.airforce.menusInfo.children.length > 0
        }
    },
    created() {
        this.$root.$on("addTabs",(route)=>{
            let Tabs = this.getTabs();
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
        getTabs(){
            return this.$utils.lodash.cloneDeep(this.airforce.tabs) || [];
        },
        // 删除
        tabRemove(name){
            if(this.airforce.tabs.length === 1){
                return ;
            }
            let Tabs = this.getTabs();
            let index = Tabs.findIndex(e=>e.id === this.activeName);
            if(index > -1){
                Tabs.splice(index,1);
            }
            this.action({moduleName:"tabs", goods:null})
            this.action({moduleName:"tabs", goods:Tabs});
            if(name === this.activeName && Tabs.length > 0){
                let item = Tabs[Tabs.length - 1];
                this.activeName = item.id;
                this.$root.$emit("nodeClick", item);
            }
        },
        // 跳转
        tabClick(vm){
            this.$root.$emit("nodeClick", vm.$attrs.item);
        },
        // 刷新当前页面
        RefreshCurrentPage(){
            this.action({moduleName:"RefreshCurrentPage", goods:false});
            this.$nextTick(()=>{
                this.action({moduleName:"RefreshCurrentPage", goods:true});
            })
        },
        // 关闭除此之外的页面
        closeAllPage(type){
            let Tabs = this.getTabs();
            let index = Tabs.findIndex(e=>e.id === this.activeName);
            if(type === "Before"){
                // 之前
                if(index > -1){
                    Tabs  = Tabs.slice(index);
                }
            }else if(type === "After"){
                // 之后
                if(index > -1){
                    Tabs  = Tabs.slice(0, index+1);
                }
            }else {
                // 全部
                Tabs = Tabs.filter(e=>e.id === this.activeName)
            }
            this.action({moduleName:"tabs", goods:null})
            this.action({moduleName:"tabs", goods:Tabs});
        },
    }
}
</script>

<style scoped lang="less">
.layoutTabsMain{
    width: 100%;
    height: @layoutTabs;
    .layoutTabsMainContent{
        transform: @transition;
        background-color: #ffffff;
        position: fixed;
        right: 0;
        top: @layoutHeader;
        width: 100%;
        display: flex;
        &.show{
            width: calc(100% - @layoutAside);
        }
        &.hide{
            width: 100%;
        }
        /deep/.el-tabs{
            flex: 1;
            .el-tabs__content{
                display: none;
            }
            .el-tabs__header{
                margin-bottom: 0;
                .el-tabs__item{
                    height: @layoutTabs - 10px;
                    &.is-active{
                        border-bottom: none;
                        background-color: @themeColor;
                        color: #ffffff;
                    }
                }
            }
            &.el-tabs--card{
                &>.el-tabs__header{
                    border: none;
                }
            }
        }
        .el-dropdown-link{
            .el-icon-menu{
                @s:@layoutTabs - 10px;
                height: @s;
                line-height: @s;
                width:  @s;
                text-align: center;
                cursor: pointer;
                transition: all ease-in-out 200ms;
                &:hover{
                    background-color: #e5e5e5;
                    color: @themeColor;
                }
            }
        }
    }
}
</style>