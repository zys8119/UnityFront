"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../typeStript");
var fs = require("fs");
var config_1 = require("../config");
var utils_1 = require("../utils");
var fsWatch = /** @class */ (function () {
    function fsWatch() {
        config_1.ServerConfig.fsWatch.forEach(function (filePath) {
            var options = {
                recursive: false
            };
            switch (filePath.type) {
                case "directory":
                    options.recursive = true;
                    break;
                case "file":
                    break;
            }
            fs.watch(filePath.path, options, function (eventType, filename) {
                config_1.ServerConfig.fsWatch.forEach(function (filePath) {
                    if (filePath.type == "file") {
                        delete require.cache[filePath.path];
                        return;
                    }
                    utils_1.default.getJsonFiles(filePath.path, function (DirFilePath) {
                        if (fs.existsSync(DirFilePath)) {
                            delete require.cache[DirFilePath];
                        }
                    });
                });
            });
        });
    }
    return fsWatch;
}());
exports.default = fsWatch;
