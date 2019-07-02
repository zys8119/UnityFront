import "../typeStript"
import mysql from "../mysql"
const http = require("http");
const fs = require("fs");
const path = require('path');
const child_process = require('child_process');
// process.on('exit', (code) => {
//     console.log('此处不会运行222');
//     child_process.exec("node",function () {
//         process.kill(process.pid,"SIGINT");
//     })
// });

http.createServer((request, response) =>{
    response.writeHead(200, {
        'Content-Type': 'text/json; charset=utf-8',
    });
    var aa = "12121";
    fs.watch('./index.js', (eventType, filename) => {
        aa = "asda222";
    });
    response.end(aa);
    // new mysql()
    //     .query("SELECT * FROM aa a LEFT JOIN bb b ON a.id = b.a2 LEFT JOIN cc c ON b.id = c.a2 WHERE a.id = 23 and b.id = c.a2",false).then(res=>{
    //     response.end(JSON.stringify(res)+"asd");
    // });
}).listen(3000);
console.log('Server running at http://127.0.0.1:3000/');

