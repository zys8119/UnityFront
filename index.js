"use strict";
exports.__esModule = true;
var mysql_1 = require("./UnityFrontUtils/mysql");
new mysql_1["default"]()
    .select("id,name")
    .from('aa').where({
    id: 1,
    name: 2
})
    .query()
    .then(function (res) {
    console.log(res);
});
