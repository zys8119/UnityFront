"use strict";
exports.__esModule = true;
var mysql_1 = require("./UnityFrontUtils/mysql");
new mysql_1["default"]()
    .select("id,name")
    .from('aa').where({ id: 2, name: 2 }, true)
    .query()
    .then(function (res) {
    console.log(res);
});
