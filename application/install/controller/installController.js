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
        var _this = _super.call(this) || this;
        _this.prefix = "uf_";
        _this.sql = [
            "\n        CREATE TABLE IF NOT EXISTS " + _this.prefix + "menu_ui\n        (id  int(11) NOT NULL AUTO_INCREMENT,\n            name  varchar(25) NULL COMMENT 'ui\u540D\u79F0' ,\n            type  varchar(25) NULL COMMENT 'ui\u7C7B\u578B' ,\n            path  varchar(255) NULL COMMENT 'ui\u8DEF\u5F84' ,\n        PRIMARY KEY (id))\n        "
        ];
        _this.sqlStr = "";
        _this.sqlStr = _this.sql.join(";");
        return _this;
    }
    installController.prototype.install = function () {
        var _this = this;
        this.DB().query(this.sqlStr).then(function (res) {
            _this.$_success("安装成功");
        })["catch"](function (err) {
            _this.$_error("安装失败");
        });
    };
    return installController;
}(applicationController_1["default"]));
exports.installController = installController;
