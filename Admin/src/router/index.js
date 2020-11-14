"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vue_1 = require("vue");
var vue_router_1 = require("vue-router");
vue_1.default.use(vue_router_1.default);
var bodyBaColor = "#e5e5e5";
exports.default = new vue_router_1.default({
    routes: [
        {
            path: "*",
            redirect: "/",
        },
        {
            path: "/login",
            component: function () { return Promise.resolve().then(function () { return require("@/components/view/Login/Login"); }); }
        },
        {
            path: "/",
            component: function () { return Promise.resolve().then(function () { return require("@/components/layout/layout"); }); },
            redirect: "home",
            meta: {
                isLogin: true,
            },
            children: [
                {
                    path: "home",
                    component: function () { return Promise.resolve().then(function () { return require("@/components/view/Home/Home"); }); },
                    meta: {
                        bodyBaColor: bodyBaColor,
                    }
                },
                {
                    path: "userInfo",
                    component: function () { return Promise.resolve().then(function () { return require("@/components/view/UserInfo/UserInfo"); }); },
                    meta: {
                        bodyBaColor: bodyBaColor,
                    }
                }
            ]
        }
    ]
});
