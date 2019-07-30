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
var MenuController = /** @class */ (function (_super) {
    __extends(MenuController, _super);
    function MenuController() {
        return _super.call(this) || this;
    }
    /**
     *获取基础UI
     */
    MenuController.prototype.getMenuUi = function () {
        var _this = this;
        this.DB().select().from("uf_menu_ui").query().then(function (res) {
            _this.$_success(res);
        })["catch"](function (err) {
            _this.$_error();
        });
    };
    /**
     *获取项目记录
     */
    MenuController.prototype.getProjectList = function () {
        var _this = this;
        this.DB().select().from("uf_project").query().then(function (res) {
            _this.$_success(res);
        })["catch"](function (err) {
            _this.$_error();
        });
    };
    /**
     *创建新项目
     */
    MenuController.prototype.CreateNewProjects = function () {
        var _this = this;
        this.DB().insert("uf_project", {
            project_name: this.$_body.project_name,
            rmarks: this.$_body.rmarks || ""
        }).query().then(function (res) {
            _this.$_success();
        })["catch"](function (err) {
            _this.$_error();
        });
    };
    return MenuController;
}(applicationController_1["default"]));
exports.MenuController = MenuController;
