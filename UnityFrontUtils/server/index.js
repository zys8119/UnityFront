"use strict";
exports.__esModule = true;
require("../typeStript");
var http = require("http");
http.createServer(function (request, response) {
    response.writeHead(200, { 'Content-Type': 'text/json' });
    response.end("服务已启动");
}).listen(8888);
console.log('Server running at http://127.0.0.1:8888/');
