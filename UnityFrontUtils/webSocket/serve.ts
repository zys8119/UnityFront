import "../typeStript/declares"
import encrypt from "../utils/encrypt"
import { ServerConfig } from "../config"
import webSocketApp from "../../webSocket"
// 引入net模块
const net = require('net')
const crypto = require('crypto')
const ncol = require('ncol')
export default class webSocket {
    server:any;
    encryptInit:any;
    constructor() {
        this.encryptInit = new encrypt();
        // 使用net模块创建服务器，返回的是一个原始的socket对象，与Socket.io的socket对象不同。
        this.server = net.createServer((socket) => {
            socket.once('data', (buffer) => {
                this.onceData(socket, buffer);
            })
        });
        this.server.listen({
            host: ServerConfig.host,
            port: ServerConfig.ws_port,
        });
        ncol.color(function (){
            ncol.infoBG("\n【WS】").successBG(" protocol is running, the port is ").infoBG(`(${ServerConfig.ws_port})`).log("\n")
        })
    }

    onceData(socket, buffer){
        // 接收到HTTP请求头数据
        const str = buffer.toString()
        // console.log(str)
        // 4. 将请求头数据转为对象
        const headers = this.encryptInit.parseHeader(str)
        // console.log(headers)

        // 5. 判断请求是否为WebSocket连接
        if (headers['upgrade'] !== 'websocket') {
            // 若当前请求不是WebSocket连接，则关闭连接
            ncol.error('非WebSocket连接')
            socket.end()
        } else if (headers['sec-websocket-version'] !== '13') {
            // 判断WebSocket版本是否为13，防止是其他版本，造成兼容错误
            ncol.error('WebSocket版本错误')
            socket.end()
        } else {
            // 6. 校验Sec-WebSocket-Key，完成连接
            /*
              协议中规定的校验用GUID，可参考如下链接：
              https://tools.ietf.org/html/rfc6455#section-5.5.2
              https://stackoverflow.com/questions/13456017/what-does-258eafa5-e914-47da-95ca-c5ab0dc85b11-means-in-websocket-protocol
            */
            const GUID = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11'
            const key = headers['sec-websocket-key'];
            const hash = crypto.createHash('sha1')  // 创建一个签名算法为sha1的哈希对象
            ServerConfig.ws_user[key] = {
                socket:socket,
                key
            };
            hash.update(`${key}${GUID}`)  // 将key和GUID连接后，更新到hash
            const result = hash.digest('base64') // 生成base64字符串
            const header = `HTTP/1.1 101 Switching Protocols\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-Websocket-Accept: ${result}\r\n\r\n` // 生成供前端校验用的请求头

            socket.write(header)  // 返回HTTP头，告知客户端校验结果，HTTP状态码101表示切换协议：https://httpstatuses.com/101。
            // 若客户端校验结果正确，在控制台的Network模块可以看到HTTP请求的状态码变为101 Switching Protocols，同时客户端的ws.onopen事件被触发。
            // console.log(header)

            // 处理聊天数据
            // 7. 建立连接后，通过data事件接收客户端的数据并处理
            socket.on('data', (buffer) => {
                try {
                    let currentSocket = ServerConfig.ws_user[key];
                    const data = this.encryptInit.decodeWsFrame(buffer)
                    // opcode为8，表示客户端发起了断开连接
                    if (data.opcode === 8) {
                        ncol.error(`用户：${currentSocket.uid},客户端：${key}退出登录`);
                        delete ServerConfig.ws_user[key];
                        socket.end()  // 与客户端断开连接
                    } else {
                        let dataObj = null;
                        let payloadDataStr = data.payloadData.toString();
                        try {
                            dataObj = JSON.parse(payloadDataStr)
                        }catch (e) {
                            dataObj = payloadDataStr
                        }
                        // 接收到客户端数据时的处理，此处默认为返回接收到的数据。
                        ServerConfig.ws_user[key].data = dataObj;
                        let toSocket = null;
                        if(dataObj.type === "login"){
                            // 用户第一次登录
                            toSocket = ServerConfig.ws_user[key];
                            if (!dataObj.uid){
                                ncol.error(`用户未登录,客户端：【${key}】`)
                                dataObj = {
                                    type:"login",
                                    code:110,
                                    message:"用户未登录",
                                }
                                data.payloadData = Buffer.from(JSON.stringify(dataObj))
                                new webSocketApp({
                                    toSocket:toSocket,
                                    socket:toSocket.socket,
                                    write:toSocket.socket.write,
                                    data:dataObj,
                                    requestData:data,
                                    headers:headers,
                                });
                                delete ServerConfig.ws_user[key];
                                socket.end(); // 与客户端断开连接
                                return;
                            }
                            ServerConfig.ws_user[key].uid = dataObj.uid;
                            dataObj = {
                                ...dataObj,
                                type:"login",
                                code:200,
                                message:"登录成功",
                                uid:dataObj.uid
                            }
                            ncol.success(`用户：【${dataObj.uid}】登录成功,客户端：【${key}】`)
                            ServerConfig.ws_user[key].data = dataObj;
                            data.payloadData = Buffer.from(JSON.stringify(dataObj))
                            new webSocketApp({
                                toSocket:toSocket,
                                socket:toSocket.socket,
                                write:toSocket.socket.write,
                                data:dataObj,
                                requestData:data,
                                headers:headers,
                            });
                            return;
                        }
                        if(!currentSocket){
                            ncol.error(`非法操作或用户不存在`);
                            return;
                        }
                        for (let u in ServerConfig.ws_user){
                            const keyValue = ServerConfig.ws_user[u];
                            const condition = keyValue && keyValue.uid && keyValue.socket && dataObj && dataObj.to && keyValue.uid === dataObj.to;
                            if(condition){
                                toSocket = keyValue;
                            }
                        }
                        if(toSocket){
                            ncol.success(`用户：【${currentSocket.uid}】=>【${toSocket.uid}】====客户端：【${key}】=>【${toSocket.key}】===发送数据：${JSON.stringify(dataObj)}`);
                            new webSocketApp({
                                toSocket:toSocket,
                                socket:toSocket.socket,
                                write:toSocket.socket.write,
                                data:dataObj,
                                requestData:data,
                                headers:headers,
                            });
                        }else{
                            ncol.success(`用户：【${currentSocket.uid}】====客户端：【${key}】===发送数据：${JSON.stringify(dataObj)}`);
                            for (let u in ServerConfig.ws_user ){
                                if (u !== key){
                                    let toSocketItem = ServerConfig.ws_user[u];
                                    new webSocketApp({
                                        toSocket:toSocketItem,
                                        socket:toSocketItem.socket,
                                        write:toSocketItem.socket.write,
                                        data:dataObj,
                                        requestData:data,
                                        headers:headers,
                                    });
                                }
                            }
                        }
                    }
                }catch (e){
                    // 防止错误中断服务
                }
            })
        }
    }
}