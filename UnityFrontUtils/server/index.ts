import "../typeStript"
let http = require("http");
http.createServer((request, response) =>{
    response.writeHead(200, {'Content-Type': 'text/json'});
    response.end("服务已启动");
}).listen(8888);
console.log('Server running at http://127.0.0.1:8888/');

