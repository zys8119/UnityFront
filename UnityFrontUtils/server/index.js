"use strict";
exports.__esModule = true;
require("../typeStript");
var mysql_1 = require("../mysql");
var http = require("http");
http.createServer(function (request, response) {
    response.writeHead(200, {
        'Content-Type': 'text/json; charset=utf-8'
    });
    new mysql_1["default"]()
        .query("SELECT * FROM aa a LEFT JOIN bb b ON a.id = b.a2 LEFT JOIN cc c ON b.id = c.a2 WHERE a.id = 23 and b.id = c.a2", false).then(function (res) {
        response.end(JSON.stringify(res) + "asd");
    });
}).listen(8888);
console.log('Server running at http://127.0.0.1:8888/');
