import {ElButton} from "element-ui/types/button";
import {ElTableColumn} from "element-ui/types/table-column";
import {ElTable} from "element-ui/types/table";
import {ElUpload} from "element-ui/types/upload";
import {Vue} from "vue/types/vue";

export type ComponentsInterfaceType =  {[key:string]:any};
export type ComponentsInterface$emit = { [key:string]:(...args:any[])=>any; };
export type ComponentsInterface$slots = {
    default?(...args:any[]):Element|any;
    [key:string]:(...args:any[])=>Element|any;
};
export type ComponentsInterfaceMethods = {[key:string]:(...args:any[])=>any}
export interface CI<
    props = ComponentsInterfaceType,
    $emit=ComponentsInterface$emit,
    $slots=ComponentsInterface$slots,
    methods=ComponentsInterfaceMethods> {
    // 属性参数
    props:props;
    // 监听事件
    $emit:$emit;
    // 卡槽
    $slots:$slots;
    // 方法
    methods?:methods;
    // [key:string]:any;
}

//todo 【HomeCard.vue】 ==========首页卡片组件
export interface HomeCard extends CI{
    props:{
        title?:string; // 标题
        tooltip?:string|boolean; // 提示文字
        icon?:string|boolean; // 图标
        height?:string|boolean; // 高度
    };
    $emit:{
        export?():void;// 导出
    };
    $slots:{
        default?():Element;
        'header-right'?():Element;
    }
}

//todo 【Tree.vue】 ==========底层树组件
export interface Tree extends CI{
    props:{
        options?:object[]; // 树结构数据
        isTop?:string | true; // 是否为顶级组件
        indent?:number | 20; // 缩进单位
        indentIndex?:number | 0; // 缩进级别
        showNameField?:string | 'name'; // 指定显示字段
        childrenField?:string | 'children'; // 指定显示字段
        keyMap?:string | null; // 节点路径
        nodeHeight?:number | 50; // 节点高度
        parentNode?:object; // 父级节点
        atf?:string | 'ease'; // 动画曲线
        attime?:string | 300; // 动画时间
        checked?:string; // 选中key
        level?:number | 0; // 级别
        searchShow?:boolean | false; // 搜索显示搜索
        search?:string; // 搜索迭代内容
        searchChange?():boolean; // 搜索回调，返回布尔值，可控制节点的显示隐藏，true显示，false隐藏
        placeholder?:string; // 搜索描述
        isdraggable?:boolean; // 是否启用拖拽排序，默认不启用
        draggableFilter?(self:object):boolean; // 拖拽过滤，可用于具体层级的拖拽启用（开启拖拽排序，才生效）
        self?:object; // 当前树组件
        draggableMove?(evt:object):boolean; // 拖拽移动处理回调，返回true继续拖拽，false禁止拖拽
        lazyLoading?:boolean|false;// 懒加载组件
    },
    $emit:{
        parent(node:TreeNode):void;// 父节点事件
        child(node:TreeNode):void;// 子节点击事件
        node(node:TreeNode):void;// node 点击事件
        checked(keyMap:string):void;// 选中事件
        /**
         * 拖拽事件
         * @param currentOptions 当前拖拽的数据
         * @param level 当前级别
         * @param parentNode 当前父节点
         * @param bool 是否是当前节点
         */
        draggable(currentOptions:object[],level:number,parentNode:object,bool:boolean,$event:object):void;// 拖拽事件
    },
    $slots:{
        default?(data:object,node:TreeNode,self:object):Element;
        header?():Element;
        expand?(vm:object):Element;
    }
}

export interface TreeNode {
    data:object;// 节点原始数据
    key:number;// 节点key
    keyMap:string;// 节点key的map映射
    parent:boolean;// 父节点
    node_parent:boolean;// 是否是父级
    node_child:boolean;// 是都为子节点
    node_top:boolean;// 是否为顶部节点
    node_open:boolean;// 节点是否展开
    level:boolean;// 节点级别
    checked:boolean;// 节点是否选中
}

//todo 【FilterContent.vue】 ==========过滤器布局组件
export interface FilterContent extends CI{
    props:{
        //请参考（ComponentsInterface.ts组件配置---default）
        type?:string;// 类型，
        config?:FilterContentType;// 配置
        value?:any;// input值
        // 布局栅格化
        span?:{
            left:number;
            right:number;
        }
    };
    $emit:{
        input?(val?:any):void;// input数据绑定
        [key:string]:()=>void;
    };
    $slots:{
        default?():Element;
        menu?():Element;
        left?():Element;
        total?():Element;
        leftBefore?():Element;
        leftAfter?():Element;
        right?():Element;
        rightBefore?():Element;
        rightAfter?():Element;
        append?():Element;
    };
}

export interface FilterContentType {
    [key:string]:any;
    input?:boolean;// input是否显示
    placeholder?:string;// input搜索默认提示
    search?:string;// 搜索按钮的$emit方法
    searchText?:string|boolean;// 搜索按钮名称
    reset?:string;// 重置按钮的$emit方法
    resetText?:string|boolean;// 重置按钮名称
    rightBtns?:Array<ZButtonConfig | {
        // 按钮是否可见
        show?(data:object):boolean;
    }>;// 右边按钮集合
}

export type FilterContentConfing = {
    [key:string]:FilterContentType;
}

//todo 【ZButton.vue】 ==========按钮组件

export interface ZButton extends CI{
    props:{
        config?:ZButtonConfig;
    }
};

export type ZButtonConfig = ZButtonType | ElButton;

export type ZButtonType = {
    name?:string; // 按钮文字
    emit?:string; // 按钮$emit方法
    iconfont?:string; // 阿里字体图标
}

//todo 【Echarts.vue】 ==========图表主键

export interface Echarts extends CI{
    props:{
        data?:object;// 图表数据
        type?:string | 'line';// 图表类型，如不需要内置类型，可为customize类型，自定义配置
        options?:object;// 图表初始化选项，将会覆盖对应类型配置
        height?:string|boolean;// 图表初始化选项，将会覆盖对应类型配置
    }
};

//todo 【ContentTable.vue】 ==========表格组件

export interface ContentTable extends CI{
    props:{
        config?:ContentTableConfig;// 表格配置
        data?:object[];// 表格数据
        columns?:ContentTable_Columns[];// 栏目配置
        pageConfig?:ContentTable_pageConfig;// 分页配置
        params?:{[key:string]:any};// 接口数据，当url|apiPath存在时生效
        url?:string;// 表格数据接口地址
        apiPath?:string;// 表格数据接口api路径地址，该参数存在将优先使用，url参数无效
        pagePosition?:string | 'top' | 'buttom';// 分页位置
        showCount?:boolean;// 是否显示个数统计，并且只有当表格栏目类型存在selection时生效
        displayColumnShow?:boolean;// 是否显示过滤表格列，默认不启用
    };
    $emit:{
        // 其他请参考【element-ui】原生表格
        pageChange(pageConfig:ContentTableConfig):void;//分页方法
        dataChange(newData:object[]):void;// 抛出最新的表格数据
        deleteSelectedList(selectedList:object[]):void;// 批量删除方法
        onUpdated(vm:object,tyep:string|'created'|'mounted'|'updated'):void; // 数据更新回调
        popoverShow(column:object, row: object):void;// popover显示回调，当type=popover时生效
    }
    $slots:{
        default?(scope:object,column:object, row: object):Element;
        header?(scope:object,column:object):Element;
        // 无数据卡槽
        empty?():Element;
        //插入至表格最后一行之后的内容，如果需要对表格的内容进行无限滚动操作，可能需要用到这个 slot。若表格有合计行，该 slot 会位于合计行之上。
        append?():Element;
        textType?(scope:object,column:object,row:object):Element;// 文本
        operate?(scope:object,column:object,row:object):Element;// 操作
        rowEdit?(scope:object,column:object):Element;// 快捷编辑
        select?(scope:object,column:object):Element;// 下拉
        switch?(scope:object,column:object):Element;// Switch 开关
        tooltip?(scope:object,column:object,row:object, $index:number):Element;// tooltip
        popover?(column:object,row:object):Element;// popover弹框内容
        popoverText?(column:object,row:object):Element;// popover
        /**
         *
         * @param data 选中的数据
         */
        reference?(data:object[]):Element;// 批量卡槽，必须开启showCount显示个数统计才生效
        customize?(scope:object,column:object,row: object,$index:number):Element;// 自定义类型
    },
    methods:{
        init?(bool?:boolean):void;// 表格初始化，必须执行,true:不重置 false：重置
    }
};

export interface ContentTable_pageConfig {
    pageSize?:number;// 每页数量
    layout?:string;// 分页布局
    noPage?:boolean;// 是否启用分页，默认启用，设置true为不启用
    total?:number;// 分页总数
}

export type ContentTableConfig = ContentTableConfigType | ElTable;

export type ContentTableConfigType = {

}

export type ContentTable_Columns = ContentTable_ColumnsType | ElTableColumn;

export type ContentTable_ColumnsType = {
    type?:string
        | "selection" | "operate" | "textType"
        | "edit" | "select" | "switch" | "number"
        | "tooltip" | "popover" | "customize"; // 栏目类型
    emit?:string; // 文本emit对应方法名称，当type = "operate" | "textType" | "edit" | "change" | "switch" 生效
    /**
     * 对应类型| 对应emit方法暴露的参数
     * type   | $event
     * ==============================
     * operate | $event,row
     * textType | row
     * edit | value,row
     * select | $event,row
     * switch | $event,row
     */
    textType?:ContentTable_ColumnsType_textType;// 文本样式类型,link类型与其他类型可叠加使用
    btns?:ContentTable_ColumnsType_ZButton[];// 操作按钮组，当type = "operate" 生效
    dropdown?:boolean | false;// 是否为隐藏折叠按钮，当type = "operate" 生效
    applyValue?:boolean;// 是否回显编辑源数据，默认不回显
    applyText?:string;// 应用按钮文字
    selectData?:object[];// 下拉数据，当type = "select" 生效
    filter?:string;// 要启用的全局过滤器名称,type = "textType" | "edit" | 默认，时生效
    ellipsis1?:boolean;// 隐藏溢出-1行，type 默认时生效
    ellipsis2?:boolean;// 隐藏溢出-2行，type 默认时生效
    ellipsis3?:boolean;// 隐藏溢出-3行，type 默认时生效
    textTypeStyle?(row:object):ContentTable_ColumnsType_textType;// 样式过滤，当type = 'textType' 时生效
    filterLabel?(row:object,item:ContentTable_ColumnsType):string;// 文本过滤，当type = 'textType' 时生效
    popover_placement?:string;// 出现位置，当type = "popover" 生效 top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end
    popover_title?:string;// 标题，当type = "popover" 生效
    popover_trigger?:string;// 触发方式，当type = "popover" 生效  click/focus/hover/manual
    show?(data:object,row:object,column:object):boolean;// 控制按钮的可见
    columns?:ContentTable_Columns[];// 子栏目，合并表头
}

export type ContentTable_ColumnsType_ZButton = ContentTable_ColumnsType_ZButtonType | ZButton;
export type ContentTable_ColumnsType_ZButtonType = {
    className:ContentTable_ColumnsType_textType;// 按钮文本样式类型,link类型与其他类型可叠加使用
}
export type ContentTable_ColumnsType_textType = string
    | "link"

    | "default_bg"
    | "default"

    | "success"
    | "success_bg"

    | "delete"
    | "delete_bg"

    | "primary"
    | "primary_bg"

    | "orange"
    | "orange_bg";

//todo 【ZAlertFooter.vue】 ==========ZAlert尾部按钮固定组件

export interface ZAlertFooter extends CI{
    props:{
        align?:string;// 按钮对齐方式，css属性，默认左右居中
        page?:boolean;// 是否为页面布局，默认false
    },
    $slots: {
        // 默认卡槽
        default?(scope: object, column: object): Element;
    }
}

//todo 【TreeCheckbox.vue】 ==========复选框树组件

export interface TreeCheckbox extends CI{
    props:{
        // 是否启用复选框
        checkbox?: boolean;
        // 指定显示字段
        showNameField?: string;
        // 指定子节点父级字段
        childrenField?: string;
        // 指定子节点父级字段
        nodeIdField?: string;
        // 是否显示数量字段
        quantity?: boolean;
        // 是否显示箭头
        arrowsIcon?: boolean;
        // 绑定值
        value?: string[];
        // 数据
        options?: object[];
        // 搜索内容回调
        searchChange?(): boolean;
        // 显示图标
        showIcon?: boolean;
        // 自定义节点类型,当为true时计数正确且被搜索
        node_type?(nodeData:object):boolean ;
    };

    $slots: {
        // 默认卡槽
        default?(data: object, node: object): Element;
        // 图标
        icon?(data: object, node: object): Element;
        // 尾部插入
        append?(data: object, node: object): Element;
    }

    $emit:{
        input?(value:string[],allData:object[]):void
    }
}

//todo 【TransferBox.vue】 ==========人员选择 - 新
export interface TransferBox extends CI{
    props:{
        // 数据
        options?:object[];
        // 指定显示字段
        showNameField?: string | "node_name";
        // 指定子节点父级字段
        childrenField?: string | "children";
        // 指定子节点父级字段
        nodeIdField?: string | "node_id";
        // v-model
        // 备注：
        //     因为自动计算会存在递归循环现象，所以暂不支持异步更新初始值
        //     如需异步更新初始化的value值，请调用updateValue方法
        value?: Array<string[]|string>;
        // 自定义节点类型,当为true时计数正确且被搜索
        node_type?(nodeData:object):boolean ;
        // 高度
        height?:number | 500;
        // 支持一对多，右边已选框的个数
        index?:number | 500;
        // 是否显示分级线
        line?:boolean | false;
        // 缩进
        indent?:number | 30;
        /**
         * label过滤
         * @param val 值
         * @param data 数据
         * @param _self 当前vm
         */
        label?<T>(val:T,data:object,_self:Vue):T;
    }

    $emit:{
        input?(value:Array<string[]|string>):void
        onChange?(value:Array<string[]|string>):void
    }

    $slots: {
        // 默认卡槽
        default?(data: object, node: object): Element;
        // 图标
        icon?(data: object, node: object): Element;
        // 头部全选
        header?(): Element;
        /**
         * 穿梭框的标题描述
         * @param type 穿梭框类型
         * @param index 穿梭框索引，当类型为right时存在
         */
        title?(type:string|'left'|'right',index:number): Element;
    }
}

//todo 【TransferBoxNew.vue】 ==========人员选择 - 新
export interface TransferBoxNew extends CI{
    props:{
        // 数据
        options?:object[];
        // 指定显示字段
        showNameField?: string | "node_name";
        // 指定子节点父级字段
        childrenField?: string | "children";
        // 指定子节点父级字段
        nodeIdField?: string | "node_id";
        // v-model
        // 备注：
        //     因为自动计算会存在递归循环现象，所以暂不支持异步更新初始值
        //     如需异步更新初始化的value值，请调用updateValue方法
        value?: Array<string[]|string>;
        // 自定义节点类型,当为true时计数正确且被搜索
        node_type?(nodeData:object):boolean ;
        // 高度
        height?:number | 500;
        // 支持一对多，右边已选框的个数
        index?:number | 500;
        /**
         * label过滤
         * @param val 值
         * @param data 数据
         * @param _self 当前vm
         */
        label?<T>(val:T,data:object,_self:Vue):T;
        // 人员移动事件-可拦截移动
        arrow?(data:TransferBoxNew_arrowData):boolean;
        // 在显示复选框的情况下，是否严格的遵循父子不互相关联的做法，默认为 false
        checkStrictly?:boolean | false;
    }

    $emit:{
        input?(value:Array<string[]|string>,valData:Array<object[]|object>):void
        onChange?(value:Array<string[]|string>,valData:Array<object[]|object>):void
    }

    $slots: {
        // 默认卡槽
        default?(data: object, node: object): Element;
        // 图标
        icon?(data: object, node: object): Element;
        // 头部全选
        header?(): Element;
        /**
         * 穿梭框的标题描述
         * @param type 穿梭框类型
         * @param index 穿梭框索引，当类型为right时存在
         */
        title?(type:string|'left'|'right',index:number): Element;
    }
}

export interface TransferBoxNew_arrowData {
    val:string[];// 待移动选择值
    data:object[];// 待移动数据
    _self:Vue;// 当前vm
    parent:Vue;// 父级vm
    type:string;// 按钮类型
    arrow:string;// 移动方向
}

//todo 【TransferTree.vue】 ==========人员选择 - 旧
export interface TransferTree extends CI{
    props:{
        // 是否为顶级
        top?:boolean;
        // 数据
        options?:object[];
        // 指定显示字段
        showNameField?: string | "node_name";
        // 指定子节点父级字段
        childrenField?: string | "children";
        // 指定子节点父级字段
        nodeIdField?: string | "node_id";
        // 节点级别
        level?:number;
    }

    $emit:{
        input?(value:string[]):void
    }

    $slots: {
        // 默认卡槽
        default?(data: object, node: object): Element;
        // 头部
        header?(): Element;
    }
}

//todo 【Transfer.vue】 ==========人员选择
export interface Transfer extends CI{
    props:{
        // 数据
        options?:object[];
        // 指定显示字段
        showNameField?: string | "node_name";
        // 指定子节点父级字段
        childrenField?: string | "children";
        // 指定子节点父级字段
        nodeIdField?: string | "node_id";
        // v-model
        // 备注：
        //     因为自动计算会存在递归循环现象，所以暂不支持异步更新初始值
        //     如需异步更新初始化的value值，请调用initValue方法
        value?: string[];
        // 自定义节点类型,当为true时计数正确且被搜索
        node_type?(nodeData:object):boolean ;
    }

    $emit:{
        input?(value:string[]):void
    }

    $slots: {
        // 默认卡槽
        default?(data: object, node: object): Element;
        // 图标
        icon?(data: object, node: object): Element;
        // 尾部插入
        append?(data: object, node: object): Element;
    }
}

//todo 【CheckTree.vue】============权限已选菜单树组件

export interface CheckTree extends CI{
    props:{
        // 选项数据
        options?:object[];
        // 已选数据
        checks?:string[];
    },
    $emit:{
        //选中方法
        check?(data:string[]):void
    }
}

//todo 【HorizontalTree.vue】============权限菜单树组件

export interface HorizontalTree extends CI {
    props:{
        // 数据
        options: object[];
        // value 相关字段
        valueKeyName: string | "id";
        // lable 相关字段
        labelKeyName: string | "name";
        // child 相关字段
        childKeyName: string | "children";
        // 是否展开默认菜单
        isExpandDefault: boolean;
        // 默认展开的菜单数据，默认展开第一层数据
        expand: string[];
        // 拷贝默认展开的菜单数据
        expandCopy: string[];
        // 菜单级别
        level: number;
        // 是否是顶级菜单
        isTop: boolean;
        // 默认选中的数据
        checks: string[];
        // 是否启用复选功能，只有当type != 'add' 时才生效
        showCheckbox: boolean;
        // 当前tree的父节点
        parent: object;
        // 组件类型，默认带复选，其他目前只支持 type = 'add'
        type: string;
        // 当前tree的孩子节点类型
        childType: boolean;
        // 是否显示头部新增按钮
        showBtn: boolean;
    }

    $slots:{
        // 默认卡槽
        default?(node: object, type: object): Element;
        // 头部卡槽
        header?(childType: string): Element;
        // 头部子卡槽
        headerChild?(): Element;
        // 头部Label
        headerLabel?(level:number): Element;
    }

    $emit:{
        // 选中监听
        check(value:string[]):void
        /**
         * 暴露 emit-add
         * @param type add类型（directory、child_directory、btn）
         * @param item add父节点数据
         */
        add(type:string, item:object):void
        /**
         * 暴露 emit-more
         * @param type 更多操作类型，（modify、delete）
         * @param item 操作的当前节点数据
         * @param level 级别
         */
        more(type:string, item:object, level:number):void
        /**
         * 树节点的点击事件
         * @param item 当前节点
         * @param key 节点索引
         * @param bool 当前是否默认展开
         * @constructor
         */
        'on-currentIsExpandDefault'(currentIsExpandDefault:boolean):void;
    }
}

//todo 【HorizontalTreeHeaderLabel.vue】============权限菜单树组件HeaderLabel

export interface HorizontalTreeHeaderLabel extends CI{
    props:{
        // label
        label:string | "级目录",
        // 图标
        icon:string | boolean | "el-icon-plus",
    },
}

//todo 【MenuRoleSelect.vue】============权限手机端菜单选择

export interface MenuRoleSelect extends CI{
    props:{
        // 菜单
        menus:object[];
        // v-model
        value:object[],
        // 显示的字段
        showFieldName:string | "name",
        // 绑定的value字段
        valueField:string | "id",
        // 是否允许拖拽排序
        draggable:boolean,
        // 是否可选择
        selective:boolean,
    },
    $slots:{
        // 默认卡槽
        default?(data:object):Element;
        // 标题卡槽
        title?():Element;
        // 底部标题卡槽
        titleFooter?():Element;
    }
    $emit:{
        input?(val?:string):void;// input数据绑定
        save?(val?:string,valData?:object[]):void;// 保存
    }
}

//todo 【AsideTree.vue】============AsideTree下拉树

export interface AsideTree extends CI{
    props:{
        // 数据
        options:object[];
        // 类型
        type:string | "RoleAssignment";
        // 显示字段
        showNameField:string | "label";
        // 子集字段
        childrenField:string | "children";
    },
    $emit:{
        // 节点click
        node?(node:object):void;
        // 绑定角色-RoleAssignment类型生效
        bindRole?(nodeData:object):void;
    },
    $solts:{
        // 默认卡槽
        default?(node:object,data:object,indent:number):Element;
        dropdown?( data:object)
    }
}

//todo 【Wangeditor.vue】============富文本编辑器

export interface Wangeditor extends CI{
    props:{
        // v-model，异步写入请执行init方法
        value:string,
        // 配置,具体配置请参考http://www.wangeditor.com/
        config:object,
        // 宽度
        width:string;
        // 高度,默认500px
        height:string;
        // 图片上传路径
        url:string;
    }
    $emit:{
        input?(val?:string):void;// input数据绑定
        onChange?(val?:string):void;// input数据绑定
        customInsert?(insertLinkImg, result, editor):void;// 图片自定义插入
        success?(xhr, editor, result):void;// 图片上传成功
        error?(xhr, editor):void;// 图片上传失败
    }
}

//todo 【Upload.vue】============文件上传

export interface Upload extends CI{
    props:ElUpload,
    $emit:{
        // 以下方法同element-ui
        onRemove?():void;
        onProgress?():void;
        onChange?():void;
        onPreview?():void;
        onSuccess?():void;
        onError?():void;
    }
    methods:{
        // 手动上传,autoUpload=false时生效
        submit?():void;
    }
    $slots:{
        // 默认卡槽
        default?():Element;
        // 拖拽标题
        dragTitle?():Element;
        // 拖拽描述
        dragMsg?():Element;
        // trigger
        trigger?():Element;
        // tip
        tip?():Element;
    }
}

//todo 【TreeTable.vue】============树形表格

export interface TreeTable extends CI{
    props:{
        options:object[];// 数据
        columns:TreeTableColumns[];// 栏目
        arrowsIcon:object[];// 是否启用箭头，默认启用
    },
    $emit:{
        /**
         * 拖拽事件
         * @param currentOptions 当前拖拽的数据
         * @param level 当前级别
         * @param parentNode 当前父节点
         * @param bool 是否是当前节点
         */
        draggable(currentOptions:object[],level:number,parentNode:object,bool:boolean,$event:object):void;// 拖拽事件
    },
    $slots:{
        // 默认卡槽
        default?(node:object,column:object,row:object):Element;
        // 操作
        operate?(node:object,column:object,row:object):Element;
    }
}

export interface TreeTableColumns{
    type:string | 'operate';// 类型
    span:number;// 栅格化
    btns:ZButton[];// 按钮，当type=operate生效
}

//todo 【InputPopover.vue】============input校验提示

export interface InputPopover extends CI{
    props:{
        placement?:string;// 位置
        trigger?:string;// 触发方式
        value?:string;// 需要校验的数据
        verifys?:InputPopoverVerifys[];// 校验规则
    },
    $emit:{
        /**
         * 校验回调
         * @param bool 真假
         */
        check(bool:boolean):void;// 校验回调
    },
    methods:{
        /**
         * 校验回调
         * @return bool 真假
         */
        check():boolean;// 校验回调
    },
    $slots:{
        // 默认卡槽
        default?():Element;
    }
}

/*
默认值：
[
    {msg:"6-20个字符", verify:val=>val && /^.{6,20}$/.test(val)},
    {msg:"只能包含字母、数字以及标点符号（除空格）", verify:val=>val && /^[^\s]{1,}$/.test(val)},
    {msg:"字母、数字和标点符号至少包含2种", verify:val=>val && [/\d{1,}/.test(val),/[a-zA-Z]{1,}/.test(val),/\W{1,}/.test(val)].filter(e=>e).length > 1},
]
 */
export interface InputPopoverVerifys {
    msg:string;// 提示文字
    /**
     * 加盐规则
     * @param value 校验数据
     * @param vm vm对象
     */
    verify(value:any,vm:object):boolean;// 校验柜子
}


//todo 【Print.vue】============打印组件

export interface Print extends CI{
    props:{
        beforePrint?(vm:object):boolean;// 打印前，如果返回true，会终止打印
        afterPrint?():void;// 打印后
    }
    $slots:{
        // 默认卡槽
        default?():Element;
        // 打印内容卡槽
        content?():Element;
    },
    methods:{
        print?():void;// 打印方法，可选，可以手动调用打印
        done?():void;// 执行打印，可选，可以手动调用打印
        render?():void;// 初始化打印内容， 便于动态数据的渲染，此方法将触发emit print 方法
    },
    $emit:{
        /**
         *
         * @param vm 打印内容实例
         * @param next 执行下一步
         */
        print?(vm:object,next:void):void;
    }
}


//todo 【Map.vue】============地图选址

export interface Map extends CI{
    props:{
        mapCenter:number[] | [121.622751, 29.858108];// 地图中心
        searchOption:object | {city: '宁波', citylimit: true};// 检索城市
        zoom:object | 6;// 缩放等级
        value:MapValue[]; // v-model
        relative:boolean | false; // 相对布局
        type:string | "track" | "wadi"; // 地图类型【track：轨迹、wadi：河道】
        path:object[]; // 地图类型【track：轨迹】
        icon:string; // 轨迹图标，当type = 'track' 是生效
        content:string; // 轨迹标题，当type = 'track' 是生效
        getWadiData():Promise<{data:string[]}>; // 附近河道数据，当type = 'wadi' 是生效
        getWadiSearchData():Promise<{data:string[]}>; // 河道搜索数据，当type = 'wadi' 是生效
    }
    $slots:{
        // 默认卡槽
        default?():Element;
    },
    $emit:{
        'view-water-quality'?(extData:object,type:string):void;// 查看水质，当type = 'wadi' 是生效
        'view-water-quality-attention'?(extData:object,type:string):void;// 关注，当type = 'wadi' 是生效
        'view-water-quality-unattention'?(extData:object,type:string):void;// 取消关注，当type = 'wadi' 是生效
    }
}

export interface MapValue {
    address:string;// 地址
    longitude:number;// 经度
    latitude:number;// 纬度
}


//todo 【BooK.vue】============书本翻页

export interface BooK extends CI{
    props:{
        value:number | 0;// v-model
    }
    $slots:{
        // 默认卡槽
        default?():BookItem;
    }
}


//todo 【BookItem.vue】============书本翻页item

export interface BookItem extends CI{}


//todo 【Steps.vue】============步骤条

export interface Steps extends CI{
    props:{
        data:StepsItem[]
    },
    $emit:{
        click?(item:object,index:number):void;// 点击事件
    }
}

export interface StepsItem {
    name:string;// 显示名称
    selected:string;// 是否选中
}


//todo 【Swiper.vue】============轮播-灯箱

export interface Swiper extends CI{
    props:{
        config:object;// 集体参考https://www.swiper.com.cn/api/index.html
    }
    $slots:{
        // 默认卡槽
        default?():SwiperItem;
    }
}


//todo 【SwiperItem.vue】============轮播-灯箱-子集

export interface SwiperItem extends CI{
    $slots:{
        // 默认卡槽
        default?():BookItem;
    }
}


//todo 【Signature.vue】============签名

export interface Signature extends CI{
    props:{
        lineWidth:number | 2;// 线宽
        strokeStyle:string | "#000000";// 线条颜色
        fillStyle:string | "#ffffff";// 背景颜色
        downloadName:string | "签名";// 下载文件名称
        downloadType:string | "png";// 下载文件后缀
    }
}


//todo 【Icon.vue】============彩色图标

export interface Icon extends CI{
    props:{
        // 字体大小
        size?:number| string | 24;
        // 字体单位
        unit?:string | "px";
    }
    $slots:{
        // 默认卡槽-内容为字体名称
        default?():Element;
    },
}


//todo 【UploadChunk.vue】============切片上传

export interface UploadChunk extends CI{
    props:{
        // 切割大小，默认2M
        size?:number | 2;
        // 是否多选
        multiple?:boolean | false;
        // 文件格式限制
        accept?:string;
        // 是否自动上传
        autoUpload?:boolean | true;
        // 接口地址
        baseURL?:string;
    }
    $slots:{
        // 默认卡槽-内容为字体名称
        default?():Element;
    },
    $emit:{
        // 手动提交
        submit?():void;
        // 选择文件
        change?(files:File,ev:Event,):void;
        // 上传成功
        "on-success"?(files:File,ev:Event,):void;
        // 上传失败
        "on-error"?(files:File,ev:Event,):void;
    }
}


//todo 【Annotation.vue】============文档标记

export interface Annotation extends CI{
    props:{
        // 保存标记
        saveMark?(data:AnnotationData):Promise<any>;
        // 获取标记列表
        getMark?():Promise<AnnotationData[]>;
    }
    $slots:{
        // 默认卡槽
        default?():Element;
        // 待选标记卡槽
        mark?(vm:object):Element;
        // 已选标记卡槽
        display?(vm:object,data:AnnotationDisplayData):Element;
    },
    methods:{
        init?(bool?:boolean | true):void;// 初始化，必须执行 true
    },
    $emit:{
        // 点击已选标记
        click?(data:AnnotationDisplayData):void;
        // 删除已选标记
        deleteMark?(data:AnnotationDisplayData):void;
    }
}

/**
 * 回调event数据
 */
export interface AnnotationDisplayData {
    text:string;// 标记文本内容
    key:string;// 标记key值
    id:string;// 标记唯一id
    type:string;// 标记类型
}

/**
 * 标记数据接口
 */
export interface AnnotationData {
    baseOffset:number;// 标记开始偏移量
    baseKey:string;// 标记开始key值
    focusOffset:number;// 标记结束偏移量
    focusKey:string;// 标记结束key值
    type:string;// 标记类型
    id:string;// 标记唯一id
}
