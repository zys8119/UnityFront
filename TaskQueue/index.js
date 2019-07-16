"use strict";
exports.__esModule = true;
var TaskQueue = require("./Task/index");
exports["default"] = Object.keys(TaskQueue).map(function (Task) { return TaskQueue[Task]; }).slice();
