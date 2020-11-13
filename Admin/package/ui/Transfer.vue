<template>
    <div class="Transfer">
        <el-row>
            <el-col :span="11">
                <div class="TransferBox">
                    <div class="TransferBoxItem">
                        <tree-checkbox
                                :showNameField="showNameField"
                                :childrenField="childrenField"
                                :nodeIdField="nodeIdField"
                                :searchChange="leftSearchChange"
                                ref="leftTree"
                                :node_type="node_type"
                                showIcon
                                :options="leftOptions" @input="leftCheckboxInput">
                            <template slot="icon" slot-scope="{data, node}">
                                <slot name="icon" :data="data" :node="node">
                                    <template v-if="node_type(data)">&#xe65b;</template>
                                    <template v-else-if="data.node_type === 21 || data.node_type === 32">&#xe62b;</template>
                                    <template v-else>&#xe6be;</template>
                                </slot>
                            </template>
                            <template slot-scope="{data, node}">
                                <slot :data="data" :node="node"></slot>
                            </template>
                            <template slot="append" slot-scope="{data, node}">
                                <slot name="append" :data="data" :node="node"></slot>
                            </template>
                        </tree-checkbox>
                    </div>
                </div>
            </el-col>
            <el-col :span="13">
                <div class="TransferBox right">
                    <el-row>
                        <el-col :span="4" class="arrowBox">
                            <el-button icon="el-icon-arrow-left" class="arrowLeft" @click="arrowLeft"></el-button>
                            <el-button icon="el-icon-arrow-right" class="arrowRight" @click="arrowRight"></el-button>
                        </el-col>
                        <el-col :span="20">
                            <div class="TransferBoxItem">
                                <tree-checkbox
                                        :showNameField="showNameField"
                                        :childrenField="childrenField"
                                        :nodeIdField="nodeIdField"
                                        :searchChange="rightSearchChange"
                                        :arrowsIcon="false"
                                        :node_type="node_type"
                                        showIcon
                                        :quantity="false" :options="resUltList"  @input="leftCheckboxInput">
                                    <template slot="icon" slot-scope="{data, node}">
                                        <slot name="icon" :data="data" :node="node">&#xe65b;</slot>
                                    </template>
                                    <template slot-scope="{data, node}">
                                        <slot :data="data" :node="node"></slot>
                                    </template>
                                    <template slot="append" slot-scope="{data, node}">
                                        <slot name="append" :data="data" :node="node">
                                            <i class="el-icon-close" @click.stop="close(data,node)"></i>
                                        </slot>
                                    </template>
                                </tree-checkbox>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: "Transfer",
    props:{
        // 数据
        options:{
            type:Array,
            default:Array
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
        // v-model
        value: {
            type: Array,
            default: Array
        },
        // 自定义节点类型
        node_type:{
            type:Function,
            default:data=>(data.node_type === 0)
        },
    },
    data(){
        return {
            resUltList:[],
            leftCheckbox:[],
            leftCheckboxNodes:[],
            leftOptions:[],
        }
    },
    watch:{
        options(){
            this.initLeftOptions(JSON.parse(JSON.stringify(this.options)));
        },
        resUltList(){
            this.$nextTick(()=>{
                this.$emit("input",this.resUltList.map(e=>e[this.nodeIdField]))
            })
        },
        value(){
            // this.initData();
        }
    },
    mounted() {
        this.initData();
    },
    methods:{
        // 初始化数据
        initData(){
            this.initLeftOptions(JSON.parse(JSON.stringify(this.options)));
            this.$nextTick(()=>{
                this.initValue();
            });
        },
        // 初始化value
        initValue(){
            this.$refs.leftTree.getAllNode().then(AllNodeData=>{
                AllNodeData.forEach(nodeData=>{
                    if(nodeData && this.value.indexOf(nodeData[this.nodeIdField]) !== -1){
                        this.$set(nodeData, 'checkbox', true);
                    }
                });
                this.leftCheckboxInput(this.value,AllNodeData);
                this.resUltList = [];
                this.arrowRight();
            });
        },
        // 左边搜索
        leftSearchChange(currentSearch,data,type){
            if(type === "deepIndex"){
                return (this.node_type(data) && data[this.showNameField] && data[this.showNameField].indexOf(currentSearch) > -1);
            }
            return !this.node_type(data) || currentSearch.length === 0 || (this.node_type(data) && data[this.showNameField] && data[this.showNameField].indexOf(currentSearch) > -1)
        },
        // 右边已选搜索
        rightSearchChange(currentSearch,data){
            return data[this.showNameField] && data[this.showNameField].indexOf(currentSearch) > -1
        },
        // 删除单个
        close(data,node){
            this.resUltList.splice(node.key,1);
            this.arrowLeft(true);
        },
        // 左移动
        arrowLeft(bool){
            let resUltList = JSON.parse(JSON.stringify(this.resUltList)).map(e=>e[this.nodeIdField])
            let CheckboxList = resUltList.filter(e=>this.leftCheckbox.indexOf(e) === -1);
            if(bool === true){
                CheckboxList = resUltList;
            }
            this.initLeftOptions(this.getNewOptions(JSON.parse(JSON.stringify(this.options)),CheckboxList));
            this.resUltList = CheckboxList.map(e=>this.resUltList[resUltList.indexOf(e)]);
        },
        // 右移动
        arrowRight(){
            this.initLeftOptions(this.getNewOptions(JSON.parse(JSON.stringify(this.leftOptions)),this.leftCheckbox));
            this.resUltList = [...new Set(this.resUltList.concat([...new Set(this.leftCheckboxNodes.map(e=>e[this.nodeIdField]))].map((nodeIdField)=>{
                let item = this.leftCheckboxNodes.find(e=>e[this.nodeIdField] === nodeIdField);
                item[this.nodeIdField] = nodeIdField;
                this.node_type(item,true)
                item.node_type = 0;
                return item;
            })).map(item=>JSON.stringify(item)))].map(e=>JSON.parse(e));
        },
        // 计算新选项数据
        getNewOptions(options,CheckboxList){
            return options
                .filter(e=>CheckboxList.indexOf(e[this.nodeIdField]) == -1)
                .map(e=>{
                    if(e[this.childrenField] && e[this.childrenField].length > 0){
                        e[this.childrenField] = this.getNewOptions(e[this.childrenField],CheckboxList);
                    }
                    return e;
                })
        },
        // 左边复选框选中计算
        leftCheckboxInput(val,AllNodeData){
            // 根据node_type=0设置最新的选中值
            this.leftCheckboxNodes = AllNodeData.filter(e =>e && e.checkbox && this.node_type(e));
            this.leftCheckbox = [...new Set(this.leftCheckboxNodes.map(e=>e[this.nodeIdField]))];
        },
        // 初始化左边的数据选项
        initLeftOptions(options){
            this.leftOptions = options;
        },
    }
}
</script>

<style scoped lang="less">
.Transfer{
    .el-icon-close{
        margin-left: @unit15;
        color: #999999;
        display: none;
        float: right;
        margin-right: @unit10;
        margin-top: (50px - 14px)/2;
        &:hover{
            color: @themeColor;
        }
    }
    .TransferBox{
        position: relative;
        padding: @unit15 0;
        padding-left: @unit15;
        overflow: hidden;
        .TransferBoxItem{
            border:1px solid #d8d8d8;
            padding: @unit15;
        }
        &/deep/ .TreeCheckbox{
             .Tree{
                 &.isTop{
                     &> .TreeBox{
                         @size: 500px;
                         height: @size;
                         overflow-x: hidden;
                         .Tree{
                             width: @size;
                             margin: 0;
                         }
                     }
                 }
                 .node{
                     &:hover{
                         background-color:#eee;
                         box-shadow: inset 0 0px 0px 1px #d8d8d8;
                         border-radius: 5px;
                         .el-icon-close{
                             display: initial;
                         }
                     }
                 }
             }
        }
        &.right{
            padding-left: 0;
            padding-right: @unit15;
            .arrowBox{
                min-height: 1px;
                .arrowLeft{
                    @w:60px;
                    position: absolute;
                    left: 10px;
                    left: ~"calc((100% / 24 * 4 - (@{w})) / 2)";
                    top: 50% - 20%;
                    top: ~"calc(50% - 40px)";
                    width:@w;
                }
                .arrowRight{
                    .arrowLeft;
                    top: 50% + 5%;
                    margin-left: 0;
                }
            }
        }
    }
}
</style>