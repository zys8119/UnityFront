<template>
    <layout-filter-content :class="`FilterContent ${currentType}`" :span="span">
        <slot>
            <template slot="filterLeft">
                <slot name="left">
                    <el-dropdown v-if="$slots.menu" class="el-dropdown"  trigger="click">
                        <span class="el-dropdown-link iconfont">&#xe688;</span>
                        <el-dropdown-menu slot="dropdown" class="filterContent-el-dropdown">
                            <div class="dropdownBox">
                                <slot name="menu"></slot>
                            </div>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <el-form v-if="$slots.total">
                        <el-form-item>
                            <div class="filterLeftTotal">
                                <slot name="total"></slot>
                            </div>
                        </el-form-item>
                    </el-form>
                    <slot name="leftBefore"></slot>
                    <el-input class="el-input"
                              clearable
                              v-if="configs.input"
                              v-model="currentValue"
                              :placeholder="configs.placeholder"
                              @change="(configs.search)? $emit(configs.search,currentValue):fn"
                    ></el-input>
                    <el-button  class="filterRightZButton" v-if="configs.searchText" @click="(configs.search)? $emit(configs.search,currentValue):fn" :type="configs.type || 'success'">{{configs.searchText}}</el-button>
                    <el-button  class="filterRightZButton" v-if="configs.resetText" @click="(configs.reset)? $emit(configs.reset,currentValue):fn">{{configs.resetText}}</el-button>
                    <slot name="leftAfter"></slot>
                </slot>
            </template>
            <template slot="filterRight">
                <slot name="right">
                    <slot name="rightBefore"></slot>
                    <z-button class="filterRightZButton" v-for="(item,key) in configs.rightBtns" :key="key" :config="item" @click="(item.emit)? $emit($event.emit,$event):fn" v-if="typeof item.show === 'function'?item.show(item):()=>{}" :class="item.className"></z-button>
                    <slot name="rightAfter"></slot>
                </slot>
            </template>
            <slot name="append"></slot>
        </slot>
    </layout-filter-content>
</template>

<script>
import configs from "@/data/ComponentsConfig"
export default {
    name: "FilterContent",
    props:{
        type:{
            type:String,
            default: null
        },
        config:{
            type:Object,
            default:Object,
        },
        value:{
            type:String,
            default:null,
        },
        span:{
            type:Object,
            default:()=>({
                left:16,
                right:8,
            })
        }
    },
    data(){
        return {
            currentValue:null,
        }
    },
    mounted() {
        this.valueCalc();
    },
    watch:{
        value(){
            this.valueCalc();
        },
        currentValue(val){
            this.$emit("input",val);
        }
    },
    computed:{
        currentType(){
            return this.type || "default";
        },
        configs(){
            try {
                return Object.assign(JSON.parse(JSON.stringify(configs[this.currentType])),this.config);
            }catch (e) {
                console.error(e.message);
            }
            return JSON.parse(JSON.stringify(configs.default));
        },
    },
    methods:{
        fn(){},
        valueCalc(){
            this.currentValue = this.value;
        }
    }
}
</script>

<style scoped lang="less">
.FilterContent{
    @s:40px;
    padding: 0 !important;
    margin-top: -@unit15;
    &/deep/ .LayoutLeftContent-el-main{
        padding: 0 !important;
        .LayoutFilterContentFilter{
            padding: 0 !important;
            margin: 0 !important;
        }
    }
    .el-input{
        width: 230px;
        margin-right: @unit15;
    }
    &.default{
        span{
            &.iconfont{
                width: @s;
                display: inline-block;
                cursor: pointer;
                line-height: 40px;
            }
        }
    }
    .el-dropdown{
        width: @s;
        height: @s;
        line-height: @s;
        overflow: hidden;
        display: inline-block;
        margin-right: @unit15;
        float: left;
        cursor: pointer;
        margin-top: @unit15;
        .el-dropdown-link{
            &.iconfont{
                text-align: center;
                background-color:#67C23A;
                color: #ffffff;
                font-size: 20px;
                width: @s;
                height: @s;
                line-height: @s;
                overflow: hidden;
                display: inline-block;
                &:hover{
                    background-color: #67C23A*0.9;
                }
            }
        }
    }
    .filterRightZButton{
        margin-top: @unit15;
    }
    &/deep/ .el-form{
        display: inline-block;
        margin-top: @unit15;
        .el-form-item{
            display: inline-block;
            margin-right: @unit15;
            .filterLeftTotal{
                position: relative;
                @s:14px;
                padding-left: @s + @unit10;
                &:before{
                    content: "";
                    position: absolute;
                    left: 0;
                    top: 50%;
                    transform: translateY(-50%);
                    width: @s;
                    height: @s;
                    background-color: @themeColor;
                }
            }
        }
    }
    &/deep/ .filterRight{
        .el-form{
            .el-form-item{
                margin-right: 0;
                margin-left: @unit15;
            }
        }
    }

}
</style>