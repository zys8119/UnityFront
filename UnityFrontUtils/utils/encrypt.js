"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var encrypt = /** @class */ (function () {
    function encrypt(newKey) {
        this.key = newKey || "0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
    }
    encrypt.prototype.encodeItem = function (id) {
        var chars = this.key;
        var resutl = '';
        for (var i = 0; i < 6; i++) {
            var chr = id % 62;
            resutl = chars[(i * 3 + parseInt(chr)) % 62] + resutl;
            id = id / 62;
        }
        return resutl;
    };
    encrypt.prototype.decodeItem = function (str) {
        var chars = this.key;
        var pow = [1, 62, 3844, 238328, 14776336, 916132832];
        var resutl = '';
        for (var i = 0; i < 6; i++) {
            var num = (62 + chars.indexOf(str[i]) - (5 - i) * 3) % 62;
            resutl = (+resutl) + num * pow[5 - i];
        }
        return resutl;
    };
    encrypt.prototype.encode = function (data) {
        var _this = this;
        return JSON.stringify(data).split("").map(function (e) { return _this.encodeItem((function (code) {
            if (code < 1000) {
                return code + 100000;
            }
            ;
            return code;
        })(e.charCodeAt(0))); }).join("");
    };
    encrypt.prototype.decode = function (str) {
        var _this = this;
        return JSON.parse(String.fromCharCode.apply(null, str.match(/\w{6}/img).map(function (e) { return _this.decodeItem(e) - 100000; })));
    };
    return encrypt;
}());
exports.default = encrypt;
