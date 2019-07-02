"use strict";
exports.__esModule = true;
var mysql_1 = require("./UnityFrontUtils/mysql");
//"SELECT * FROM aa a LEFT JOIN bb b ON a.id = b.a2 LEFT JOIN cc c ON b.id = c.a2 WHERE a.id = 23 and b.id = c.a2"
new mysql_1["default"]().select().from('aa a').join({
    'bb b': "a.id = b.a2",
    'cc c': "b.id = c.a2"
})
    .query(null, true).then(function (res) {
    console.log(res);
});
