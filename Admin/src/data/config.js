"use strict";
exports.__esModule = true;
exports["default"] = {
    MenuMap: {
        "switch": false,
        buid: {
            path: "route",
            children: "list",
            name: "name",
        },
        dev: {
            path: "path",
            children: "children",
            name: "name",
        }
    },
    filter: {
        RepresentativeChange: {
            status: {
                1: { name: "待审核", style: "orange" },
                2: { name: "已通过", style: "success" },
                3: { name: "未通过", style: "default" },
            }
        },
        adminGetConferenceRoomReserve: {
            status: {
                1: { name: "未开始", style: "primary" },
                2: { name: "进行中", style: "success" },
                3: { name: "已结束", style: "orange" },
                4: { name: "已退订", style: "default" },
            }
        },
        adminGetConferenceStatus: {
            status: {
                1: { name: "报名中", style: "primary" },
                2: { name: "会议前", style: "success" },
                3: { name: "进行中", style: "orange" },
                4: { name: "已结束", style: "default" },
            }
        }
    },
    platformListConfig: [
        { label: "人大平台", value: 1 },
        { label: "人大办公平台", value: 2 },
        { label: "人大知识库", value: 3 },
        { label: "智能排座", value: 4 },
    ],
    ContactStationManagementPublicSentimentStatus: {
        1: { name: "登记", className: "orange" },
        2: { name: "审核", className: "orange" },
        3: { name: "交办", className: "success" },
        4: { name: "签收", className: "success" },
        5: { name: "办理", className: "success" },
        6: { name: "反馈", className: "primary" },
        7: { name: "完成", className: "default" },
    },
    base_type_list: {
        1: "工作证件",
        2: "出列席证件",
    },
    dutyAuditStatus: {
        2: { name: "待审核", value: 2, className: "delete" },
        3: { name: "已通过", value: 3, className: "success" },
        4: { name: "未通过", value: 4, className: "default" },
    },
};
