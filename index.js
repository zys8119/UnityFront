"use strict";
exports.__esModule = true;
require("./UnityFrontUtils/typeStript");
var mysql = require('mysql');
var pool = mysql.createPool({
    // connectionLimit : 10,
    host: 'localhost',
    user: 'root',
    password: 'admin123',
    port: '3306',
    database: 'test'
});
pool.query('SELECT * from aa', function (error, results, fields) {
    if (error)
        throw error;
    console.log('The solution is: ', results);
});
var pool1 = mysql.createPool({
    host: '192.168.6.23',
    user: 'root',
    password: 'abc123456',
    port: '3306',
    database: 'user_center'
});
pool1.query('SELECT * from auto_brand WHERE id = 2167', function (error, results, fields) {
    if (error)
        throw error;
    console.log('The solution is: ', results);
});
pool1.query('SELECT * from auto_brand WHERE id = 2167', function (error, results, fields) {
    if (error)
        throw error;
    console.log('The solution is: ', results);
});
pool.query('SELECT * from aa', function (error, results, fields) {
    if (error)
        throw error;
    console.log('The solution is: ', results);
});
