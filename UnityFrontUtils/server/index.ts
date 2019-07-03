import "../typeStript"
import { ServerConfig } from "../config"
const http = require("http");
const app = require('./app');
//创建服务
http.createServer(app).listen({
    host: ServerConfig.host,
    port: ServerConfig.port,
});
console.log(`Server running at http://${ServerConfig.host || "localhost"}:${ServerConfig.port}/`);

