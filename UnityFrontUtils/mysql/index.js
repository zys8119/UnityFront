"use strict";
exports.__esModule = true;
require("../typeStript");
var config_1 = require("../config");
var mysqlTool = require('mysql');
var ncol = require('ncol');
var mysql = /** @class */ (function () {
    function mysql(optionsConfig, isEnd) {
        this.selectSql = '';
        this.showSqlStrBool = false;
        this.isEnd = false;
        this.selectSql = '';
        this.isEnd = isEnd;
        var options = JSON.parse(JSON.stringify(config_1.mysqlConfig.options));
        if (optionsConfig && typeof optionsConfig == "object") {
            for (var k in optionsConfig) {
                options[k] = optionsConfig[k];
            }
        }
        var QueueKeyName = JSON.stringify(options);
        if (!config_1.mysqlConfig.createPool[QueueKeyName]) {
            config_1.mysqlConfig.createPool[QueueKeyName] = mysqlTool.createPool(options);
        }
        ;
        this.connection = config_1.mysqlConfig.createPool[QueueKeyName];
    }
    /**
     * @param data 需要处理的数据
     */
    mysql.prototype.isString = function (data) {
        if (typeof data == 'string' && ['.'].some(function (e) { return data.indexOf(e) == -1; })) {
            return '\'' + data + '\'';
        }
        return data;
    };
    /**
     * 条件格式转换
     * @param sqlArr 条件数据
     * @param type 条件符号
     * @param join 连接符号
     */
    mysql.prototype.sqlFormat = function (sqlArr, type, join) {
        var _this = this;
        if (type === void 0) { type = '='; }
        if (join === void 0) { join = "AND"; }
        var sqlStr = "";
        switch (typeof sqlArr) {
            case "object":
                sqlStr = Object.keys(sqlArr).map(function (e) { return (e + ' ' + type + ' ' + _this.isString(sqlArr[e])); }).join(' ' + join + ' ') + " ";
                break;
            case "string":
                sqlStr = sqlArr + " ";
                break;
        }
        return sqlStr;
    };
    /**
     *断开连接
     */
    mysql.prototype.end = function () {
        if (this.isEnd) {
            // this.connection.end();
        }
    };
    /**
     *
     * @param sqlStr sql字符串
     * @param showSqlStr 是否输出sql字符串，默认不输出
     */
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
    /**
     *
     * @param TableFieldName 选择的字段名称
     * @param showSqlStr 是否输出sql字符串，默认不输出
     */
    mysql.prototype.select = function (TableFieldName, showSqlStr) {
        if (TableFieldName === void 0) { TableFieldName = "*"; }
        if (showSqlStr) {
            this.showSqlStrBool = showSqlStr;
        }
        this.selectSql = "SELECT " + TableFieldName + " ";
        return this;
    };
    /**
     *
     * @param TableName 表名
     * @param showSqlStr  是否输出sql字符串，默认不输出
     */
    mysql.prototype.from = function (TableName, showSqlStr) {
        if (showSqlStr) {
            this.showSqlStrBool = showSqlStr;
        }
        this.selectSql += "FROM " + TableName + " ";
        return this;
    };
    /**
     *
     * @param WhereArr 条件数据
     * @param showSqlStr 是否输出sql字符串，默认不输出
     * @param type 类型，默认=，精准匹配
     */
    mysql.prototype.where = function (WhereArr, showSqlStr, type) {
        if (type === void 0) { type = '='; }
        if (showSqlStr) {
            this.showSqlStrBool = showSqlStr;
        }
        switch (typeof WhereArr) {
            case "object":
                this.selectSql += "WHERE " + this.sqlFormat(WhereArr, type) + " ";
                break;
            case "string":
                this.selectSql += "WHERE " + this.sqlFormat(WhereArr, type) + " ";
                break;
        }
        return this;
    };
    /**
     *
     * @param TabelName 表名
     * @param ArrData 需要写入的数据
     * @param showSqlStr 是否输出sql字符串，默认不输出
     * @param insertMore 是否插入多条数据
     * @param indexMore  当前多条索引
     * @param indexMaxMore 总条数
     */
    mysql.prototype.insert = function (TabelName, ArrData, insertMore, showSqlStr, indexMore, indexMaxMore) {
        var _this = this;
        if (ArrData === void 0) { ArrData = []; }
        if (showSqlStr) {
            this.showSqlStrBool = showSqlStr;
        }
        var MoreStr = "";
        if (insertMore) {
            MoreStr = ",";
            if (indexMaxMore == indexMore + 1) {
                MoreStr = "";
            }
        }
        else {
            this.selectSql = "INSERT INTO " + TabelName + " ";
        }
        ;
        switch (Object.prototype.toString.call(ArrData)) {
            case "[object Array]":
                //多条数据
                if (ArrData.map(function (e) { return typeof e; }).some(function (e) { return e == 'object'; })) {
                    ArrData.forEach(function (e, index) { return _this.insert(null, e, false, true, index, ArrData.length); });
                }
                else {
                    var keyNames_1 = "VALUES ";
                    if (insertMore && indexMore > 0) {
                        keyNames_1 = "";
                    }
                    ;
                    this.selectSql += keyNames_1 + " (" + ArrData.map(function (e) { return _this.isString(e); }).join(",") + ") " + MoreStr;
                }
                break;
            case "[object Object]":
                var keyNames = "(" + Object.keys(ArrData).join(",") + ") VALUES ";
                if (insertMore && indexMore > 0) {
                    keyNames = "";
                }
                ;
                this.selectSql += keyNames + " (" + Object.keys(ArrData).map(function (e) { return _this.isString(ArrData[e]); }).join(",") + ") " + MoreStr;
                break;
            default:
                this.selectSql += ArrData + " ";
                break;
        }
        return this;
    };
    /**
     *
     * @param showSqlStr 是否输出sql字符串，默认不输出
     */
    mysql.prototype["delete"] = function (showSqlStr) {
        if (showSqlStr) {
            this.showSqlStrBool = showSqlStr;
        }
        this.selectSql = "DELETE ";
        return this;
    };
    /**
     *
     * @param TabelName 表名
     * @param newData 新数据
     * @param showSqlStr  是否输出sql字符串，默认不输出
     */
    mysql.prototype.update = function (TabelName, newData, showSqlStr) {
        if (showSqlStr) {
            this.showSqlStrBool = showSqlStr;
        }
        this.selectSql = "UPDATE " + TabelName + " SET ";
        if (newData) {
            this.selectSql += this.sqlFormat(newData);
        }
        return this;
    };
    /**
     *
     * @param FieldName 需要排序的字段名
     * @param desc 倒叙或正序
     * @param showSqlStr 是否输出sql字符串，默认不输出
     */
    mysql.prototype.asc = function (FieldName, desc, showSqlStr) {
        if (showSqlStr) {
            this.showSqlStrBool = showSqlStr;
        }
        this.selectSql += "order by " + FieldName + " " + ((desc) ? 'desc' : 'asc') + " ";
        return this;
    };
    /**
     *
     * @param FieldName 字段名称
     * @param index 需要处理的数量
     * @param desc 倒叙或正序
     * @param showSqlStr 是否输出sql字符串，默认不输出
     */
    mysql.prototype.limit = function (FieldName, index, desc, showSqlStr) {
        if (index === void 0) { index = 1; }
        if (showSqlStr) {
            this.showSqlStrBool = showSqlStr;
        }
        this.asc(FieldName, desc);
        this.selectSql += " limit " + index + " ";
        return this;
    };
    /**
     *
     * @param WhereArr 模糊查询条件数据
     * @param showSqlStr 是否输出sql字符串，默认不输出
     */
    mysql.prototype.like = function (WhereArr, showSqlStr) {
        if (showSqlStr) {
            this.showSqlStrBool = showSqlStr;
        }
        this.where(WhereArr, showSqlStr, "LIKE");
        return this;
    };
    /**
     *
     * @param data 需要链表的数据
     * @param showSqlStr 是否输出sql字符串，默认不输出
     */
    mysql.prototype.join = function (data, showSqlStr) {
        if (showSqlStr) {
            this.showSqlStrBool = showSqlStr;
        }
        switch (typeof data) {
            case "object":
                this.selectSql += Object.keys(data).map(function (keyName) { return "LEFT JOIN " + keyName + " ON " + data[keyName] + " "; }).join("");
                break;
            case "string":
                this.selectSql += data;
                break;
        }
        return this;
    };
    return mysql;
}());
exports["default"] = mysql;
