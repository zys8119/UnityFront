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
    mysql.prototype.isString = function (data) {
        if (typeof data == 'string') {
            return '\'' + data + '\'';
        }
        return data;
    };
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
        var _this = this;
        if (showSqlStr) {
            this.showSqlStrBool = showSqlStr;
        }
        switch (typeof WhereArr) {
            case "object":
                this.selectSql += "WHERE " + Object.keys(WhereArr).map(function (e) { return (e + ' = ' + _this.isString(WhereArr[e])); }).join(" And ");
                break;
            case "string":
                this.selectSql += "WHERE " + WhereArr + " ";
                break;
        }
        return this;
    };
    mysql.prototype.insert = function (TabelName, ArrData, showSqlStr) {
        var _this = this;
        if (ArrData === void 0) { ArrData = []; }
        if (showSqlStr) {
            this.showSqlStrBool = showSqlStr;
        }
        this.selectSql = "INSERT INTO " + TabelName + " ";
        switch (Object.prototype.toString.call(ArrData)) {
            case "[object Array]":
                this.selectSql += "VALUES(" + ArrData.join(",") + ") ";
                break;
            case "[object Object]":
                this.selectSql += "(" + Object.keys(ArrData).join(",") + ") VALUES (" + Object.keys(ArrData).map(function (e) { return _this.isString(ArrData[e]); }).join(",") + ") ";
                break;
            default:
                this.selectSql += ArrData + " ";
                break;
        }
        return this;
    };
    mysql.prototype.end = function () {
        this.connection.end();
    };
    return mysql;
}());
exports["default"] = mysql;
