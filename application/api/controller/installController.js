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
        return _super.call(this) || this;
    }
    /**
     * 获取sql
     * @param prefix 表前缀
     */
    installController.prototype.getSql = function (prefix) {
        if (prefix === void 0) { prefix = index_1.mysqlConfig.options.prefix; }
        return [
            "   SET FOREIGN_KEY_CHECKS=0;",
            //创建表menu_ui
            "\n            DROP TABLE IF EXISTS `" + prefix + "menu_ui`;\n            CREATE TABLE `" + prefix + "menu_ui` (\n                id  int(11) NOT NULL AUTO_INCREMENT,\n                name  varchar(25) NULL COMMENT 'ui\u540D\u79F0' ,\n                type  varchar(25) NULL COMMENT 'ui\u7C7B\u578B' ,\n                path  varchar(255) NULL COMMENT 'ui\u8DEF\u5F84' ,\n                PRIMARY KEY (id)\n            ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;\n            -- ----------------------------\n            -- \u8BB0\u5F55 of menu_ui\n            -- ----------------------------\n        ",
            //创建表project
            "\n            DROP TABLE IF EXISTS `" + prefix + "project`;\n            CREATE TABLE IF NOT EXISTS `" + prefix + "project` (\n                `id` int(11) NOT NULL AUTO_INCREMENT,\n                `project_id` varchar(255) DEFAULT NULL COMMENT '\u9879\u76EEid',\n                `project_name` varchar(25) NOT NULL COMMENT '\u9879\u76EE\u540D\u79F0',\n                `config` longtext COMMENT '\u9879\u76EE\u914D\u7F6E',\n              PRIMARY KEY (`id`)\n            ) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;\n        ",
        ].join("\n");
    };
    /**
     * 安装数据表
     */
    installController.prototype.install = function () {
        var _this = this;
        this.DB({
            multipleStatements: true,
        }).query(this.getSql(this.$_body.sql.prefix)).then(function (res) {
            //查询数据库所有表
            _this.queryTableNameList();
        }).catch(function (err) {
            _this.$_error("安装失败");
        });
    };
    /**
     * 查询已安装的数据表
     */
    installController.prototype.queryTableNameList = function () {
        var _this = this;
        var sql = this.getSql(this.$_body.sql.prefix);
        var sqlMatch = sql
            .match(/DROP TABLE IF EXISTS \`.*\`/img);
        var TableName = [];
        if (sqlMatch) {
            TableName = sqlMatch.map(function (e) {
                var name = /(?:DROP TABLE IF EXISTS `(.*)`$)/.exec(e);
                if (name && name[1]) {
                    return {
                        name: name[1],
                        install: false
                    };
                }
                return e;
            });
        }
        ;
        this.DB().select("table_name").from("information_schema.tables").where({
            table_schema: index_1.mysqlConfig.options.database
        }).query().then(function (res) {
            res.forEach(function (resItem) {
                var indexName = TableName.some(function (tn) {
                    if (tn.name == resItem.table_name) {
                        tn.install = true;
                        return true;
                    }
                    ;
                });
                if (!indexName) {
                    TableName.push({
                        name: resItem.table_name,
                        install: true
                    });
                }
            });
            _this.$_success(TableName);
        }).catch(function (err) {
            _this.$_error();
        });
    };
    return installController;
}(applicationController_1.default));
exports.installController = installController;
