const { parse } = require('url');
import bodyData from "./bodyData"
module.exports = (request,response)=>{
    return new Promise((resolve, reject) => {
        //获取body数据
        new bodyData(request,response,body=>{
            resolve({
                body:body,
                rawTrailers:request.rawTrailers,
                headers:request.headers,
                rawHeaders:request.rawHeaders,
                method:request.method,
                url:request.url,
                urlParse:parse(request.url,true),
                query:parse(request.url,true).query
            });
        });
    })
}
