<template>
    <div class="BillSuggested webkit-scrollbar">
        <div class="BillSuggestedItemBox">
            <div class="BillSuggestedItem" v-for="(item,key) in list" :key="key">
                <p class="title"><span>NO.{{item.No}}</span> {{item.title}}—议案建议：{{item.index}}条</p>
                <x-progress class="x-progress" :percent="item.index/max*100" :show-cancel="false"></x-progress>
            </div>
        </div>
    </div>
</template>

<script>
    import { XProgress } from 'vux'
    export default {
        name: "index",
        title:"议案建议排行",
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
                    {title:"海曙代表团",index:10,No:1},
                    {title:"海曙代表团",index:20,No:2},
                    {title:"海曙代表团",index:48,No:2},
                    {title:"海曙代表团",index:48,No:2},
                    {title:"海曙代表团",index:48,No:2},
                    {title:"海曙代表团",index:101,No:2},
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
                    background-color: rgba(99, 71, 206, 1);
                }
            }
            &+.BillSuggestedItem{
                margin-top: 12px;
            }
        }
    }
}
</style>