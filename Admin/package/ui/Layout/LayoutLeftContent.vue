<template>
    <div class="LayoutLeftContent">
        <el-container>
            <el-aside :width="asideWidth" v-if="asideShow" class="LayoutLeftContent-el-aside">
                <slot name="aside-header" v-if="asideTitle || $slots['aside-header']">
                    <div class="LayoutLeftContentTitle" v-if="asideTitle" v-html="asideTitle"></div>
                </slot>
                <slot name="aside" v-if="$slots.aside"></slot>
            </el-aside>
            <el-main class="LayoutLeftContent-el-main">
                <slot name="main-header" v-if="mainTitle || $slots['main-header']">
                    <div class="LayoutLeftContentTitle" v-if="mainTitle" v-html="mainTitle"></div>
                </slot>
                <slot></slot>
            </el-main>
        </el-container>
    </div>
</template>

<script>
export default {
    name: "LayoutLeftContent",
    props:{
        asideWidth:{
            type:String,
            default:"300px"
        },
        asideTitle:{
            type:String,
            default: null
        },
        mainTitle:{
            type:String,
            default: null
        },
        asideShow:{
            type:Boolean,
            default: true
        }
    }
}
</script>

<style scoped lang="less">
.LayoutLeftContent{
    padding:@unit15;
    .LayoutLeftContentTitle{
        margin-bottom: @unit10;
        color: #262A30;
        font-size: 16px;
        font-weight: bold;
    }
    .LayoutLeftContent-el-aside{
        overflow: initial;
    }
    .LayoutLeftContent-el-main{
        padding-top: 0;
        padding-right: 0;
    }
}
</style>