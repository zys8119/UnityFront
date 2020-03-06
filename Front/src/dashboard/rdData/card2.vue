<template>
    <div class="card">
        <Contact :px="px" :list="list" class="Contact">
            <template slot-scope="{data}">
                <div class="text-overflow title" :style="{fontSize:px(18,data.name.length)}">{{data.name}}</div>
                <div class="text-overflow number" :style="{fontSize:px(45,data.number.length)}">{{data.number}}</div>
            </template>
        </Contact>
    </div>
</template>

<script>
    import Contact from "../behalf/Contact"
    import { Flexbox, FlexboxItem } from "vux"
    export default {
        name: "card",
        title:"办公任务数量",
        props:{
            px:Function,
        },
        components:{
            Contact, Flexbox, FlexboxItem
        },
        data(){
            return {
                list:[
                    {name:"本年度任务数量",number:"253"},
                    {name:"本季度任务数量",number:"107"},
                    {name:"本月任务数量",number:"85"},
                ]
            }
        }
    }
</script>

<style scoped lang="less">
.card{
    .title{
        font-size: 18px;
        line-height: initial;
        color: #A1ACB5;
    }
    .number{
        font-size:45px;
        font-family:LCDMonoNormal;
        color:rgba(87,223,233,1);
        line-height: initial;
        width: 100%;
        text-align: center;
        margin-top: 10px;
    }
    .Contact{
        &/deep/ .contactCard{
            background-color: transparent;
            &:before{
                display: none;
            }
            &:after{
                display: none;
            }
        }
    }
}
</style>