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
var installController = /** @class */ (function (_super) {
    __extends(installController, _super);
    function installController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    installController.prototype.install = function () {
        var _this = this;
        this.DB().query("\n        CREATE DATABASE IF NOT EXISTS " + this.$_body.sql.dataBaseName + " \n        DEFAULT CHARACTER SET utf8\n        DEFAULT COLLATE utf8_general_ci;\n        ").then(function (res) {
            _this.$_send({
                code: 200,
                msg: "数据库创建成功"
            });
        })["catch"](function (err) {
            _this.$_send({
                code: 403,
                msg: "数据库创建失败"
            });
        });
    };
    return installController;
}(applicationController_1["default"]));
exports.installController = installController;
