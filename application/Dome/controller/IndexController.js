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
    IndexController.prototype.dom = function () {
        var _this = this;
        this.$_puppeteer("https://www.baidu.com/s?ie=UTF-8&wd=?", function () { return new Promise(function (resolve) {
            var resData = [];
            resData.push.apply(resData, document.querySelectorAll(".c-container .t a"));
            var result = resData.map(function (el) { return ({
                url: el.href,
                value: el.innerText
            }); });
            resolve(result);
        }); }).then(function (res) {
            _this.$_success(res);
        })["catch"](function (err) {
            _this.$_error(err);
        });
    };
    IndexController.prototype.fileStreamDownload = function () {
        var _this = this;
        this.$_fileStreamDownload("http://localhost:8080/public/example.png", false)["catch"](function (err) {
            _this.$_error(err);
        });
    };
    return IndexController;
}(applicationController_1["default"]));
exports.IndexController = IndexController;
