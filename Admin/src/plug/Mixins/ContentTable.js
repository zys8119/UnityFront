"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
var ComponentsConfig_1 = require("../../../src/data/ComponentsConfig");
exports.default = {
    data: function () {
        return {
            ContentTableData: [],
            currentPagination_pageNo: 1,
            currentPaginationTotal: 0,
        };
    },
    methods: {
        _ContentTable_pagination_currentPaginationChange: function (pageNo) {
            if ((this.url || this.apiPath) && this.$refs.contentTable_el_table) {
                this.currentPagination_pageNo = pageNo;
                this._ContentTable_pagination_getTableData(pageNo);
            }
            else {
                if (this.data && this.$refs.contentTable_el_table) {
                    this.$emit("pageChange", __assign(__assign({}, this._currentPagination), { pageNo: pageNo }));
                }
            }
        },
        _ContentTable_pagination_getTableData_Axios: function (data) {
            if (this.apiPath) {
                var apiResult = null;
                if (typeof this.apiPath === 'function') {
                    apiResult = this.apiPath(data);
                }
                else {
                    eval("apiResult = this.api." + this.apiPath + "(" + JSON.stringify(data) + ")");
                }
                return apiResult;
            }
            return this.api.otherApi.ContentTable(this.url, data);
        },
        _ContentTable_pagination_getTableData: function (pageNo) {
            var _this = this;
            this._ContentTable_pagination_getTableData_Axios(__assign({ pageSize: this._currentPagination.pageSize, pageNo: this.currentPagination_pageNo, no_page: !!this._currentPagination.noPage }, this.params)).then(function (res) {
                var _a;
                _this.$emit("pageChange", __assign({ pageNo: _this.currentPagination_pageNo }, _this._currentPagination));
                _this.currentPaginationTotal = res.data.total;
                _this.currentPagination_pageNo = pageNo;
                if (_this._currentPagination.noPage || ((_a = _this.params) === null || _a === void 0 ? void 0 : _a.no_page)) {
                    _this.ContentTableData = res.data;
                    return;
                }
                _this.ContentTableData = res.data.list;
            });
        },
        /**
         * 初始化表格 true：不重置 false：重置
         * @param bool
         */
        init: function (bool) {
            var _this = this;
            this.init_currentPagination_pageNo(bool).then(function () {
                _this.currentPaginationTotal = 0;
                _this.ContentTableData = [];
                _this._ContentTable_pagination_currentPaginationChange(_this.currentPagination_pageNo);
                if (_this.data && !((_this.url || _this.apiPath) && _this.$refs.contentTable_el_table)) {
                    _this.ContentTableData = _this.data;
                    _this.currentPaginationTotal = _this._currentPagination.total;
                }
            });
        },
        init_currentPagination_pageNo: function (bool) {
            var _this = this;
            return new Promise(function (resolve) {
                _this.$nextTick(function () {
                    var _this = this;
                    var currentPagination_pageNo = this.currentPagination_pageNo;
                    if (bool) {
                        this.currentPagination_pageNo = 1;
                        this.$nextTick(function () {
                            _this.currentPagination_pageNo = currentPagination_pageNo;
                            resolve();
                        });
                    }
                    else {
                        this.currentPagination_pageNo = 1;
                        resolve();
                    }
                });
            });
        }
    },
    watch: {
        data: function () {
            this.ContentTableData = this.data;
        },
        ContentTableData: function () {
            this.$emit("dataChange", this.ContentTableData, this.currentPaginationTotal);
        }
    },
    computed: {
        _currentPagination: function () {
            try {
                return Object.assign(JSON.parse(JSON.stringify(ComponentsConfig_1.pageConfig)), JSON.parse(JSON.stringify(this.pageConfig)));
            }
            catch (e) {
                return {};
            }
        }
    },
};
