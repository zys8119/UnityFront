"use strict";
exports.__esModule = true;
require("../typeStript");
var configs_1 = require("./configs");
var mysqlTool = require('mysql');
var ncol = require('ncol');
var mysql = /** @class */ (function () {
    function mysql() {
        this.connection = mysqlTool.createConnection(configs_1["default"].options);
        this.selectSql = '';
        this.showSqlStrBool = false;
        this.connection.connect();
        this.selectSql = '';
    }
    mysql.prototype.query = function (sqlStr, showSqlStr) {
        var _this = this;
        if (showSqlStr) {
            this.showSqlStrBool = showSqlStr;
        }
        var sqlStrs = sqlStr || this.selectSql;
        if (this.showSqlStrBool) {
            ncol.success(sqlStrs);
            return new Promise(function (resolve, reject) {
                resolve(sqlStrs);
                _this.end();
            });
        }
        return new Promise(function (resolve, reject) {
            _this.connection.query(sqlStrs, function (error, results, fields) {
                if (error) {
                    ncol.error("\u3010QUERY ERROR\u3011::  " + error.message + " in (`" + sqlStr + "`)");
                    console.error(error);
                    reject(error);
                    _this.end();
                    return;
                }
                resolve(results);
                _this.end();
            });
        });
    };
    mysql.prototype.select = function (TableFieldName, showSqlStr) {
        if (TableFieldName === void 0) { TableFieldName = "*"; }
        if (showSqlStr) {
            this.showSqlStrBool = showSqlStr;
        }
        this.selectSql = "SELECT " + TableFieldName + " ";
        return this;
    };
    mysql.prototype.from = function (TableName, showSqlStr) {
        if (showSqlStr) {
            this.showSqlStrBool = showSqlStr;
        }
        this.selectSql += "FROM " + TableName + " ";
        return this;
    };
    mysql.prototype.where = function (WhereArr, showSqlStr) {
        if (showSqlStr) {
            this.showSqlStrBool = showSqlStr;
        }
        var whereStr = "";
        var lng = Object.keys(WhereArr).length;
        var index = 0;
        var And = "";
        for (var k in WhereArr) {
            if (index > 0 && index < lng) {
                And = "And";
            }
            else {
                And = "";
            }
            whereStr += And + " " + k + " = " + WhereArr[k] + " ";
            index += 1;
        }
        if (lng > 0) {
            this.selectSql += "WHERE " + whereStr;
        }
        return this;
    };
    mysql.prototype.end = function () {
        this.connection.end();
    };
    return mysql;
}());
exports["default"] = mysql;
