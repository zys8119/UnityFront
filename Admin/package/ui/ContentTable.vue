<template>
    <div class="ContentTable" ref="contentTable_el_table">
        <slot name="table" :data="ContentTableData">
            <div class="ContentTableHeader" v-if="(pagePosition == 'top' && !_currentPagination.noPage) || displayColumnShow">
                <el-pagination  class="el-pagination top" v-if="pagePosition == 'top' && !_currentPagination.noPage"
                                @size-change="_ContentTable_pagination_currentPaginationChange"
                                @current-change="_ContentTable_pagination_currentPaginationChange"
                                :current-page.sync="currentPagination_pageNo"
                                :page-sizes="[_currentPagination.pageSize]"
                                :page-size="_currentPagination.pageSize"
                                :layout="_currentPagination.layout"
                                :total="currentPaginationTotal">
                </el-pagination>
                <el-dropdown class="displayColumn" v-if="displayColumnShow">
                    <div>
                        <span class="iconfont icon1">&#xe652;</span>
                        <span>显示列</span>
                        <span class="iconfont icon2">&#xe611;</span>
                    </div>
                    <el-dropdown-menu slot="dropdown" class="displayColumnCheckboxGroup">
                        <el-checkbox-group v-model="columnFilter">
                            <el-checkbox class="el-checkbox" :label="item.label" v-for="(item,key) in displayColumn" :key="key+'cf'"></el-checkbox>
                        </el-checkbox-group>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
            <el-table
                ref="table"
                class="ContentTableObj"
                :data="ContentTableData"
                :height="config.height"
                :max-height="config.maxHeight"
                :stripe="typeof config.border == 'boolean' ? config.stripe : true"
                :border="typeof config.border == 'boolean' ? config.border : true"
                :size="config.size"
                :fit="config.fit"
                :show-header="config.showHeader"
                :highlight-current-row="config.highlightCurrentRow"
                :current-row-key="config.currentRowKey"
                :row-class-name="config.rowClassName"
                :row-style="config.rowStyle"
                :cell-class-name="config.cellClassName"
                :cell-style="config.cellStyle"
                :header-row-class-name="config.headerRowClassName"
                :header-row-style="config.headerRowStyle"
                :header-cell-style="config.headerCellStyle"
                :row-key="config.rowKey"
                :empty-text="config.emptyText"
                :default-expand-all="config.defaultExpandAll"
                :expand-row-keys="config.expandRowKeys"
                :default-sort="config.defaultSort"
                :tooltip-effect="config.tooltipEffect"
                :show-summary="config.showSummary"
                :sum-text="config.sumText"
                :summary-method="config.summaryMethod"
                :span-method="config.spanMethod"
                :select-on-indeterminate="config.selectOnIndeterminate"
                :indent="config.indent"
                :lazy="config.lazy"
                :load="config.load"
                :tree-props="config.treeProps"
                @select="(...args)=>$emit('select',args[0], args[1])"
                @select-all="(...args)=>$emit('select-all',args[0])"
                @selection-change="(...args)=>(selectedList = args[0],$emit('selection-change',args[0]))"
                @sort-change="(...args)=>$emit('sort-change',args[0])"
                @filter-change="(...args)=>$emit('filter-change',args[0])"
                @cell-mouse-enter="(...args)=>$emit('cell-mouse-enter',args[0],args[1],args[2],args[3])"
                @cell-mouse-leave="(...args)=>$emit('cell-mouse-leave',args[0],args[1],args[2],args[3])"
                @header-dragend="(...args)=>$emit('header-dragend',args[0],args[1],args[2],args[3])"
                @cell-click="(...args)=>$emit('cell-click',args[0],args[1],args[2],args[3])"
                @cell-dblclick="(...args)=>$emit('cell-dblclick',args[0],args[1],args[2],args[3])"
                @row-click="(...args)=>$emit('row-click',args[0],args[1],args[2])"
                @row-contextmenu="(...args)=>$emit('row-contextmenu',args[0],args[1],args[2])"
                @row-dblclick="(...args)=>$emit('row-dblclick',args[0],args[1],args[2])"
                @header-click="(...args)=>$emit('header-click',args[0],args[1],args[2])"
                @header-contextmenu="(...args)=>$emit('header-contextmenu',args[0],args[1],args[2])"
                @current-change="(...args)=>$emit('current-change',args[0],args[1])"
                @expand-change="(...args)=>$emit('expand-change',args[0],args[1])"
            >
                <template v-for="(item,key) in currentColumns">
                    <ContentTableItem :item="item" :key="key">
                        <template slot-scope="{item}">
                            <!--复选框-->
                            <el-table-column
                                align="center"
                                v-if="item.type === 'selection'"
                                :width="item.width || 60"
                                :key="key"
                                :selectable="item.selectable"
                                type="selection"></el-table-column>
                            <!--序号-->
                            <el-table-column
                                v-else-if="item.type === 'number'"
                                :key="key"
                                :width="item.width || 60"
                                :align="item.align || 'center'"
                                :label="item.label">
                                <template slot-scope="{$index}">{{$index+1}}</template>
                            </el-table-column>
                            <!--操作-->
                            <el-table-column
                                class-name="operate"
                                v-else-if="item.type === 'operate'"
                                :key="key"
                                :width="item.width"
                                :align="item.align || 'center'"
                                :label="item.label">
                                <template v-if="item.btns" slot-scope="scope">
                                    <slot name="operate" :scope="scope" :column="item" :row="scope.row">
                                        <el-dropdown class="el-dropdown" v-if="item.dropdown">
                                            <span class="el-dropdown-link iconfont">&#xe6d2;</span>
                                            <el-dropdown-menu slot="dropdown" class="filterContent-el-dropdown">
                                                <el-dropdown-item v-for="(btnItem,key) in item.btns" :key="key" @click.native="$emit(btnItem.emit,btnItem,scope.row)">
                                                    <span :class="`ZColor ${btnItem.className}`">{{btnItem.name}}</span>
                                                </el-dropdown-item>
                                            </el-dropdown-menu>
                                        </el-dropdown>
                                        <template v-else>
                                            <z-button @click="(btnItem.emit)? $emit($event.emit,$event,scope.row):fn" :class="`${btnItem.className}`" v-if="typeof btnItem.show === 'function'? btnItem.show(btnItem,scope.row,item):()=>{}"
                                                      v-for="(btnItem,key) in item.btns" :config="btnItem" :key="key + 'operate'"></z-button>
                                        </template>
                                    </slot>
                                </template>
                            </el-table-column>
                            <!--文字样式-->
                            <el-table-column
                                class-name="textType"
                                v-else-if="item.type === 'textType'"
                                :key="key"
                                :width="item.width"
                                :align="item.align || 'center'"
                                :label="item.label">
                                <template slot-scope="scope">
                                    <slot name="textType" :scope="scope" :column="item" :row="scope.row">
                                <span :class="`${(item.textType)?item.textType:''} ${(item.textTypeStyle)?item.textTypeStyle(scope.row):''} ${item.ellipsis1?'ellipsis-1':''} ${item.ellipsis2?'ellipsis-2':''} ${item.ellipsis3?'ellipsis-3':''}`"
                                      @click="(item.emit)? $emit(item.emit,scope.row):fn">{{(item.filterLabel? item.filterLabel(scope.row,item) :  $utils.lodash.get(scope.row,item.prop)) | filter(scope.row,item,_self)}}</span>
                                    </slot>
                                </template>
                            </el-table-column>
                            <!--快捷编辑-->
                            <el-table-column
                                class-name="edit"
                                v-else-if="item.type === 'edit'"
                                :key="key"
                                :width="item.width"
                                :align="item.align || 'center'"
                                :label="item.label">
                                <template slot-scope="scope">
                                    <slot name="rowEdit" :scope="scope" :column="item">
                                        <el-popover
                                            placement="bottom"
                                            :title="`【${item.label}】快捷修改`"
                                            popper-class="contentTable-el-popover"
                                            trigger="click" v-model="scope.row['contentTable-el-popover' + item.prop]">
                                            <span slot="reference" :class="`${item.textType}`" @click="popoverClick(item,scope.row)">{{scope.row[item.prop] | filter(scope.row,item,_self)}} <i class="el-icon-edit-outline"></i></span>
                                            <i class="el-icon-close" @click="scope.row['contentTable-el-popover' + item.prop] = !scope.row['contentTable-el-popover' + item.prop]"></i>
                                            <el-input placeholder="请输入关键字" v-model="popoverValue"
                                                      @change="(item.emit)?$emit(item.emit,popoverValue,scope.row):fn"></el-input>
                                            <z-button :config="{name:(item.applyText || '应用')}"
                                                      @click="(item.emit)?$emit(item.emit,popoverValue,scope.row):fn"></z-button>
                                        </el-popover>
                                    </slot>
                                </template>
                            </el-table-column>
                            <!--弹出框-->
                            <el-table-column
                                class-name="textType"
                                v-else-if="item.type === 'popover'"
                                :key="key"
                                :width="item.width"
                                :align="item.align || 'center'"
                                :label="item.label">
                                <template slot-scope="scope">
                                    <el-popover
                                        @show="$emit('popover-show', item, scope.row)"
                                        :placement="item.popover_placement || 'top'"
                                        :title="item.popover_title"
                                        popper-class="contentTable-el-popover"
                                        :trigger="item.popover_trigger || 'hover'">
                                        <slot name="popover" :row="scope.row" :column="item"></slot>
                                        <span  slot="reference"
                                               :class="`${item.textType}`"
                                               @click="(item.emit)?$emit(item.emit):()=>{}">
                                    <slot name="popoverText"  :row="scope.row" :column="item">
                                        {{$utils.lodash.get(scope.row,item.prop) | filter(scope.row,item,_self) }}
                                    </slot>
                                </span>
                                    </el-popover>
                                </template>
                            </el-table-column>
                            <!--选择下拉-->
                            <el-table-column
                                class-name="select"
                                v-else-if="item.type === 'select'"
                                :key="key"
                                :width="item.width"
                                :align="item.align || 'center'"
                                :label="item.label">
                                <template slot-scope="scope">
                                    <slot name="select" :scope="scope" :column="item">
                                        <el-select v-model="scope.row[item.prop]" @change="(item.emit)?$emit(item.emit,$event,scope.row):fn" placeholder="请选择">
                                            <el-option
                                                v-for="item in (item.selectData||[])"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </slot>
                                </template>
                            </el-table-column>
                            <!--切换开关-->
                            <el-table-column
                                class-name="switch"
                                v-else-if="item.type === 'switch'"
                                :key="key"
                                :width="item.width"
                                :align="item.align || 'center'"
                                :label="item.label">
                                <template slot-scope="scope" :column="item">
                                    <slot name="switch" :scope="scope" :row="scope.row">
                                        <el-switch v-model="scope.row[item.prop]" @change="(item.emit)?$emit(item.emit,$event,scope.row):fn"></el-switch>
                                    </slot>
                                </template>
                            </el-table-column>
                            <el-table-column v-else
                                             :key="key"
                                             :type="item.type"
                                             :index="item.index"
                                             :column-key="item.columnKey"
                                             :label="item.label"
                                             :prop="item.prop"
                                             :width="item.width"
                                             :min-width="item.minWidth"
                                             :fixed="item.fixed"
                                             :render-header="item.renderHeader"
                                             :sortable="item.sortable"
                                             :sortMethod="item.sortMethod"
                                             :sort-by="item.sortBy"
                                             :sort-orders="item.sortOrders"
                                             :resizable="item.resizable"
                                             :formatter="item.formatter"
                                             :show-overflow-tooltip="item.showOverflowTooltip"
                                             :align="item.align || 'center'"
                                             :header-align="item.headerAlign"
                                             :class-name="item.className"
                                             :label-class-name="item.labelClassName"
                                             :selectable="item.selectable"
                                             :reserveSelection="item.reserveSelection"
                                             :filters="item.filters"
                                             :filter-placement="item.filterPlacement"
                                             :filter-multiple="item.filterMultiple"
                                             :filter-method="item.filterMethod"
                                             :filtered-value="item.filteredValue"
                            >
                                <template slot="header" slot-scope="scope">
                                    <slot :scope="scope" name="header"  v-if="$slots.header" :column="item"></slot>
                                    <template v-else >{{scope.column.label}}</template>
                                </template>
                                <template slot-scope="scope">
                                    <slot :scope="scope" :column="item" :row="scope.row">
                                        <el-tooltip v-if="item.type === 'tooltip'"
                                                    :effect="item.tooltip_effect"
                                                    :placement="item.tooltip_placement || 'top'"
                                        >

                                            <template slot="content">
                                                <slot name="tooltip" :scope="scope" :row="scope.row" :$index="scope.$index">{{$utils.lodash.get(scope.row,item.prop) | filter(scope.row,item,_self)}}</slot>
                                            </template>
                                            <span style="cursor: pointer" :class="`${item.ellipsis1 ? 'ellipsis-1' : ''} ${item.ellipsis2 ? 'ellipsis-2' : ''} ${item.ellipsis3 ? 'ellipsis-3' : ''} ${item.className}`" @click="(item.emit)?$emit(item.emit,scope.row):()=>{}">
                                        {{$utils.lodash.get(scope.row,item.prop) | filter(scope.row,item,_self) }}
                                    </span>
                                        </el-tooltip>
                                        <template v-else-if="item.type === 'customize'"><slot name="customize" :scope="scope" :row="scope.row" :$index="scope.$index"  :column="item">
                                    <span :class="{
                                        'ellipsis-1':item.ellipsis1,
                                        'ellipsis-2':item.ellipsis2,
                                        'ellipsis-3':item.ellipsis3,
                                }" @click="(item.emit)?$emit(item.emit,scope.row):()=>{}">
                                    {{$utils.lodash.get(scope.row,item.prop) | filter(scope.row,item,_self) }}
                                </span>
                                        </slot></template>
                                        <span v-else :class="{
                                        'ellipsis-1':item.ellipsis1,
                                        'ellipsis-2':item.ellipsis2,
                                        'ellipsis-3':item.ellipsis3,
                                }" @click="(item.emit)?$emit(item.emit,scope.row):()=>{}">
                                    {{$utils.lodash.get(scope.row,item.prop) | filter(scope.row,item,_self) }}
                                </span>
                                    </slot>
                                </template>
                            </el-table-column>
                        </template>
                    </ContentTableItem>
                </template>
                <template slot="empty">
                    <slot name="empty"></slot>
                </template>
                <template slot="append">
                    <slot name="append"></slot>
                </template>
            </el-table>
        </slot>
        <el-pagination  class="el-pagination bottom" v-if="pagePosition == 'bottom' && !_currentPagination.noPage"
                        @size-change="_ContentTable_pagination_currentPaginationChange"
                        @current-change="_ContentTable_pagination_currentPaginationChange"
                        :current-page.sync="currentPagination_pageNo"
                        :page-sizes="[_currentPagination.pageSize]"
                        :page-size="_currentPagination.pageSize"
                        :layout="_currentPagination.layout"
                        :total="currentPaginationTotal">
        </el-pagination>
        <el-popover v-if="showCount && isTypeSelection"
                    placement="top"
                    trigger="click">
            <slot name="reference" :data="selectedList">
                <el-button size="medium" type="success" icon="el-icon-close" @click="$emit('deleteSelectedList',selectedList)">删除所选记录</el-button>
            </slot>
            <el-button slot="reference" size="medium" type="success" class="contentTable-popover-reference">
                选中了 {{ContentTableData.length}} 个中的 {{selectedList.length}} 个
                <i class="el-icon-caret-top"></i>
            </el-button>
        </el-popover>
    </div>
</template>

<script>
import ZButton from "./ZButton";
import filters from "../../src/filters";
export default {
    name: "ContentTable",
    components: {ZButton},
    props:{
        config:{
            type:Object,
            default:Object
        },
        data:{
            type:Array,
            default:null
        },
        columns:{
            type:Array,
            default:Array
        },
        pageConfig:{
            type:Object,
            default:Object
        },
        params:{
            type:Object,
            default:null
        },
        url:{
            type:String,
            default:null
        },
        apiPath:{
            type:[String,Function],
            default:null
        },
        pagePosition:{
            type:String,
            default:"bottom"
        },
        showCount:{
            type:Boolean,
            default:true
        },
        displayColumnShow:{
            type:Boolean,
            default:false
        },
    },
    data(){
        return {
            popoverValue:null,
            selectValue:null,
            selectedList:[],
            columnFilter:[],
            currentColumns:[],
        }
    },
    created() {
        this.$emit("on-updated",this,"created");
    },
    mounted() {
        this.currentColumnsInit();
        this.$emit("on-updated",this,"mounted");
    },
    updated() {
        this.$emit("on-updated",this,"updated");
    },
    computed:{
        // 判断是否为复选框类型
        isTypeSelection(){
            try {
                return this.columns.filter(e=>e.type === 'selection').length > 0;
            }catch (e) {
                return  false
            }
        },
        // 显示列
        displayColumn(){
            return this.columns.filter(e=>e.label);
        }
    },
    filters:{
        filter:function(value,row,item,_self){
            if(item.filter){
                let filter = null;
                try {filter = filter || _self.$parent.$parent.$parent.$parent.$parent.$parent.$options.filters[item.filter]}catch (e) {/*err*/}
                try {filter = filter || _self.$parent.$parent.$parent.$parent.$parent.$options.filters[item.filter]}catch (e) {/*err*/}
                try {filter = filter || _self.$parent.$parent.$parent.$parent.$options.filters[item.filter]}catch (e) {/*err*/}
                try {filter = filter || _self.$parent.$parent.$parent.$options.filters[item.filter]}catch (e) {/*err*/}
                try {filter = filter || _self.$parent.$parent.$options.filters[item.filter]}catch (e) {/*err*/}
                try {filter = filter || _self.$parent.$options.filters[item.filter]}catch (e) {/*err*/}
                if(filter){
                    return  filter(value,row,item)
                }
                try {
                    return filters[item.filter](value,row,item);
                }catch (e) {
                    console.error(`Failed to resolve filter: ${item.filter}`)
                }
            }
            return value;
        }
    },
    methods:{
        fn(){},
        popoverClick(columns,row){
            if(columns.applyValue){
                this.popoverValue = row[columns.prop];
                return;
            }
            this.popoverValue = null;
        },
        // 当前栏目计算
        currentColumnsInit(){
            this.columnFilter = this.columns.filter(e=>e.label).map(e=>e.label);
            this.currentColumns = this.columns;
        }
    },
    watch:{
        columnFilter(){
            this.currentColumns = this.columns.filter(e=>!e.label || this.columnFilter.indexOf(e.label) > -1);
        },
        columns(){
            this.currentColumnsInit();
        }
    }
}
</script>

<style lang="less">
@import "../../src/assets/less/publicFun";
.ContentTable{
    .ContentTableObj{
        .operate{
            .ZButton{
                &.el-button--text{
                    &:hover{
                        text-decoration: underline;
                    }
                    .colorInit();
                }
            }
            .el-dropdown{
                .el-dropdown-link{
                    &.iconfont{
                        font-size: 25px;
                        cursor: pointer;
                        &:hover{
                            color: #000000;
                        }
                    }
                }
            }
        }
        .textType{
            span{
                @color:#409eff;
                &.link{
                    &:hover{
                        text-decoration: underline;
                    }
                    cursor: pointer;
                    color: @color;
                }
                .colorInit();
            }
        }
        .edit{
            cursor: pointer;
            .noneSelect();
            &:hover{
                color: #409eff;
            }
        }
        .el-table__header{
            tr{
                th{
                    background-color: #F7F9FD;
                    color: #555555;
                    font-size: 15px;
                }
            }
        }
    }
    .el-pagination{
        &.top{
            margin-bottom:0;
        }
        &.bottom{
            text-align: right;
            margin-top: @unit15;
        }
    }
    .contentTable-popover-reference{
        position: fixed;
        right: @unit15;
        bottom: @unit15;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
        z-index: 1;
    }
    .ContentTableHeader{
        margin-bottom: @unit15;
        overflow: hidden;
        .el-pagination{
            display: inline-block;
        }
        .displayColumn{
            float: right;
            background-color: #0aaf38;
            color: #ffffff;
            @s:32px;
            line-height: @s;
            height: @s;
            padding: 0 @unit15;
            cursor: pointer;
            outline: medium;
            &:hover{
                background-color: #0aaf38*0.9;
            }
            *{
                outline: medium;
            }
            span{
                line-height: @s;
                height: @s;
                display: inline-block;
                overflow: hidden;
                &.iconfont{
                    font-size: 18px;
                    &.icon1{
                        margin-right: @unit10;
                    }
                    &.icon2{
                        font-size: 14px;
                    }
                }
            }
        }
    }
}
</style>
