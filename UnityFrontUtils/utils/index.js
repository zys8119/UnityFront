"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../typeStript");
var path = require('path');
var fs = require("fs");
exports.default = {
    /**
     * 获取目录所有文件
     * @param fileDirPath
     * @param callback
     */
    getJsonFiles: function (fileDirPath, callback) {
        var jsonFiles = [];
        function findJsonFile(filePath) {
            var files = fs.readdirSync(filePath);
            files.forEach(function (item, index) {
                try {
                    var fPath = path.join(filePath, item);
                    var stat = fs.statSync(fPath);
                    if (stat.isDirectory() === true) {
                        findJsonFile(fPath);
                    }
                    if (stat.isFile() === true) {
                        if (callback) {
                            callback(fPath);
                        }
                        ;
                        jsonFiles.push(fPath);
                    }
                }
                catch (e) { }
            });
        }
        findJsonFile(fileDirPath);
        return jsonFiles;
    },
    /**
     * 替换模板url变量
     * @param ServerConfig
     * @param data
     */
    replaceUrlVars: function (ServerConfig, data) {
        if (ServerConfig.Template.urlVars && typeof ServerConfig.Template.urlVars == "object") {
            for (var v in ServerConfig.Template.urlVars) {
                data = data.replace(new RegExp(v, "g"), ServerConfig.Template.urlVars[v]);
            }
        }
        return data;
    }
};
