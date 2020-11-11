<template>
    <div class="layout">
        <div class="layoutHeader">
            <div class="layoutHeaderContent">
                <div>layoutHeader</div>
                <div>layoutHeader</div>
                <div>layoutHeader</div>
            </div>
        </div>
        <div class="layoutContainer">
            <div class="layoutAside">
                <div class="layoutAsideContent">
                    <div v-for="i in 200" :key="i">{{i}}</div>
                </div>
            </div>
            <div class="layoutMain">
                <div class="layoutMainContent">
                    <router-view></router-view>
                </div>
                <div class="layoutFooter">
                    <div class="layoutFooterContent">
                        asdas=
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "layout"
}
</script>

<style scoped lang="less">
.layout{
    display: flex;
    flex-direction: column;
    @layoutHeader:50px;
    @layoutAside:200px;
    @layoutFooter:50px;
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
            background-color: #0060cf;
            z-index: 2;
        }
    }
    .layoutContainer{
        flex: 1;
        display: flex;
        position: relative;
        .layoutAside{
            width: @layoutAside;
            min-height: 1px;
            .layoutAsideContent{
                position: fixed;
                background-color: #3e863d;
                width: @layoutAside;
                height: calc(100% - @layoutHeader);
                left: 0;
                overflow-x: hidden;
                z-index: 2;
            }
        }
        .layoutMain{
            display: flex;
            flex-direction: column;
            flex: 1;
            .layoutMainContent{

            }
            .layoutFooter{
                height: @layoutFooter;
                overflow: hidden;
                width: 100%;
                .layoutFooterContent{
                    position: fixed;
                    right: 0;
                    bottom: 0;
                    width: calc(100% - @layoutAside);
                    height: @layoutFooter;
                    overflow: hidden;
                    background-color: #0060cf;
                    z-index: 2;
                }
            }
        }
    }
}
</style>