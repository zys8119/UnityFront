<template>
    <div class="UnityFrontLayoutTitle">
        <div class="UnityFrontLayoutTitleBox">
            <p class="msg"><span>{{title}}</span></p>
            <div class="search" v-if="search">
                <x-input placeholder="关键字" :showClear="false" @on-change="change($event)"></x-input>
            </div>
        </div>
    </div>
</template>

<script>
    import { XInput } from "vux"
    export default {
        name: "UnityFrontLayoutTitle",
        components:{ XInput },
        props:{
            title:{
                type:String,
                default:null
            },
            search:{
                type:Boolean,
                default: false
            }
        },
        methods:{
            change(value){
                this.$emit("search",value)
            }
        }
    }
</script>

<style scoped lang="less">
    @import "../../assets/less/vars";
    .UnityFrontLayoutTitle {
        height: 32px;
        width: 100%;
        .UnityFrontLayoutTitleBox{
            background-color: @themeColor;
            overflow: hidden;
            padding-top: 5px;
            padding-bottom: 2px;
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            span{
                background-color: @themeColor2;
                line-height: 25px;
                float: left;
                margin-left: 2px;
                padding: 0 15px;
                border-radius: 5px 5px 0 0;
                box-shadow: 0 -2px 2px #000000;
            }
            .search{
                position: absolute;
                right:15px;
                top: 6px;
                background-color: #999999;
                height: 20px;
                line-height: 20px;
                border-radius: 20px;
                .vux-x-input{
                    padding-top: 0;
                    padding-bottom: 0;
                }

            }
        }

    }
</style>
