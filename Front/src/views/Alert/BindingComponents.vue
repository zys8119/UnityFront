<template>
    <div class="BindingComponents">
        <x-input placeholder="请输入关键字" class="search vux-1px-b" :showClear="false" v-model="search"></x-input>
        <div class="BindingComponentsBox webkit-scrollbar" :style="{height:height}">
            <div class="BindingComponentsBoxItem" v-for="(dashboardItem,key) in currentDashboard" :key="key">
                <component :is="dashboardItem.name" :config="item" :layout="layout" :getStyle="getStyle" :px="px"></component>
                <span class="iconfont BindingComponentsBoxItemSelect"
                      @click="binding(item.id, dashboardItem.name)"
                      :class="{select:dashboardItem.name === config[item.id]}">
                    &#xe62e;{{item.config}}
                </span>
                <div class="dashboardTitle text-overflow">{{dashboardItem.title || dashboardItem.name}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    import { XInput } from "vux"
    import html2canvas from "html2canvas";
    export default {
        name: "BindingComponents",
        components:{ XInput },
        props: {
            id:{type:String,default:null},
            item:{type:Object,default:Object},
            view:{type:Object,default:Object},
            layout:{type:Object,default:Object},
            getStyle:{type:Object,default:Object},
            px:Function,
        },
        data(){
            return {
                height:null,
                dashboard:[],
                search:"",
            }
        },
        computed:{
            config(){
                return this.view.config || {};
            },
            currentDashboard(){
                try {
                    return this.dashboard.filter(e=>((e.name && e.name.indexOf(this.search) > -1) || (e.title && e.title.indexOf(this.search) > -1)));
                }catch (e) {
                    return [];
                }
            }
        },
        mounted() {
            this.dashboard = window.dashboard;
            this.init();
            let winOnresize = window.onresize || new Function();
            window.onresize = ()=>{
                winOnresize();
                this.init();
            };
        },
        methods:{
            init(){
                this.height = window.innerHeight*0.6+'px'
            },
            binding(c_key,c_name){
                this.api().view_viewUpdate({
                    id:this.id,
                    c_name,
                    c_key
                }).then(res=>{
                    if(res.code === 200){
                        this.$emit("save");
                    }
                });
            }
        }
    }
</script>

<style scoped lang="less">
@import "../../assets/less/vars";
.BindingComponents{
    background-color: #ffffff !important;
    .BindingComponentsBox{
        overflow: auto;
        position: relative;
        .BindingComponentsBoxItem{
            position: relative;
            width: 48%;
            width: ~"calc(100% / 2 - 2px)";
            float: left;
            height: 500px;
            border:1px solid transparent;
            box-shadow: 0 0 2px #e5e5e5;
            overflow: hidden;
            background-color: @themeColor;
            &:hover{
                border:1px solid @themeLogoColor;
                transition: border-left-color,
                border-right-color,
                border-bottom-color,
                border-top-color
                ease-in 0.3s;
            }
            @h:50px;
            .BindingComponentsBoxItemSelect{
                position: absolute;
                right: 0;
                bottom: 0;
                width: @h;
                height: @h;
                line-height: @h;
                color: #e5e5e5;
                font-size: 30px;
                background-color: #ffffff;
                text-align: center;
                z-index: 100000;
                cursor: pointer;
                &:hover{
                    background-color: @themeLogoColor;
                    color: #ffffff;
                }
                &.select{
                    background-color: @themeLogoColor*0.9;
                    color: #ffffff;
                }
            }
            .dashboardTitle{
                position: absolute;
                left: 0;
                bottom: 0;
                width: 100%;
                height: @h;
                line-height: @h;
                color: #ffffff;
                /*background: linear-gradient(to top,rgba(0,0,0,0.5), rgba(0,0,0,0));*/
                background: rgba(0,0,0,0.3);
                text-align: left;
                font-size: 18px;
                padding: 0 15px;
                box-shadow: -4px -4px 4px #666666;
            }
        }
    }
    .search{
        text-align: center;
        margin-bottom: 15px;
        &/deep/ input{
            width: 400px;
            line-height: 50px;
            box-shadow: 0 0 5px #e5e5e5;
            height: 50px;
            padding:0 15px;
            border-radius: 25px;
        }
    }

}
</style>