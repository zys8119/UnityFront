import "../typeStript"
const http = require("http");
const app = require('./app');
http.createServer(app).listen(3000);
console.log('Server running at http://127.0.0.1:3000/');

