<template>
    <div class="BindingComponents">
        <x-input placeholder="请输入关键字" class="search vux-1px-b" :showClear="false"></x-input>
        <div class="BindingComponentsBox webkit-scrollbar" :style="{height:height}">
            <div class="BindingComponentsBoxItem" v-for="(name,key) in dashboard" :key="key">
                <component :is="name" :config="item" :layout="layout" :getStyle="getStyle"></component>
                <span class="iconfont BindingComponentsBoxItemSelect" @click="binding(item.id, name)" :class="{select:name === config[item.id]}">&#xe62e;{{item.config}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    import { XInput } from "vux"
    export default {
        name: "BindingComponents",
        components:{ XInput },
        props: {
            id:{type:String,default:null},
            item:{type:Object,default:Object},
            view:{type:Object,default:Object},
            layout:{type:Object,default:Object},
            getStyle:{type:Object,default:Object}
        },
        data(){
            return {
                height:null,
                dashboard:[],
                value:null
            }
        },
        computed:{
            config(){
                return this.view.config || {};
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
            binding(bindId,name){
                console.log(this.id,bindId,name);
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
            width: 50%;
            float: left;
            height: 500px;
            border:1px solid transparent;
            box-shadow: 0 0 2px #e5e5e5;
            .BindingComponentsBoxItemSelect{
                position: absolute;
                right: 0;
                bottom: 0;
                width: 50px;
                height: 50px;
                line-height: 50px;
                color: #e5e5e5;
                font-size: 30px;
                background-color: #ffffff;
                text-align: center;
                z-index: 100000;
                box-shadow: -4px -4px 4px #666666;
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
            &:hover{
                border:1px solid @themeLogoColor;
                transition: border-left-color,
                            border-right-color,
                            border-bottom-color,
                            border-top-color
                            ease-in 0.3s;
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