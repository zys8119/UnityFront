"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var applicationController_1 = require("./applicationController");
var main = /** @class */ (function (_super) {
    __extends(main, _super);
    function main() {
        return _super.call(this) || this;
    }
    main.prototype.index = function () {
        //控制器url路由解析
        this.UrlParse();
    };
    return main;
}(applicationController_1.default));
exports.main = main;
