<template>
    <div class="TransferTest">
        <div class="TransferLeft">
            <div class="TreeSearchBox">
                <el-input class="TreeSearch"
                          prefix-icon="el-icon-search"
                          v-model="search"
                          @input="searchChange"
                          placeholder="请输入关键字">
                </el-input>
                <div class="TransferTestTitle" v-if="$scopedSlots.title">
                    &nbsp;
                    <slot name="title" type="left"></slot>
                </div>
            </div>
            <div class="TransferBox" :style="{height:height-85-(($scopedSlots.title)?30:0) - 2+'px'}">
                <TransferTree :options="currentOptions"
                              :showNameField="showNameField"
                              :childrenField="childrenField"
                              :line="line"
                              :indent="indent"
                >
                    <template slot="header">
                        <slot name="header">
                            <div class="tree_header" v-if="search.length === 0">
                            <span :class="{
                            checkbox:checkbox,
                            uncheckbox:!checkbox
                        }" @click.stop="checkboxAll" class="iconfont checkbox">&#xe600;</span>
                                全选 <span class="quantity">已选：{{currentValue.length}}/{{max}}</span>
                            </div>
                        </slot>
                    </template>
                    <template slot-scope="{data, node}">
                        <span :class="{
                            checkbox:currentValue.indexOf(data[nodeIdField]) > -1,
                            uncheckbox:currentValue.indexOf(data[nodeIdField]) === -1
                        }" @click.stop="checkboxClick(data)" class="iconfont checkbox">&#xe600;</span>
                        <slot :data="data" :node="node">
                            <span class="iconfont icon">
                                <slot name="icon" :data="data" :node="node">
                                    <template v-if="node_type(data)">&#xe65b;</template>
                                    <template v-else-if="data.node_type === 21 || data.node_type === 32">&#xe62b;</template>
                                    <template v-else>&#xe6be;</template>
                                </slot>
                            </span>
                            <span :title="data[showNameField]">{{data[showNameField] | label(data,_self)}}{{setMap(node)}}</span>
                            <span class="quantity" v-if="quantity && !node_type(data)">{{data|lng(_self)}}/{{data|lng(_self,true)}}</span>
                            <div v-if="arrowsIcon && (node.node_parent || !node_type(data))" class="arrowsIcon">
                                <span v-if="data.node_open" class="arrows up"></span>
                                <span v-else class="arrows down"></span>
                            </div>
                            <span class="iconfont close" v-if="type === 'right'" @click.stop="close(data)">&#xe60e;</span>
                        </slot>
                    </template>
                </TransferTree>
            </div>
        </div>
        <div class="TransferRight" v-if="index > 0">
            <div class="TransferRightItem" v-for="i in index" :key="i">
                <div class="TransferContent">
                    <el-button icon="el-icon-arrow-left" class="arrowLeft"  @click="arrowLeft(i)"></el-button>
                    <el-button icon="el-icon-arrow-right" class="arrowRight" @click="arrowRight(i)"></el-button>
                </div>
                <div class="TransferRightContent">
                    <transfer-box
                        :index="0"
                        :options="mapVal[i] || []"
                        :height="height/index"
                        :ref="`transfer${i}`"
                        :showNameField="showNameField"
                        :childrenField="childrenField"
                        :nodeIdField="nodeIdField"
                        :node_type="node_type"
                        :arrowsIcon="arrowsIcon"
                        :quantity="quantity"
                        type="right"
                        :refIndex="i"
                        :label="label"
                    >
                        <slot slot="title" name="title" type="right" :index="i"></slot>
                        <slot slot="header" name="header"></slot>
                        <template slot-scope="{data, node}">
                            <slot :data="data" :node="node"></slot>
                        </template>
                        <template slot="icon" slot-scope="{data, node}">
                            <slot name="icon" :data="data" :node="node"></slot>
                        </template>
                    </transfer-box>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "transfer-box",
        props:{
            options:{type:Array,default:Array},
            showNameField:{type:String,default:"node_name"},
            childrenField:{type:String,default:"children"},
            nodeIdField:{type:String,default:"node_id"},
            node_type:{type:Function,default:data=>(data.node_type === 0)},
            arrowsIcon:{type:Boolean,default:true},
            quantity:{type:Boolean,default:true},
            height:{type:Number,default:500},
            index:{type:Number,default:1},
            type:{type:String,default:"left"},
            value:{type:Array,default:Array},
            refIndex:{type:Number,default:null},
            label:{type:Function,default:null},
            line:{type:Boolean,default:false},
            indent:{type:Number,default:30},
        },
        data(){
            return {
                checkbox:false,
                map:{},
                mapArr:[],
                currentValue:[],
                max:0,
                search:"",
                currentOptions:[],
                mapVal:{},
            }
        },
        filters:{
            // 个数过滤器
            lng(data,_self,bool){
                if(bool){
                    let children = data[_self.childrenField];
                    if(Object.prototype.toString.call(children) === "[object Array]"){
                        return _self.getChildrenNodeIds(children).filter(e=>_self.map[e]).length
                    }
                }
                let children = data[_self.childrenField];
                if(Object.prototype.toString.call(children) === "[object Array]"){
                    let nodeIds = _self.getChildrenNodeIds(children);
                    return  _self.currentValue.filter(e=>nodeIds.some(ee=>e === ee)).length;
                }else {
                    return 0;
                }
            },
            label(val,data,_self){
                try {
                    return _self.label(val,data,_self) || val;
                }catch (e) {
                    return  val;
                }
            }
        },
        watch:{
            // 监听数据
            options(){
                this.initOptions();
                this.initValue();
            }
        },
        mounted() {
            // 初始数据
            this.initOptions();
            this.initValue();
        },
        methods:{
            // 关闭单个已选
            close(data){
                this.currentValue = [];
                this.checkboxClick(data);
                this.$parent.arrowLeft(this.refIndex);
            },
            // 向左移动
            arrowLeft(i,bool){
                let vm = this.$refs[`transfer${i}`][0];
                let oldMap = this.mapVal[i] || [];
                oldMap = oldMap.filter(e=>!vm.currentValue.some(ee=>ee === e[this.nodeIdField]));
                this.$set(this.mapVal,i,oldMap);
                let valFilter = this.mapArr.filter(e=>vm.currentValue.some(ee=>ee === e[this.nodeIdField] && this.node_type(e)));
                valFilter.forEach(item=>{
                    this.$set(item,"$$Filter",false);
                });
                vm.currentValue = [];
                vm.checkbox = false;
                vm.search = "";
                this.inputVal(bool);
            },
            // 向右移动
            arrowRight(i,bool,uploadBool){
                if(uploadBool && this.index !== 1){
                    this.mapArr.forEach(item=>{
                        if(!this.value.toString().split(",").some(e=>e === item[this.nodeIdField])){
                            this.$set(item,"$$Filter",false);
                        }
                    });
                }
                let valFilter = this.mapArr.filter(e=>{
                    if(uploadBool && this.index === 1){
                        if(this.index === 1){
                            this.$set(e,"$$Filter",false);
                        }
                    }
                    return this.currentValue.some(ee=>ee === e[this.nodeIdField] && this.node_type(e));
                });
                let valueData = JSON.parse(JSON.stringify(valFilter));
                valFilter.forEach(item=>{
                    this.$set(item,"$$Filter",true);
                });
                let oldMap = this.mapVal[i] || [];
                oldMap = (uploadBool)? valueData.map(e=>({...e,$$Filter:false})) :oldMap.concat(valueData);
                oldMap = [...new Set(oldMap.map(e=>e[this.nodeIdField]))].map(nodeIdField=>oldMap.find(e=>e[this.nodeIdField] === nodeIdField));
                this.$set(this.mapVal,i,oldMap);
                this.currentValue = [];
                this.checkbox = false;
                this.search = "";
                this.inputVal(bool,uploadBool);
            },
            // 搜索
            searchChange(val){
                if(val.length === 0){
                    this.initOptions();
                }else {
                    this.currentOptions = Object.keys(this.map).filter(e=>{
                        let label = this.$options.filters.label(this.map[e][this.showNameField],this.map[e],this);
                        return label.indexOf(val) > -1;
                    }).map(e=>{
                        let item = {};
                        item = JSON.parse(JSON.stringify(this.map[e]));
                        return item;
                    })
                }
            },
            // v-model双向绑定
            inputVal(bool, uploadBool){
                if(!bool && !uploadBool){
                    let resurl = Object.keys(this.mapVal).map(e=>this.mapVal[e].map(ee=>ee[this.nodeIdField]));
                    if(this.index === 1){
                        this.$emit("input",resurl[0]);
                        this.$emit("on-change",resurl[0]);
                    }else {
                        this.$emit("input",resurl);
                        this.$emit("on-change",resurl);
                    }
                }
                this.$nextTick(()=>{
                    this.setMap()
                })
            },
            // 初始化value
            initValue(bool){
                this.$nextTick(()=>{
                    if(this.index === 1){
                        this.currentValue = this.value;
                        this.arrowRight(1,true,bool);
                    }else {
                        this.value.forEach((item,key)=>{
                            this.currentValue = item;
                            this.arrowRight(key+1,true,bool);
                        })
                    }
                });
            },
            // 异步更新value
            updateValue(){
                this.initValue(true);
            },
            // 初始化数据
            initOptions(){
                this.currentValue = [];
                this.map = {};
                this.mapArr = [];
                this.currentOptions = this.getNewOptions(JSON.parse(JSON.stringify(this.options)),Object.keys(this.mapVal).map(e=>this.mapVal[e].map(w=>w[this.nodeIdField])).toString().split(','));
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
            // 选择节点
            checkboxClick(data){
                let index = this.currentValue.indexOf(data[this.nodeIdField]);
                let children = data[this.childrenField];
                let nodeIds = [];
                if(Object.prototype.toString.call(children) === "[object Array]"){
                    nodeIds = this.getChildrenNodeIds(children);
                }
                if(index === -1){
                    this.currentValue.push(data[this.nodeIdField]);
                    nodeIds.forEach(e=>{
                        let index2 = this.currentValue.indexOf(e);
                        if(index2 === -1){
                            this.currentValue.push(e);
                        }
                    });
                }else {
                    this.currentValue.splice(index,1);
                    nodeIds.forEach(e=>{
                        let index2 = this.currentValue.indexOf(e);
                        if(index2 !== -1){
                            this.currentValue.splice(index2,1);
                        }
                    });
                }
            },
            // 获取所有子集的nodeId
            getChildrenNodeIds(children,result){
                result = result || [];
                children.forEach(item=>{
                    if(!item.$$Filter){
                        result.push(item[this.nodeIdField]);
                    }
                    let child = item[this.childrenField];
                    if(Object.prototype.toString.call(child) === "[object Array]"){
                        this.getChildrenNodeIds(child, result);
                    }
                });
                return result;
            },
            // 设置数据映射
            setMap(node){
                try {
                    this.map[node.data[this.nodeIdField]] = node.data;
                    if(this.mapArr.indexOf(node.data) === -1){
                        this.mapArr.push(node.data);
                    }
                }catch (e) {
                    this.$nextTick(()=>{
                        this.max = Object.keys(this.map).filter(e=>!this.map[e].$$Filter).length;
                        for(let k in this.$refs){
                            try {
                                let _vm = this.$refs[k][0];
                                _vm.max = Object.keys(_vm.map).filter(e=>!_vm.map[e].$$Filter).length;
                            }catch (e) {
                                /*err*/
                            }
                        }
                    })
                }

            },
            // 全选
            checkboxAll(){
                this.checkbox = !this.checkbox;
                if(this.checkbox){
                    this.currentValue = Object.keys(this.map).filter(e=>!this.map[e].$$Filter);
                }else {
                    this.currentValue = [];
                }
            }
        }
    }
</script>

<style scoped lang="less">
    .TransferTest{
        overflow: hidden;
        @w:20%;
        @w2:70px;
        .TransferLeft{
            float: left;
            width: (100% - @w) / 2;
            width: ~"calc((100% - @{w2}) / 2 - 4px)";
            border: 1px solid #e5e5e5;
            .TransferBox{
                padding: @unit15;
                overflow: hidden;
                height: 500px;
                overflow: auto;
            }
            .TreeSearchBox{
                padding: @unit15;
                padding-bottom: 0;
            }
        }
        .TransferRight{
            .TransferLeft;
            float: right;
            width: (100% - @w) / 2 + @w;
            width: ~"calc((100% - @{w2}) / 2 + @{w2} - 2px)";
            border: none;

            .TransferRightItem{
                overflow: hidden;
                width: 100%;
                position: relative;
                .TransferContent{
                    float: left;
                    text-align: center;
                    width:@w;
                    width:~"calc(@{w2})";
                    position: absolute;
                    left: -2px;
                    top: 25%;
                    top:~"calc(50%)";
                    transform: translateY(-50%);
                    .arrowLeft{
                        display: block;
                        margin: 0 auto;
                    }
                    .arrowRight{
                        .arrowLeft;
                        margin-top: @unit15;
                    }
                }
                .TransferRightContent{
                    float: right;
                    width: (100% - @w);
                    width:~"calc(100% - @{w2})";
                }
            }
            .TransferTest{
                border:none;
                .TransferLeft{
                    width: 100%;
                    width: ~"calc(100% - 2px)";
                }
            }
        }
        span.checkbox{
            float: left;
            @s:16px;
            @transition:background-color,color ease-in 80ms;
            width: @s;
            height: @s;
            margin: 0 @unit15;
            margin-top: (50px - @s) /2;
            border-radius: 2px;
            box-shadow: inset 0 0 0 1px #d8d8d8;
            user-select: none;
            line-height: @s;
            text-align: center;
            font-size: 12px;
            color: transparent;
            position: relative;
            z-index: 1;
            &.checkbox{
                background-color: #009FF5;
                color:#ffffff;
                transition: @transition;
            }
            &.uncheckbox{
                background-color: tint(#d8d8d8,90%);
                color: transparent;
                transition: @transition;
            }
        }
        .tree_header{
            line-height: 50px;
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
        span{
            &.quantity{
                color: #999999;
                margin-left: @unit10;
            }
            &.icon{
                color: @themeColor;
                font-size: 18px;
                margin-right: @unit10;
            }
            &.close{
                float: right;
                margin-right: @unit15;
                color: #666666;
                display: none;
                &:hover{
                    color: @themeColor;
                }
            }
        }
        .TransferTestTitle{
            line-height: 30px;
            height: 30px;
            overflow: hidden;
            font-size: 16px;
        }
    }
</style>