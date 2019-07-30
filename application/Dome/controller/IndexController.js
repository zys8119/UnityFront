"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var applicationController_1 = require("../../../UnityFrontUtils/controller/applicationController");
var pdf = require('html-pdf');
var IndexController = /** @class */ (function (_super) {
    __extends(IndexController, _super);
    function IndexController() {
        return _super.call(this) || this;
    }
    IndexController.prototype.index = function () {
        console.log(this.StatusCode.error.code);
        this.$_send("创建成功");
    };
    IndexController.prototype.toPdf = function (template, options, reg, filename) {
        /**
         template: html 模板
         options: 配置
         reg: 正则匹配规则
         filename: 输出pdf文件路径及文件名
         */
        // 将所有匹配规则在html模板中匹配一遍
        if (reg && Array.isArray(reg)) {
            reg.forEach(function (item) {
                template = template.replace(item.relus, item.match);
            });
        }
        pdf.create(template, options).toFile(filename, function (err, res) {
            if (err) {
                return console.log(err);
            }
            console.log(res);
        });
    };
    return IndexController;
}(applicationController_1["default"]));
exports.IndexController = IndexController;
