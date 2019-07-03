import "../typeStript"
const fs = require("fs");
const path = require('path');
module.exports =  (request,response)=>{
    [
        "./send.js",
        "./bodyData.js",
    ].forEach(filePath=>{
        fs.watch(filePath, (eventType, filename) => {
            require.cache[path.resolve(__dirname,"send.js")] = null;
            require.cache[path.resolve(__dirname,"bodyData.js")] = null;
        });
    });
    response.writeHead(200, {
        'Content-Type': 'text/json; charset=utf-8',
    });
    new Promise((resolve, reject) => {
        require('./send')(request,response).then(res=>{
            resolve(res);
        }).catch(err=>{
            resolve(err);
        });
    }).then(res=>{
        response.end(JSON.stringify(res));
    })
};
