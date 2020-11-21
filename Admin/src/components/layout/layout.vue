<template>
    <div class="layout">
        <div class="layoutHeader">
            <div class="layoutHeaderContent">
                <layoutHeaderMain></layoutHeaderMain>
            </div>
        </div>
        <div class="layoutContainer">
            <div class="layoutAside" :class="{
                show:showAside,
                hide:!showAside,
            }">
                <div class="layoutAsideContent">
                    <layoutAsideContentMain></layoutAsideContentMain>
                </div>
            </div>
            <div class="layoutMain" :class="{
                show:showAside,
                hide:!showAside,
            }">
                <layoutTabsMain v-if="airforce.layout.tabsShow && airforce.tabs"></layoutTabsMain>
                <div class="layoutMainContent">
                    <router-view v-if="airforce.RefreshCurrentPage"></router-view>
                </div>
                <div class="layoutFooter" v-if="airforce.layout.footerShow">
                    <div class="layoutFooterContent"
                         :class="{
                            show:showAside,
                            hide:!showAside,
                        }"
                    >
                        <el-divider>UnityFront后台管理系统</el-divider>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import layoutHeaderMain from "./layoutHeaderMain"
import layoutAsideContentMain from "./layoutAsideContentMain"
import layoutTabsMain from "./layoutTabsMain"
export default {
    name: "layout",
    components:{ layoutHeaderMain, layoutAsideContentMain, layoutTabsMain },
    computed:{
        showAside(){
            return this.airforce.menusInfo && this.airforce.menusInfo.children && this.airforce.menusInfo.children.length > 0
        }
    }
}
</script>

<style scoped lang="less">
.layout{
    display: flex;
    flex-direction: column;
    .layoutHeader{
        height: @layoutHeader;
        overflow: hidden;
        .layoutHeaderContent{
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: @layoutHeader;
            overflow: hidden;
            background: linear-gradient(to right,@layoutColor 70%,@layoutColor2);
            z-index: 2;
            box-shadow: 0 0 5px #d8d8d8;
        }
    }
    .layoutContainer{
        flex: 1;
        display: flex;
        position: relative;
        .layoutAside{
            transition: @transition ;
            width: @layoutAside;
            min-height: 1px;
            .layoutAsideContent{
                transition: @transition;
                position: fixed;
                background: linear-gradient(to bottom,@layoutColor 70%,@layoutColor2);
                width: @layoutAside;
                height: calc(100% - @layoutHeader);
                left: 0;
                overflow-x: hidden;
                z-index: 2;
            }
            &.show{
                width: @layoutAside;
                .layoutAsideContent{
                    width: @layoutAside;
                }
            }
            &.hide{
                width: 0;
                .layoutAsideContent{
                    width: 0;
                }
            }
        }
        .layoutMain{
            display: flex;
            flex-direction: column;
            width: 100%;
            transition: @transition;
            .layoutMainContent{

            }
            .layoutFooter{
                height: @layoutFooter;
                overflow: hidden;
                width: 100%;
                .layoutFooterContent{
                    transition: @transition;
                    position: fixed;
                    right: 0;
                    bottom: 0;
                    width: calc(100% - @layoutAside);
                    height: @layoutFooter;
                    overflow: hidden;
                    background-color: #ffffff;
                    z-index: 2;
                    &.show{
                        width: calc(100% - @layoutAside);
                    }
                    &.hide{
                        width: 100%;
                    }
                }
            }
            &.show{
                width: calc(100% - @layoutAside);
            }
            &.hide{
                width: 100%;
            }
        }
    }
}
</style>