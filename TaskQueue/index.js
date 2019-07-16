"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TaskQueue = require("./Task/index");
exports.default = Object.keys(TaskQueue).map(function (Task) { return TaskQueue[Task]; }).slice();
//# sourceMappingURL=index.js.map