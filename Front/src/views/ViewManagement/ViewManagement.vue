<template>
    <div class="ViewManagement">
        <div class="ViewManagementHeaderBox">
            <div class="ViewManagementHeader">
                <img class="logo" :src="require('@/assets/lodo_text.png')" alt="">
                <tab class="tab" custom-bar-width="50px">
                    <tab-item :selected="airforce.layout.viewKey === item.key"
                              v-for="(item,key) in list"
                              :key="key"
                              @click.native="$router.push(item.link)"
                    >{{item.name}}</tab-item>
                </tab>
            </div>
        </div>
        <div class="ViewManagementBox">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import { Tab, TabItem } from 'vux'
    export default {
        name: "ViewManagement",
        components:{ Tab, TabItem },
        data(){
            return {
                list:[
                    {name:'场景管理',link:"/",key:"scene"},
                    {name:'视图管理',link:"/viewManagement",key:"view"},
                ]
            }
        }
    }
</script>

<style scoped lang="less">
@import "../../assets/less/vars";
.ViewManagement{
    .ViewManagementBox{
        padding: 15px;
    }
    .ViewManagementHeaderBox{
        @h:44px;
        height: @h;
        width: 100%;
        .ViewManagementHeader{
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            box-shadow: 0 0 5px @themeColor2;
            .tab{
                float: left;
                width: 200px;
                &/deep/ .vux-tab-container{
                    .vux-tab{
                        background-color: transparent;
                        .vux-tab-item{
                            background: none;
                            cursor: pointer;
                        }
                    }
                }
            }
            .logo{
                float: left;
                margin:0 15px;
                height: @h;
                max-width: 200px;
            }
        }
    }
}
</style>