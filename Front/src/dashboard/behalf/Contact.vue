<template>
    <div class="contact webkit-scrollbar">
        <div class="contactCard" v-for="(item) in list" :style="{
            width:`calc((100% - (30px * ${list.length-1})) / ${list.length})`
        }">
            <div class="content">
                <slot :data="item">
                    <div class="text-overflow" v-if="item.name" :style="{fontSize:px(20,item.name.length)}">{{item.name}}</div>
                    <div class="text-overflow" v-if="item.number" :style="{fontSize:px(20,item.number.length)}">{{item.number}}</div>
                    <div class="text-overflow" v-if="item.tel" :style="{fontSize:px(20,item.tel.length)}">{{item.tel}}</div>
                </slot>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Contact",
        title:"代表联络站卡片",
        props:{
            px:Function,
            list:{type:Array,default:()=>[
                    {name:"海曙白云街道联络站",number:"前丰街80号",tel:"0574-56803380"},
                    {name:"海曙白云街道联络站",number:"前丰街80号",tel:"0574-56803380"},
                    {name:"海曙白云街道联络站",number:"前丰街80号",tel:"0574-56803380"},
            ]}
        },
    }
</script>

<style scoped lang="less">
.contact{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    .contactCard{
        background-color: rgba(11, 54, 91, 0.5);
        color: rgba(153, 153, 153, 1);
        height: 100%;
        width: 30%;
        float: left;
        font-size: 20px;
        line-height: 28px;
        position: relative;
        .content{
            position: absolute;
            left: 50%;
            top: 50%;
            display: inline-block;
            transform: translate(-50%,-50%);
        }
        &:hover{
            background-color: rgba(11, 54, 91, 1);
            color: #ffffff;
        }
        &+.contactCard{
            margin-left: 30px;
        }
        &:before{
            content: "";
            position: absolute;
            left: 0;
            bottom: 0;
            width: 16px;
            height: 16px;
            border: 1px solid #4BC4CE;
            border-top: none;
            border-right: none;
        }
        &:after{
            content: "";
            position: absolute;
            top: 0;
            right: 0;
            width: 16px;
            height: 16px;
            border: 1px solid #4BC4CE;
            border-left: none;
            border-bottom: none;
        }
    }
}
</style>