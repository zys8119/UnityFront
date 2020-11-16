<template>
    <div class="HorizontalTreeList">
        <div class="HorizontalTree add" v-if="type === 'add'">
            <div class="HorizontalTreeItem header">
                <slot name="header" :childType="childType">
                    <div v-if="childType || level > 0" @click="$emit('add','child_directory', parent)">
                        <slot name="header-label" :level="level"><i class="el-icon-plus"></i>新增{{level | levelStr}}级菜单</slot>
                    </div>
                    <div v-else @click="$emit('add','directory', parent)">
                        <slot name="header-label" :level="level"><i class="el-icon-plus"></i>新增目录</slot>
                    </div>
                </slot>
            </div>
            <div class="HorizontalTreeItem header" v-if="showBtn && childType && level > 1">
                <slot name="header-child">
                    <div @click="$emit('add','btn', parent)">
                        <slot name="header-label" :level="level"><i class="el-icon-plus"></i>新增按钮</slot>
                    </div>
                </slot>
            </div>
            <div class="HorizontalTreeItem" :class="{check:check(item)}" v-for="(item,key) in options" :key="key">
                <span class="HorizontalTreeItem-label" @click="TreeItemClick(item,key)">
                    <slot :node="item" :type="type">
                        {{item[labelKeyName]}}
                        <span v-if="item['description']">({{item['description']}})</span>
                        <el-dropdown trigger="click" class="HorizontalTree-el-dropdown">
                            <span class="el-dropdown-link" @click.stop="stop">
                              <i class="el-icon-more"
                                 style="color: #C2C6CC;margin-left: 8px"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
								<el-dropdown-item
                    @click.native="$emit('more','btn', item, level)">按钮管理</el-dropdown-item>
								<el-dropdown-item
                    @click.native="$emit('more','modify', item, level)">修改</el-dropdown-item>
								<el-dropdown-item
                    @click.native="$emit('more','delete', item, level)">删除</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </slot>
                </span>
                <i class="el-icon-arrow-right" v-if="item[childKeyName] && item[childKeyName].length > 0"
                   @click="TreeItemClick(item,key)"></i>
            </div>
        </div>
        <div class="HorizontalTree" v-if="!childType && type !== 'add'">
            <div class="HorizontalTreeItem header" v-if="showCheckbox">
                <slot name="header" :childType="childType">
                    <el-checkbox class="el-checkbox" :indeterminate="isIndeterminate" v-model="checkedAll"
                                 @input="checkboxInputAll"></el-checkbox>
                    <span class="HorizontalTreeItem-label">
                        <slot name="header-label" :level="level">全选</slot>
                    </span>
                </slot>
            </div>
            <div class="HorizontalTreeItem" :class="{check:check(item)}" v-for="(item,key) in options" :key="key">
                <el-checkbox v-if="showCheckbox" class="el-checkbox" :indeterminate="indeterminateItem(item)"
                             :value="checkboxItem(checkbox.indexOf(item[valueKeyName]) > -1,item[valueKeyName])"
                             @input="checkboxInput($event,item[valueKeyName],null,item)"></el-checkbox>
                <span class="HorizontalTreeItem-label" @click="TreeItemClick(item,key)">
                    <slot :node="item" :type="type">
                        {{item[labelKeyName]}}
                        <span v-if="item['description']">({{item['description']}})</span>
                        <el-dropdown trigger="click" class="HorizontalTree-el-dropdown">
                            <span class="el-dropdown-link" @click.stop="stop">
                                <i class="el-icon-more" style="color: #C2C6CC;margin-left: 8px"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                              <el-dropdown-item @click.native="$emit('more','btn', item, level)">按钮管理</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </slot>
				</span>
                <i class="el-icon-arrow-right" v-if="item[childKeyName] && item[childKeyName].length > 0"
                   @click="TreeItemClick(item,key)"></i>
            </div>
        </div>
        <horizontal-tree
            v-if="!childType && list"
            :options="list"
            :childKeyName="childKeyName"
            :expand="currentExpand"
            :expandCopy="currentExpandCopy"
            :level="level+1"
            :showCheckbox="showCheckbox"
            :isTop="false"
            :isExpandDefault="isExpandDefault"
            :valueKeyName="valueKeyName"
            :checks="checkbox"
            :parent="options[checkId]"
            :type="type"
            :showBtn="showBtn"
            @on-currentIsExpandDefault="onCurrentIsExpandDefault"
            @add="emitAdd"
            @more="emitMore"
        >
            <template slot="header" slot-scope="{childType}">
                <slot name="header" :childType="childType"></slot>
            </template>
            <template slot="header-child">
                <slot name="header-child"></slot>
            </template>
            <template slot="header-label" slot-scope="{level}">
                <slot name="header-label" :level="level"></slot>
            </template>
            <template slot-scope="{node, type}">
                <slot :node="node" :type="type"></slot>
            </template>
        </horizontal-tree>
        <horizontal-tree
            v-if="!childType && !list"
            :parent="options[checkId]"
            :type="type"
            :showBtn="showBtn"
            :level="level+1"
            :showCheckbox="showCheckbox"
            childType
            @add="emitAdd"
        >
            <template slot="header" slot-scope="{childType}">
                <slot name="header" :childType="childType"></slot>
            </template>
            <template slot="header-child">
                <slot name="header-child"></slot>
            </template>
            <template slot="header-label" slot-scope="{level}">
                <slot name="header-label" :level="level"></slot>
            </template>
        </horizontal-tree>
    </div>
</template>

<script>
/**
 * @横向递归树组件
 *
 * # slot
 *      | 卡槽名称      | 说明        | 卡槽数据      |
 *      | ===========  | ==========  | ===========  |
 *      | 默认卡槽      | 主体内容卡槽 | {node, type} |
 *      | header       | 头部卡槽     | {childType}  |
 *      | header-child | 头部子卡槽   | --           |
 */
import $utils from "@/utils"
export default {
    name: "horizontal-tree",
    props: {
        // 数据
        options: {
            type: Array,
            default: Array
        },
        // value 相关字段
        valueKeyName: {
            type: String,
            default: "id"
        },
        // lable 相关字段
        labelKeyName: {
            type: String,
            default: "name"
        },
        // child 相关字段
        childKeyName: {
            type: String,
            default: "children"
        },
        // 是否展开默认菜单
        isExpandDefault: {
            type: Boolean,
            default: false,
        },
        // 默认展开的菜单数据，默认展开第一层数据
        expand: {
            type: Array,
            default: Array
        },
        // 拷贝默认展开的菜单数据
        expandCopy: {
            type: Array,
            default: Array
        },
        // 菜单级别
        level: {
            type: Number,
            default: 0,
        },
        // 是否是顶级菜单
        isTop: {
            type: Boolean,
            default: true,
        },
        // 默认选中的数据
        checks: {
            type: Array,
            default: Array
        },
        // 是否启用复选功能，只有当type != 'add' 时才生效
        showCheckbox: {
            type: Boolean,
            default: true
        },
        // 当前tree的父节点
        parent: {
            type: Object,
            default: undefined
        },
        // 组件类型，默认带复选，其他目前只支持 type = 'add'
        type: {
            type: String,
            default: null
        },
        // 当前tree的孩子节点类型
        childType: {
            type: Boolean,
            default: false
        },
        // 是否显示头部新增按钮
        showBtn: {
            type: Boolean,
            default: false
        }
    },
    filters: {
        levelStr(val) {
            return $utils.number_chinese(val);
        }
    },
    computed: {
        // 计算当前的列表数据
        // eslint-disable-next-line vue/return-in-computed-property
        list() {
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            this.currentCheckbox = [];
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            this.isIndeterminate = false;
            let findObj = this.options[this.checkId];
            if (findObj && findObj[this.childKeyName] && findObj[this.childKeyName].length) {
                if (this.currentIsExpandDefault && this.currentExpand[this.level] !== null) {
                    this.TreeItemClick(findObj, 0, this.currentIsExpandDefault);
                }
                return findObj[this.childKeyName];
            }
        }
    },
    data() {
        return {
            checkedAll: false, // 是否全选
            checkId: 0, // 选中的索引
            currentExpand: [], // 当前展开数据
            currentExpandCopy: [], // 拷贝当前展开数据
            checkbox: [], // 所有选中数据
            currentCheckbox: [], // 当前组件选中数据
            currentIsExpandDefault: false, // 当前是否展开默认
            isIndeterminate: false, // 是否为部分选择
        }
    },
    watch: {
        // 监听咱开
        expand() {
            this.initExpand();
        },
        // 监听拷贝组件
        expandCopy() {
            this.initExpandCopy();
        },
        // 监听默认选择数据
        checks() {
            this.initChecks();
        },
        // 监听所有选择数据
        checkbox(value) {
            this.$emit('check', value);
        },
        // 监听当前选择数据
        currentCheckbox(val) {
            this.initCheckedAll(val);
        },
        // 监听当前列表数据
        list() {
            this.initCheckedAll(this.currentCheckbox);
        }
    },
    mounted() {
        this.initExpand();
        this.initExpandCopy();
        this.initChecks();
        this.initCheckedAll(this.currentCheckbox);
    },
    methods: {
        /**
         * 禁止冒泡
         * */
        stop() {
        },
        /**
         * 暴露 emit-add
         * @param type add类型（directory、child_directory、btn）
         * @param item add父节点数据
         */
        emitAdd(type, item) {
            this.$emit('add', type, item)
        },
        /**
         * 暴露 emit-more
         * @param type 更多操作类型，（modify、delete）
         * @param item 操作的当前节点数据
         * @param level 级别
         */
        emitMore(type, item, level) {
            this.$emit('more', type, item, level)
        },
        /**
         * 获取当前节点的所有子集
         * @param item 当前节点
         * @param result 集合迭代
         * @returns {*|*[]} 返回集合
         */
        getChild(item, result) {
            result = result || [];
            if (item[this.childKeyName] && item[this.childKeyName].length > 0) {
                item[this.childKeyName].forEach(e => {
                    result.push(e[this.valueKeyName]);
                    this.getChild(e, result);
                })
            }
            return result;
        },
        /**
         * 计算节点是否部分选中
         * @param item 节点
         * @returns {boolean}
         */
        indeterminateItem(item) {
            let resultBool = false;
            if (this.checkbox.indexOf(item[this.valueKeyName]) === -1) {
                this.getChild(item).forEach(e => {
                    if (this.checkbox.indexOf(e) > -1) {
                        resultBool = true;
                    }
                });
            }
            return resultBool;
        },
        /**
         * 全选
         * @param val
         */
        checkboxInputAll(val) {
            this.options.forEach(item => {
                this.checkboxInput(val, item[this.valueKeyName], null, item);
            });
        },
        /**
         * 权限初始化
         * @param val
         */
        initCheckedAll(val) {
            this.checkedAll = false;
            let itemArr = [];
            this.options.forEach(item => {
                try {
                    if (val.some(e => e === item[this.valueKeyName])) {
                        itemArr.push(item)
                    }
                } catch (e) {
                    //err
                }
            });
            if (itemArr.length === this.options.length) {
                this.checkedAll = true;
            } else {
                this.checkedAll = false;
            }
            if (!this.checkedAll && val && val.length > 0) {
                this.isIndeterminate = true;
            } else {
                this.isIndeterminate = false;
            }
        },
        /**
         * 复选
         * @param val 复选值
         * @param id 节点id
         * @returns {*}
         */
        checkboxItem(val, id) {
            this.checkboxInput(val, id, "currentCheckbox");
            return val;
        },
        /**
         * 初始化默认选择
         */
        initChecks() {
            this.checkbox = this.checks;
        },
        /**
         * 节点复选操作
         * @param val 复选值
         * @param id 节点id
         * @param field 更改的字段
         * @param item
         */
        checkboxInput(val, id, field) {
            field = field || "checkbox";
            let index = this[field].indexOf(id);
            let existId = this.options.some(e => e[this.valueKeyName] === id);
            if (existId && val && index === -1) {
                this[field].push(id);
            }
            if (existId && !val && index !== -1) {
                this[field].splice(index, 1);
            }
        },
        /**
         *监听暴露点击处理
         * @param val
         */
        onCurrentIsExpandDefault(val) {
            this.currentIsExpandDefault = val;
        },
        /**
         * 拷贝初始化展开数据
         */
        initExpandCopy() {
            this.currentExpandCopy = this.expandCopy;
            if (this.isTop) {
                this.currentExpandCopy = JSON.parse(JSON.stringify(this.expand));
            }
            if (this.currentExpandCopy.length === 0) {
                this.currentIsExpandDefault = true;
            } else {
                this.currentIsExpandDefault = false;
            }
        },
        /**
         * 初始化展开
         */
        initExpand() {
            this.currentExpand = this.expand;
            if (this.currentExpand[this.level]) {
                let checkId = this.options.findIndex(e => e[this.valueKeyName] === this.currentExpand[this.level]);
                if (checkId) this.checkId = checkId;
            }
        },
        /**
         * 计算节点是否被check的class
         * @param item 节点数据
         * @returns {boolean}
         */
        check(item) {
            let result = this.currentExpand.indexOf(item[this.valueKeyName]) > -1;
            return result;
        },
        /**
         * 树节点的点击事件
         * @param item 当前节点
         * @param key 节点索引
         * @param bool 当前是否默认展开
         * @constructor
         */
        TreeItemClick(item, key, bool) {
            if (!bool) {
                this.currentIsExpandDefault = false;
            }
            this.checkId = key;
            this.$emit('on-currentIsExpandDefault', this.currentIsExpandDefault);
            if (this.currentExpand[this.level] !== item[this.valueKeyName]) {
                this.currentExpand.forEach((e, i) => {
                    if (i > this.level) {
                        this.$set(this.currentExpand, i, null);
                    }
                });
                this.$set(this.currentExpand, this.level, item[this.valueKeyName]);
            }
        }
    },
}
</script>

<style lang="less">
.HorizontalTreeList {
    overflow: hidden;

    .HorizontalTree {
        border-right: 1px solid #EEEEEE;
        min-height: 100%;
        min-width: 274px;
        float: left;

        .HorizontalTreeItem {
            overflow: hidden;
            @h: 46px;
            line-height: @h;
            padding: 0 18px;
            position: relative;
            cursor: pointer;

            .el-checkbox {
                float: left;
                margin: 0 !important;
                margin-right: 15px !important;
            }

            .el-icon-arrow-right {
                position: absolute;
                top: 0;
                right: 0;
                height: @h;
                line-height: @h;
                color: #C2C6CC;
                padding-right: 18px;
            }

            .HorizontalTreeItem-label {
                float: left;
                color: #262A30;
                font-size: 14px;
                min-width: 274px - 18px*2 - 30px;
            }

            .HorizontalTree-el-dropdown {
                display: none;
            }

            &:hover {
                background-color: #F6F6F6;

                .HorizontalTree-el-dropdown {
                    display: inline-block;
                }
            }

            &.header {
                border-bottom: 1px solid #EEEEEE;

                .HorizontalTreeItem-label {
                    color: #232A32;
                }

                &:hover {
                    background-color: transparent;
                }
            }

            &.check {
                .HorizontalTreeItem-label {
                    color: @themeColor;
                    font-weight: bold;
                }
            }
        }

        &.add {
            .HorizontalTreeItem {
                &.header {
                    color: @themeColor;
                }
            }
        }
    }
}
</style>