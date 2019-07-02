"use strict";
exports.__esModule = true;
var mysql_1 = require("./UnityFrontUtils/mysql");
new mysql_1["default"]()
    // .select("id,name").from("aa").where({name:"2"},true)
    .insert('aa', { id: 7, name: "asd" }, true)
    .query().then(function (res) {
    console.log(res);
});
