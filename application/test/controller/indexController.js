"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var applicationController_1 = require("../../../UnityFrontUtils/controller/applicationController");
var axios_1 = require("axios");
var http = require("http");
var querystring = require('querystring');
var IndexController = /** @class */ (function (_super) {
    __extends(IndexController, _super);
    function IndexController() {
        return _super.call(this) || this;
    }
    IndexController.prototype.index = function () {
        var _this = this;
        console.log("=================================", Date.now());
        axios_1.default({
            url: "http://apis.juhe.cn/cnoil/oil_city",
            params: {
                'key': 'a2e387effbe81dda89d35eb947b15485'
            }
        }).then(function (res) {
            if (res.status >= 200 && res.status < 300 && res.data.resultcode == "200") {
                _this.$_send(res.data);
            }
            else {
                _this.$_send({
                    resultcode: "10101",
                    mrg: "请求失败",
                });
            }
        }).catch(function (err) {
            _this.$_send(err);
        });
    };
    return IndexController;
}(applicationController_1.default));
exports.IndexController = IndexController;
