<template>
    <div class="card">
        <Contact :px="px" :list="list">
            <template slot-scope="{data}">
                <div class="text-overflow title">{{data.name}}</div>
                <div class="text-overflow">
                    <flexbox v-if="!data.type || data.type === 1">
                        <flexbox-item>
                            <span class="number">{{data.number}}</span>
                            <span v-if="data.type === 1" class="unit">场</span>
                            <span v-else class="unit">件</span>
                        </flexbox-item>
                        <flexbox-item v-if="data.ratioType === 1">
                            <div class="ratioTitle">
                                {{data.ratio}}
                                <span class="iconfont up" v-if="data.ratioType === 1">&#xe62f;</span>
                                <span class="iconfont down"  v-else>&#xe630;</span>
                            </div>
                            <div class="ratioMsg">同比上届</div>
                        </flexbox-item>
                    </flexbox>
                    <div v-if="data.type === 2" class="msg text-overflow">{{data.msg}}</div>
                </div>
            </template>
        </Contact>
    </div>
</template>

<script>
    import Contact from "../behalf/Contact"
    import { Flexbox, FlexboxItem } from "vux"
    export default {
        name: "card",
        title:"人大数据卡片",
        props:{
            px:Function,
        },
        components:{
            Contact, Flexbox, FlexboxItem
        },
        data(){
            return {
                list:[
                    {name:"本届会议数量",number:"233",ratio:"4%",ratioType:1,type:1},
                    {name:"市人大文件数量",number:"136223"},
                    {name:"公文数量",number:"56223"},
                    {name:"本年度办公任务",number:"223"},
                    {name:"当月任务冠军部门",msg:"市人大秘书处",type:2},
                ]
            }
        }
    }
</script>

<style scoped lang="less">
.card{
    .title{
        font-size: 20px;
        color: #ffffff;
        line-height: initial;
    }
    .number{
        color: #57DFE7;
        font-size: 44px;
        font-family:LCDMonoNormal;
        line-height: initial;
    }
    .unit{
        font-size:14px;
        font-weight:400;
        color:rgba(87,223,231,1);
        line-height:20px;
    }
    .ratioTitle{
        color: #57DFE7;
        font-size: 22px;
        margin-left: 15px;
    }
    .ratioMsg{
        font-size: 12px;
        color: #57DFE7;
        margin-left: 15px;
    }

    span{
        &.iconfont{
            &.up{
                color: rgba(253, 51, 51, 1);
            }
            &.down{
                color: rgba(9, 175, 57, 1);
            }
        }
    }
    .msg{
        font-size: 40px;
        color: #57DFE7;
        line-height: initial;
    }
}
</style>