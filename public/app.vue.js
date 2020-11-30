"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: "app",
    data: function () {
        return {
            a: 1111111111111111111,
            bb: "----------"
        };
    },
    mounted: function () {
        this.aa(function () {
            console.log(566645454545);
        });
    },
    methods: {
        aa: function (bb) {
            bb();
        }
    }
};
