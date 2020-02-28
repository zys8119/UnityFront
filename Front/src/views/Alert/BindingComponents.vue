<template>
    <div class="BindingComponents">
        <x-input placeholder="请输入关键字" class="search vux-1px-b" :showClear="false"></x-input>
        <div class="BindingComponentsBox webkit-scrollbar" :style="{height:height}">
            <component v-for="(name,key) in dashboard" :key="key" :is="name" :config="item" :layout="layout" :getStyle="getStyle"></component>
        </div>
    </div>
</template>

<script>
    import { XInput } from "vux"
    export default {
        name: "BindingComponents",
        components:{ XInput },
        props: {
            item:{type:Object,default:Object},
            layout:{type:Object,default:Object},
            getStyle:{type:Object,default:Object}
        },
        data(){
            return {
                height:null,
                dashboard:[],
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
            }
        }
    }
</script>

<style scoped lang="less">
.BindingComponents{
    background-color: #ffffff !important;
    .BindingComponentsBox{
        overflow: auto;
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