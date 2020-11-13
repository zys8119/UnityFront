<template>
    <div class="Steps">
        <div class="StepsItem" :class="{selected:item.selected}" :style="{width:key === (data.length - 1) ? 100/data.length*0.7 + 100/data.length*0.3/data.length+'%':100/data.length + 100/data.length*0.3/data.length +'%'}" v-for="(item,key) in data" :key="key" @click="$emit('click',item,key)">
            <div class="StepsItemBox">
                <el-button class="el-button" type="success" :plain="!item.selected">{{item.name}}</el-button>
                <div class="line"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Steps",
    props:{
        data:{
            type:Array,
            default:Array
        }
    }
}
</script>

<style scoped lang="less">
.Steps{
    text-align: center;
    .StepsItem{
        display: inline-block;
        .StepsItemBox{
            width: 100%;
            text-align: left;
            position: relative;
            .el-button{
                box-sizing: border-box !important;
                height:120px;
                width:70%;
                z-index: 2;
                position: relative;
                padding: 0 !important;
            }
            .line{
                @color:#d8d8d8;
                position: absolute;
                z-index: 1;
                right: @unit15;
                top: 50%;
                transform: translateY(-50%);
                background-color: @color;
                height:2px;
                width: 50%;
                &:before{
                    content: "";
                    position: absolute;
                    right: -@unit15;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 0;
                    height: 0;
                    border-top: @unit15/3 solid transparent;
                    border-left: @unit15 solid @color;
                    border-bottom: @unit15/3 solid transparent;
                }
            }
        }
        &:last-child{
            .StepsItemBox{
                .el-button{
                    width: 100%;
                }
                .line{
                    display: none;
                }
            }
        }
        &.selected{
            .StepsItemBox{
                .line{
                    background-color: @success;
                    &:before {
                        border-left-color: @success;
                    }
                }
            }
        }
    }
}
</style>