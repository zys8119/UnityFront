"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var encrypt_1 = require("../UnityFrontUtils/utils/encrypt");
var index = /** @class */ (function () {
    function class_1(data) {
        var _a, _b, _c, _d;
        this.encryptInit = new encrypt_1.default();
        try {
            this[(_b = (_a = data.data) === null || _a === void 0 ? void 0 : _a.ws_emit) !== null && _b !== void 0 ? _b : 'init'](data);
        }
        catch (e) {
            console.error(new Error("\u3010ws_emit\u3011" + ((_d = (_c = data.data) === null || _c === void 0 ? void 0 : _c.emit) !== null && _d !== void 0 ? _d : 'init') + " is not a function"));
        }
    }
    class_1.prototype.init = function (_a) {
        var toSocket = _a.toSocket, data = _a.data, requestData = _a.requestData;
        toSocket.socket.write(this.encryptInit.encodeWsFrame({
            payloadData: typeof data === 'object' ? JSON.stringify(requestData.payloadData.toString()) : data
        }));
    };
    return class_1;
}());
exports.default = index;
