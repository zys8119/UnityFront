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
var IndexController = /** @class */ (function (_super) {
    __extends(IndexController, _super);
    function IndexController() {
        return _super.call(this) || this;
    }
    IndexController.prototype.index = function () {
        this.$_log("as");
        console.log("写入成功");
        this.$_success();
    };
    IndexController.prototype.axios = function () {
        var _this = this;
        this.$_axios({
            url: "http://www.baidu.com"
        }).then(function (res) {
            _this.$_success(res.data);
        });
    };
    return IndexController;
}(applicationController_1["default"]));
exports.IndexController = IndexController;
