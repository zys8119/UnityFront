import mysql from "../mysql"
const { parse, URL, URLSearchParams } = require('url');
const bodyData = require('./bodyData');
module.exports = (request,response)=>{
    return new Promise((resolve, reject) => {
        bodyData(request,response,body=>{
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
        // new mysql().select().from("aa")
        //     .query()
        //     .then(data=>{
        //         resolve(data);
        //     }).catch(err=>{
        //         reject(err);
        //     })
    })
}
