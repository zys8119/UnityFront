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
var index_1 = require("../../../UnityFrontUtils/config/index");
var installController = /** @class */ (function (_super) {
    __extends(installController, _super);
    function installController() {
        var _this = _super.call(this) || this;
        _this.prefix = "uf_";
        _this.sql = [
            "   SET FOREIGN_KEY_CHECKS=0;",
            //创建表menu_ui
            "\n            DROP TABLE IF EXISTS `" + _this.prefix + "menu_ui`;\n            CREATE TABLE `" + _this.prefix + "menu_ui` (\n                id  int(11) NOT NULL AUTO_INCREMENT,\n                name  varchar(25) NULL COMMENT 'ui\u540D\u79F0' ,\n                type  varchar(25) NULL COMMENT 'ui\u7C7B\u578B' ,\n                path  varchar(255) NULL COMMENT 'ui\u8DEF\u5F84' ,\n                PRIMARY KEY (id)\n            ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;\n            -- ----------------------------\n            -- \u8BB0\u5F55 of uf_menu_ui\n            -- ----------------------------\n            INSERT INTO `" + _this.prefix + "menu_ui` values (1,'input','input','vux/XInput');\n        ",
            //创建表project
            "\n            DROP TABLE IF EXISTS `" + _this.prefix + "project`;\n            CREATE TABLE IF NOT EXISTS `" + _this.prefix + "project` (\n                id  int(11) NOT NULL AUTO_INCREMENT,\n                project_name  varchar(25) NULL COMMENT '\u9879\u76EE\u540D\u79F0' ,\n                rmarks  varchar(25) not NULL COMMENT '\u9879\u76EE\u5907\u6CE8' default 'asd',\n                PRIMARY KEY (id)\n            ) ENGINE=InnoDB DEFAULT CHARSET=utf8;\n        ",
        ];
        _this.sqlStr = "";
        _this.sqlStr = _this.sql.join("\n");
        return _this;
    }
    /**
     * 安装数据
     */
    installController.prototype.install = function () {
        var _this = this;
        this.DB({
            multipleStatements: true,
        }).query(this.sqlStr).then(function (res) {
            //查询数据库所有表
            _this.DB().select("table_name").from("information_schema.tables").where({
                table_schema: index_1.mysqlConfig.options.database
            }).query().then(function (res) {
                _this.$_success("安装成功", res);
            }).catch(function (err) {
                _this.$_error("安装失败");
            });
        }).catch(function (err) {
            _this.$_error("安装失败");
        });
    };
    installController.prototype.queryTable = function () {
    };
    return installController;
}(applicationController_1.default));
exports.installController = installController;
