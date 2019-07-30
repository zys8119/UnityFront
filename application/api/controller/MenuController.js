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
Object.defineProperty(exports, "__esModule", { value: true });
var applicationController_1 = require("../../../UnityFrontUtils/controller/applicationController");
var MenuController = /** @class */ (function (_super) {
    __extends(MenuController, _super);
    function MenuController() {
        return _super.call(this) || this;
    }
    MenuController.prototype.getMenuUi = function () {
        var _this = this;
        this.DB().select().from("uf_menu_ui").query().then(function (res) {
            _this.$_success(res);
        }).catch(function (err) {
            _this.$_error();
        });
    };
    return MenuController;
}(applicationController_1.default));
exports.MenuController = MenuController;
