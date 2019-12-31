"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Interceptor = /** @class */ (function () {
    function Interceptor() {
        // return true;
    }
    Interceptor.prototype.$_success = function (msg, sendData, code) {
    };
    Interceptor.prototype.$_error = function (msg, sendData, code) {
    };
    /**
     * Interceptor 全局拦截器注入
     * @constructor
     * @return { Promise } then 执行 、 catch 终止
     */
    Interceptor.prototype.Interceptor = function () {
        return Promise.resolve();
    };
    return Interceptor;
}());
;
exports.default = Interceptor;
