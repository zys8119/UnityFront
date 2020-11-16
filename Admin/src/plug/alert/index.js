"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.install = void 0;
/* eslint-disable */
// @ts-ignore
var ZXDialogAlert_vue_1 = require("./ZXDialogAlert.vue");
var ZAlertFooter_vue_1 = require("./ZAlertFooter.vue");
var plugin = {
    install: function (vue) {
        vue.component("ZAlertFooter", ZAlertFooter_vue_1.default);
        var $ZXDialogAlert = {
            show: function (opts) {
                var $vm;
                var Toast = vue.extend(ZXDialogAlert_vue_1.default);
                if (!$vm) {
                    $vm = new Toast({
                        el: document.createElement('div')
                    });
                    document.body.appendChild($vm.$el);
                }
                vue.prototype.$ZAlert.vm[vue.prototype.$ZAlert.index] = $vm;
                vue.prototype.$ZAlert.index += 1;
                $vm.show = false;
                $vm.showBox = false;
                opts = Object.assign({}, opts);
                opts.props = opts.props || {};
                opts._event = opts._event || {};
                opts.content = opts.content || null;
                opts.components = opts.components || null;
                var FilterField = {
                    onShow: true,
                    onHide: true,
                    onOpened: true,
                    onClosed: true,
                    _event: true,
                };
                for (var i in opts) {
                    if (FilterField[i]) {
                        if (typeof opts[i] === "function") {
                            $vm[i] = (function (key, callback) {
                                return function () {
                                    callback.call(this);
                                    opts[key].call(this);
                                };
                            })(i, $vm[i]);
                        }
                        else {
                            $vm[i] = opts[i];
                        }
                    }
                    else {
                        $vm.$props[i] = opts[i];
                    }
                }
                $vm.show = true;
                $vm.showBox = true;
                return vue.prototype.$ZAlert.index - 1;
            },
            alert: function (opts) {
                opts = opts || {};
                this.show(Object.assign({
                    layout: "right",
                    width: "90%"
                }, opts));
            },
            hide: function () {
                if (vue.prototype.$ZAlert.index <= 0) {
                    return;
                }
                vue.prototype.$ZAlert.index -= 1;
                var $vm = vue.prototype.$ZAlert.vm[vue.prototype.$ZAlert.index];
                if ($vm) {
                    $vm.show = false;
                    $vm.showBox = false;
                }
                return new Promise(function (resolve) {
                    $vm.$nextTick(function () {
                        resolve();
                    });
                });
            },
            hideAll: function () {
                var $vmAll = vue.prototype.$ZAlert.vm;
                for (var k in $vmAll) {
                    var $vm = $vmAll[k];
                    if ($vm) {
                        $vm.show = false;
                        $vm.showBox = false;
                    }
                }
            },
            vm: {},
            index: 0,
        };
        if (!vue.prototype.$ZAlert) {
            vue.prototype.$ZAlert = $ZXDialogAlert;
        }
    }
};
exports.default = plugin;
exports.install = plugin.install;
