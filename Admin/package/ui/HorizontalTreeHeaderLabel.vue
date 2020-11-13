<template>
    <div class="HorizontalTreeHeaderLabel" :class="{iconOff:!icon}">
        <span class="label">{{ $utils.number_chinese($parent.level+1) }}{{label}}</span>
        <i :class="icon" v-if="icon"></i>
    </div>
</template>

<script>
export default {
    name: "HorizontalTreeHeaderLabel",
    props:{
        label:{
            type:String,
            default: "级目录",
        },
        icon:{
            type: [String, Boolean],
            default:"el-icon-plus"
        }
    }
}
</script>

<style scoped lang="less">
.HorizontalTreeHeaderLabel{
    display: flex;
    font-weight: bold;
    font-family: "微软雅黑";
    span{
        flex: 1;
        color: #000000;
        font-size: 16px;
        position: relative;
        padding-left: 20px;
        &:before{
            content: "";
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 10px;
            height: 10px;
            background-color: @themeColor;
        }
    }
    i{
        line-height: 46px;
        font-size: 20px;
        margin-left: @unit15;
        &:before{
            font-weight: bold;
        }
    }
    &.iconOff{
        span{
            padding-left: 0;
            &:before{
                display: none;
                background-color: transparent;
            }
        }
    }
}
</style>