"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Interceptor = /** @class */ (function () {
    function Interceptor() {
    }
    Interceptor.prototype.$_success = function (msg, sendData, code) {
    };
    Interceptor.prototype.$_error = function (msg, sendData, code) {
    };
    Interceptor.prototype.setHeaders = function (Headers) {
    };
    /**
     * Interceptor 全局拦截器注入
     * @constructor
     * @return { Promise } then 执行 、 catch 终止
     */
    Interceptor.prototype.Interceptor = function () {
        this.setHeaders({
            'Content-Type': 'text/json; charset=utf-8',
            'Access-Control-Allow-Origin': "*",
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Headers': '*',
        });
        if (this.$_method === 'OPTIONS') {
            this.$_success();
            return Promise.reject();
        }
        return Promise.resolve();
    };
    return Interceptor;
}());
;
exports.default = Interceptor;
