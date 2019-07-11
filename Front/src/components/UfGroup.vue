<template>
    <div class="UfGroup vux-1px-b">
        <p class="UfGroupTitle msg" @click="isOpen = !isOpen">
            <span class="iconfont" v-if="isOpen">&#xe634;</span>
            <span class="iconfont" v-else>&#xe638;</span>
            {{title}}
        </p>
        <div class="UfGroupContent" v-if="isOpen">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "uf-group",
        data(){
          return {
              isOpen:false,
          }
        },
        props:{
            title:{
                type:String,
                default:null
            },
            open:{
                type:Boolean,
                default:false
            }
        },
        mounted() {
            this.isOpen = this.open;
        }
    }
</script>

<style scoped lang="less">
    @import "../assets/less/vars";
    .UfGroup {
        padding-bottom: 15px;
        .UfGroupTitle{
            overflow: hidden;
            line-height: 30px;
            &:hover{
                background-color: @themeColor;
            }
            .iconfont{
                font-size: 25px;
                float: left;
            }
        }
    }
</style>
