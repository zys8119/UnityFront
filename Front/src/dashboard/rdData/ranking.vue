<template>
    <div class="BillSuggested webkit-scrollbar">
        <div class="BillSuggestedItemBox">
            <div class="BillSuggestedItem" v-for="(item,key) in list" :key="key">
                <p class="title"><span>NO.{{item.No}}</span> {{item.title}}：{{item.index}}件</p>
                <x-progress class="x-progress" :percent="item.index/max*100" :show-cancel="false"></x-progress>
            </div>
        </div>
    </div>
</template>

<script>
    import { XProgress } from 'vux'
    export default {
        name: "index",
        title:"办公任务排行",
        components: {
            XProgress
        },
        computed:{
            max(){
                return Math.max.apply(null,this.list.map(e=>e.index))
            }
        },
        data(){
            return {
                list:[
                    {title:"秘书处",index:10,No:1},
                    {title:"秘书处",index:50,No:1},
                    {title:"秘书处",index:70,No:1},
                    {title:"秘书处",index:100,No:1},
                ]
            }
        }
    }
</script>

<style scoped lang="less">
.BillSuggested{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    .BillSuggestedItemBox{
        padding:0 2px;
        .BillSuggestedItem{
            .title{
                margin-bottom: 8px;
                color: rgba(255, 255, 255, 1);
                font-size: 14px;
                span{
                    margin-right: 15px;
                }
            }
            .x-progress{
                &/deep/ .weui-progress__bar{
                    background-color: rgba(40, 59, 75, 1);
                    height: 4px;
                }
                &/deep/ .weui-progress__inner-bar{
                    background-color: #57DFE9;
                }
            }
            &+.BillSuggestedItem{
                margin-top: 12px;
            }
        }
    }
}
</style>