"use strict";
exports.__esModule = true;
require("../typeStript");
var http = require("http");
var app = require('./app');
http.createServer(app).listen(3000);
console.log('Server running at http://127.0.0.1:3000/');
