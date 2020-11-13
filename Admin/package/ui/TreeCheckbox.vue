<template>
    <div class="TreeCheckbox">
        <tree :options="currentOptions"
              searchShow
              :showNameField="showNameField"
              :childrenField="childrenField"
              :searchChange="searchChange"
              ref="tree"
        >
            <div slot="header" v-if="checkbox" class="TreeCheckboxHeader">
                <el-checkbox @change="changeAll" v-model="checkboxAll"></el-checkbox>
                <span class="lableCheckboxAll">全选</span>
                <span class="quantity">
                    <slot name="quantity-all" :index="currentValue.length">已选：{{currentValue.length}}/{{getAllNodeIndex}}</slot>
                </span>
            </div>
            <template slot-scope="{data, node}">
                <slot :data="data" :node="{
                    ...node,
                    selectedIndex:checkboxIndex(data),
                    selectedAllIndex:childrenIndex(data),
                }">
                    <el-checkbox
                            v-if="checkbox"
                            :ref="`checkbox${node.keyMap}`"
                            class="el-checkbox"
                            :indeterminate="data.indeterminate"
                            @change="change($event,data,node)"
                            :bindData="data"
                            v-model="data.checkbox">
                    </el-checkbox>
                    <span class="iconfont" v-if="showIcon">
                        <slot name="icon" :data="data" :node="{
                        ...node,
                        selectedIndex:checkboxIndex(data),
                        selectedAllIndex:childrenIndex(data),
                    }"></slot>
                    </span>
                    <span :class="{lableCheckbox:data.checkbox}">{{data[showNameField]}}</span>
                    <span class="quantity" v-if="quantity && !node_type(data)">{{checkboxIndex(data)}}/{{childrenIndex(data)}}</span>
                    <div v-if="arrowsIcon && (node.node_parent || !node_type(data))" class="arrowsIcon">
                        <span v-if="node.node_open" class="arrows down"></span>
                        <span v-else class="arrows up"></span>
                    </div>
                    <slot name="append" :data="data" :node="{
                        ...node,
                        selectedIndex:checkboxIndex(data),
                        selectedAllIndex:childrenIndex(data),
                    }"></slot>
                </slot>
            </template>
        </tree>
    </div>
</template>

<script>
export default {
    name: "TreeCheckbox",
    props:{
        // 是否启用复选框
        checkbox:{
            type:Boolean,
            default:true,
        },
        // 指定显示字段
        showNameField: {
            type: String,
            default: "node_name"
        },
        // 指定子节点父级字段
        childrenField: {
            type: String,
            default: "children"
        },
        // 指定子节点父级字段
        nodeIdField: {
            type: String,
            default: "node_id"
        },
        // 是否显示数量字段
        quantity: {
            type: Boolean,
            default: true
        },
        // 是否显示箭头
        arrowsIcon: {
            type: Boolean,
            default: true
        },
        // 绑定值
        value:{
            type:Array,
            default: Array
        },
        // 数据
        options:{
            type:Array,
            default: Array
        },
        // 搜索内容回调
        searchChange:{
            type:Function,
            default:()=>true,
        },
        // 显示图标
        showIcon:{
            type:Boolean,
            default:false,
        },
        // 自定义节点类型
        node_type:{
            type:Function,
            default:data=>(data.node_type === 0)
        },
    },
    data(){
        return {
            currentValue:[],
            currentOptions:[],
            nodeNotShow:[],
            search:"",
            getAllNodeIndex:0,
            checkboxAll:false
        }
    },
    mounted() {
        this.initData();
        this.initOptInit();
    },
    watch:{
        value(){
            this.initData();
        },
        options(){
            this.initOptInit();
        }
    },
    methods:{
        // 选择总数计算
        childrenIndex(data){
            return this.$utils.findChild(data,null,this.childrenField)
                .filter(e=>this.searchChange(this.$refs.tree.currentSearch,e,"deepIndex"))
                .length;
        },
        // 选择个数计算
        checkboxIndex(data){
            let index = this.$utils.findChild(data,null,this.childrenField).filter(e => e.checkbox && this.node_type(e));
            if(index.length === 0) {
                return 0;
            }
            return index.length;
        },
        // 初始化数据
        initData(){
            this.currentValue = this.value;
            this.checkboxInit();
        },
        // 初始化数据选项
        initOptInit(){
            this.currentOptions = JSON.parse(JSON.stringify(this.options));
            this.currentValue = [];
            this.checkboxAll = false;
            this.checkboxInit(true);
        },
        //设置父级checkbox
        setCheckbox(findPathData){
            this.$nextTick(() => {
                let childrenList = this.$utils.findChild(findPathData,null,this.childrenField);
                let childrenListCheckbox = childrenList.filter(e => e.checkbox);
                let ListCheckbox = childrenListCheckbox;
                if(findPathData === childrenListCheckbox[0]){
                    ListCheckbox = ListCheckbox.slice(1);
                }
                if (childrenList.slice(1).length === ListCheckbox.length) {
                    this.$set(findPathData, 'checkbox', true);
                } else {
                    this.$set(findPathData, 'checkbox', false);
                }
            });
        },
        // 设置子集checkbox
        setCheckboxChildren(val,data){
            this.$utils.findChild(data,null,this.childrenField).slice(1).forEach(child=>{
                this.$set(child, 'checkbox', val);
            });
        },
        // 全选
        changeAll(val){
            this.getAllNode().then(AllNodeData=>{
                AllNodeData.forEach(nodeData=>{
                    if(nodeData){
                        this.$set(nodeData, 'checkbox', val);
                    }
                });
                // 设置最新的选中值
                this.currentValue = [...new Set(AllNodeData.filter(e =>e && e.checkbox).map(e=>e[this.nodeIdField]))];
                this.$emit("input",this.currentValue, AllNodeData);
            });
        },
        // checkbox完成
        change(val,data){
            // 先设置子集
            this.$nextTick(() => {
                this.setCheckboxChildren(val,data);
            });
            // 后设置父级
            this.$nextTick(() => {
                let findPathObjResult = this.$utils.findPath(this.options, data,this.childrenField);
                if(findPathObjResult){
                    let findPathAll = findPathObjResult.reverse().slice(1);
                    findPathAll.forEach((item) => {
                        this.setCheckbox(item);
                    });
                }
            });
            this.getAllNode().then(AllNodeData=>{
                // 设置最新的选中值
                this.currentValue = [...new Set(AllNodeData.filter(e =>e && e.checkbox).map(e=>e[this.nodeIdField]))];
                this.$emit("input",this.currentValue, AllNodeData);
                this.checkboxAll = (this.currentValue.length === this.getAllNodeIndex);
            });
        },
        // 获取全部节点
        getAllNode(){
            return new Promise((resolve) => {
                this.$nextTick(() => {
                    resolve(Object.keys(this.$refs).filter(k=>this.$refs[k] && this.$refs[k].$vnode).map(k=>this.$refs[k].$vnode.data.attrs.bindData));
                });
            });
        },
        // 复选框状态初始化
        checkboxInit(clear){
            if(this.checkbox && (this.currentValue.length > 0 || clear)){
                this.getAllNode().then(AllNodeData=>{
                    this.getAllNodeIndex = [...new Set(AllNodeData.filter(e=>e).map(e=>(e && e[this.nodeIdField])?e[this.nodeIdField]:null))].length;
                    AllNodeData.forEach(nodeData=>{
                        if(clear && nodeData){this.$set(nodeData, 'checkbox', false); return}
                        if(nodeData && nodeData[this.nodeIdField] && this.currentValue.some(e=>e === nodeData[this.nodeIdField])){
                            this.$set(nodeData, 'checkbox', true);
                        }
                    })
                })
            }
        },
    }
}
</script>

<style scoped lang="less">
.TreeCheckbox{
    min-width: 100%;
    overflow: hidden;
    .TreeCheckboxHeader{
        margin-bottom: @unit10;
    }
    .Tree.isTop{
        margin-top: 10px;
        width: 100%;
    }
    .el-checkbox{
        margin-right: @unit10;
        margin-left: @unit10;
        &/deep/ .el-checkbox__inner{
            z-index: 0;
        }
    }
    span{
        &.lableCheckbox{
            color: #409EFF;
        }
        &.lableCheckboxAll{
            font-weight: bold;
        }
    }
    span{
        &.quantity{
            color: #999999;
            margin-left: @unit10;
        }
        &.iconfont{
            color: @themeColor;
            margin-right: @unit10;
            font-size: 18px;
        }
    }

    .arrowsIcon{
        display: inline-block;
        margin-left: @unit10;
        color: #999999;
        span{
            display: inline-block;
            transform: translateY(-3px);
            &.arrows{
                @size:5px;
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
        }
    }
}
</style>