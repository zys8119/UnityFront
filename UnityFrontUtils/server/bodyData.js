"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../typeStript");
var formData_1 = require("../lib/formData");
var qs = require('querystring');
/**
 * @获取body数据
 */
var bodyData = /** @class */ (function () {
    function bodyData(request, response, callback) {
        var postData = "";
        request.on('data', function (data) {
            postData += data;
        });
        request.on('end', function () {
            if (request.headers["content-type"]) {
                if (postData.indexOf("Content-Disposition: form-data") > -1) {
                    //获取multipart/form-data;数据
                    try {
                        callback(new formData_1.default(postData));
                    }
                    catch (err) {
                        callback({});
                    }
                    ;
                    return;
                }
                else if (request.headers["content-type"].indexOf("multipart/form-data;") > -1) {
                    //获取multipart/form-data;数据
                    try {
                        callback(new formData_1.default(postData));
                    }
                    catch (err) {
                        callback({});
                    }
                    ;
                    return;
                }
                else if (request.headers["content-type"].indexOf("application/x-www-form-urlencoded") > -1) {
                    //获取application/x-www-form-urlencoded数据
                    try {
                        callback(qs.parse(postData));
                    }
                    catch (err) {
                        callback({});
                    }
                    ;
                    return;
                }
                else if (request.headers["content-type"].indexOf("text/plain") > -1) {
                    //获取text/plain数据
                    try {
                        callback(postData);
                    }
                    catch (err) {
                        callback({});
                    }
                    ;
                    return;
                }
                else if (request.headers["content-type"].indexOf("application/json") > -1) {
                    //获取application/json数据
                    try {
                        callback(JSON.parse(postData));
                    }
                    catch (err) {
                        callback({});
                    }
                    ;
                    return;
                }
                else {
                    //其他数据，可扩展
                    try {
                        callback(postData);
                    }
                    catch (err) {
                        callback({});
                    }
                    ;
                    return;
                }
            }
            //获取其他格式数据
            callback(postData);
        });
        request.on('error', function (err) {
            if (err) {
                response.writeHead(500, { 'Content-Type': 'text/html' });
                response.write('An error occurred');
                response.end();
            }
        });
    }
    return bodyData;
}());
exports.default = bodyData;
