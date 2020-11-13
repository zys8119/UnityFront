"use strict";
exports.__esModule = true;
exports.MeetingDocumentType = exports.pageConfig = void 0;
//todo 过滤器组件
exports["default"] = {
    "default": {
        input: true,
        placeholder: "请输入关键字",
        search: "search",
        searchText: "搜索",
        reset: "reset",
        resetText: "重置",
        rightBtns: [
            {
                name: '导出',
                emit: "Export",
            },
            {
                name: '新建角色',
                emit: "NewRole",
            },
        ]
    },
    init: {
        input: true,
        placeholder: "请输入关键字",
        search: "search",
        searchText: "搜索",
        reset: "reset",
        resetText: "重置",
        rightBtns: [
            {
                name: '新增绑定',
                emit: "add",
            },
        ]
    },
    right: {
        input: false,
        searchText: false,
        resetText: false
    },
    none: {
        input: false,
        searchText: false,
        resetText: false,
        rightBtns: [],
    },
    btn: {
        input: true,
        placeholder: "请输入关键字",
        search: "search",
        searchText: "搜索",
        reset: "reset",
        resetText: "重置",
        rightBtns: []
    }
};
//todo 表格默认分页参数
exports.pageConfig = {
    pageSize: 10,
    layout: "total, sizes, prev, pager, next, jumper",
    noPage: false,
    total: 0,
};
//todo 会议文件类型
exports.MeetingDocumentType = [
    { name: '会议日程', id: '2' },
    { name: '会议指南', id: '3' },
    { name: '大会文件', id: '4' },
    { name: '参阅文件', id: '5' },
    { name: '会议简报', id: '6' },
    { name: '主席团文件', id: '7' },
    { name: '会议其他文件', id: '8' },
    { name: '工作人员文件', id: '9' },
    { name: '专委会工作文件', id: '17' },
    { name: '视频文件', id: '10' },
];
