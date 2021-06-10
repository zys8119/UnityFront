<template>
    <div class="AsideTree" :style="{maxHeight:maxHeight}">
        <div class="aside-tree-box">
            <tree
                class="aside-tree"
                :options="options"
                :showNameField="showNameField"
                :childrenField="childrenField"
                :checked="checked"
                @node="$emit('node',$event)"
            >
                <template slot-scope="{node,data}">
                    <slot :node="node" :data="data" :indent="node.level | indent">
                        <!--type【RoleAssignment】-->
                        <div class="tree-item" :style="node.level | indent" v-if="type === 'RoleAssignment'">
                            <span>{{data[showNameField]}}&nbsp; <span v-if="showType">({{data.type | type}})</span></span>
                            <div v-if="data.type !== 21" class="arrowsIcon">
                                <span v-if="node.node_open" class="arrows down"></span>
                                <span v-else class="arrows up"></span>
                            </div>
                            <slot name="dropdown" :data="data">
                                <span class="arrowsIcon" v-if="data.type === 21" @click.stop="void(0)">
                                    <el-dropdown trigger="click">
                                        <span class="iconfont">&#xe626;</span>
                                        <el-dropdown-menu slot="dropdown">
                                            <el-dropdown-item @click.native="$emit('bindRole',data)">
                                                <div>绑定角色</div>
                                            </el-dropdown-item>
                                        </el-dropdown-menu>
                                    </el-dropdown>
                                </span>
                            </slot>
                        </div>
                        <!--type【default】-->
                        <div class="tree-item" :style="node.level | indent" v-else>
                            <span>{{data[showNameField]}}</span>
                            <div v-if="node.node_parent || data.type === 1" class="arrowsIcon">
                                <span v-if="node.node_open" class="arrows down"></span>
                                <span v-else class="arrows up"></span>
                            </div>
                        </div>
                    </slot>
                </template>
            </tree>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AsideTree",
        props:{
            // 数据
            options:{
                type:Array,
                default:Array
            },
            // 类型
            type:{
                type:String,
                default: null
            },
            // 类型
            showType:{
                type:Boolean,
                default: true
            },
            // 类型
            showNameField:{
                type:String,
                default: "label"
            },
            // 选中key
            checked: {
                type: String,
                default: null
            },
            // 类型
            childrenField:{
                type:String,
                default: "children"
            }
        },
        data(){
            return {
                maxHeight:"auto"
            }
        },
        filters:{
            type(val){
                return {
                    1:"区域",
                    20:"单位",
                    21:"部门",
                }[val]
            },
            indent(level){
                return {width:`${300 - 45 - level*15}px`}
            }
        },
        mounted() {
            this.init();
            let WinOnResize = window.onresize;
            window.onresize = ()=>{
                this.init();
                if(WinOnResize) WinOnResize();
            }
        },
        methods:{
            init(){
                let mainViews = this.$utils.getMainViewContent(this.$el);
                if(mainViews && mainViews.offsetHeight){
                    this.maxHeight = mainViews.offsetHeight+"px";
                    return;
                }
                this.maxHeight = "auto";
            }
        }
    }
</script>

<style lang="less">
    .AsideTree{
        overflow-x: hidden;
        .aside-tree-box{
            background-color: #ffffff;
            .aside-tree{
                width: 300px;
                margin-top: 0 !important;
                .tree-item{
                    padding: 0 @unit15;
                    overflow: hidden;
                    height: @unit40;
                    position: relative;
                    -moz-user-select:none; /* Firefox私有属性 */
                    -webkit-user-select:none; /* WebKit内核私有属性 */
                    -ms-user-select:none; /* IE私有属性(IE10及以后) */
                    -khtml-user-select:none; /* KHTML内核私有属性 */
                    -o-user-select:none; /* Opera私有属性 */
                    user-select:none; /* CSS3属性 */
                    .arrowsIcon{
                        position: absolute;
                        right: 15px;
                        top: 0;
                        span{
                            &.arrows{
                                @size:10px;
                                width: @size;
                                height: @size;
                                display: inline-block;
                                @time: ease 0.3s;
                                &:before{
                                    content: "";
                                    position: absolute;
                                    left: 0;
                                    top: 0;
                                    width: @size;
                                    height: @size;
                                    border: 2px solid;
                                    border-bottom: none;
                                    border-right: none;
                                    border-radius: 2px;
                                }
                                &.down{
                                    transform: rotate(-135deg);
                                    @keyframes animationDown
                                    {
                                        from {transform: rotate(45deg); opacity: 0;}
                                        to {transform: rotate(-135deg); opacity: 1;}
                                    }
                                    animation: animationDown @time;
                                    -moz-animation: animationDown @time;	/* Firefox */
                                    -webkit-animation: animationDown @time;	/* Safari 和 Chrome */
                                    -o-animation: animationDown @time;	/* Opera */
                                }
                                &.up{
                                    transform: rotate(45deg);
                                    @keyframes animationUp
                                    {
                                        from {transform: rotate(-135deg); opacity: 0;}
                                        to {transform: rotate(45deg); opacity: 1;}
                                    }
                                    animation: animationUp @time;
                                    -moz-animation: animationUp @time;	/* Firefox */
                                    -webkit-animation: animationUp @time;	/* Safari 和 Chrome */
                                    -o-animation: animationUp @time;	/* Opera */
                                }
                            }
                            &.iconfont{
                                &:hover{
                                    color: @themeColor;
                                }
                            }
                        }
                    }
                }
                .node{
                    position: relative;
                    &:before{
                        content: "";
                        position: absolute;
                        left: @unit15;
                        top: 0;
                        width: 300px - @unit15*2;
                        border-top: 1px solid #EBEEF5;
                    }
                    &.checked{
                        background-color: #EBEEF5;
                        &:before{
                            border-top: none;
                        }
                    }
                    &:hover{
                        background-color: #eeeeee;
                    }
                }
                &.isTop{
                    &>.node_row{
                        &>.node{
                            &:before{
                                border: none;
                            }
                        }
                    }
                }
            }
        }
    }
</style>