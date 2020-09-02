"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
window['4k_init'] = /** @class */ (function () {
    function class_1(_a) {
        var navlist = _a.navlist, axiosObj = _a.axios;
        return new Vue({
            data: function () {
                return {
                    navlist: navlist,
                    select: (navlist[0] || {}).id,
                    imgs: {
                        data: [],
                    },
                    pageNo: 0,
                };
            },
            computed: {
                total: function () {
                    if (isNaN(parseInt(this.imgs.total))) {
                        return 0;
                    }
                    return parseInt(this.imgs.total);
                }
            },
            render: function (createElement, hack) {
                var _this = this;
                return createElement("div", {
                    attrs: {
                        id: "app"
                    }
                }, []
                    .concat(createElement("div", { class: "headerBox" }, this.navlist.map(function (item) { return createElement('div', {
                    class: {
                        select: _this.select === item.id
                    },
                    staticClass: "headerBoxItem",
                    on: {
                        click: function () { return _this.clickSwitch(item); }
                    }
                }, item.name); })))
                    .concat(createElement("div", {
                    staticClass: "pictureBox"
                }, this.imgs.data.map(function (item) { return createElement('div', {
                    staticClass: "pictureItem"
                }, [].concat(createElement("img", {
                    attrs: {
                        src: item.url,
                    },
                    on: {
                        click: function () { return _this.downloadImg(item); }
                    }
                }))); })))
                    .concat(createElement("div", {
                    staticClass: "pictureFooter"
                }, []
                    .concat(createElement("span", { staticClass: "total" }, "\u5171" + this.total + "\u4E2A"))
                    .concat(createElement("span", { staticClass: "pageNo" }, "\u7B2C" + (this.pageNo + 1) + "\u9875"))
                    .concat(createElement("span", { staticClass: "prev", on: { click: function () { return _this.pageNo -= 1; } } }, "\u4E0A\u4E00\u9875"))
                    .concat(createElement("span", { staticClass: "next", on: { click: function () { return _this.pageNo += 1; } } }, "\u4E0B\u4E00\u9875")))));
            },
            watch: {
                select: function () {
                    this.pageNo = 0;
                    this.getData();
                },
                pageNo: function () {
                    this.getData();
                }
            },
            mounted: function () {
                this.getData();
            },
            methods: {
                axios: function (data) {
                    return axiosObj(__assign({ baseURL: "/Dome/Img4k" }, data));
                },
                // 选择分类
                clickSwitch: function (item) {
                    this.select = item.id;
                },
                // 获取分类数据
                getData: function () {
                    var _this = this;
                    this.axios({
                        url: "/getData_4k",
                        method: "get",
                        params: {
                            id: this.select,
                            pageNo: this.pageNo
                        }
                    }).then(function (res) {
                        _this.imgs = res.data.data;
                    });
                },
                // 下载图片
                downloadImg: function (item) {
                    open("/Dome/Img4k/downloadImg?url=" + item.url);
                }
            }
        }).$mount("#app");
    }
    return class_1;
}());
