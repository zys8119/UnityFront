import "../typeStript"
import getFormData from "../lib/formData"
var qs = require('querystring');
/**
 * @获取body数据
 */
export default class bodyData {
    constructor(request,response,callback?:Function){
        let postData = "";
        let requestDataSource = [];
        request.on('data', data => {
            postData += data;
            requestDataSource.push(data);
        });
        request.on('end', ()=>{
            let bodySource = Buffer.concat(requestDataSource);
            if(request.headers["content-type"]){
                if(postData.indexOf("Content-Disposition: form-data") > -1){
                    //获取multipart/form-data;数据
                    try {callback(new getFormData(postData),bodySource);}catch (err) {callback({},bodySource)};
                    return;
                }else
                if(request.headers["content-type"].indexOf("multipart/form-data;") > -1){
                    //获取multipart/form-data;数据
                    try {callback(new getFormData(postData),bodySource);}catch (err) {callback({},bodySource)};
                    return;
                }else if(request.headers["content-type"].indexOf("application/x-www-form-urlencoded") > -1){
                    //获取application/x-www-form-urlencoded数据
                    try {callback(qs.parse(postData),bodySource);}catch (err) {callback({},bodySource)};
                    return;
                }else if(request.headers["content-type"].indexOf("text/plain") > -1){
                    //获取text/plain数据
                    try {callback(postData,bodySource);}catch (err) {callback({},bodySource)};
                    return;
                }else if(request.headers["content-type"].indexOf("application/json") > -1){
                    //获取application/json数据
                    try {callback(JSON.parse(postData),bodySource);}catch (err) {callback({},bodySource)};
                    return;
                }else {
                    //其他数据，可扩展
                    try {callback(postData,bodySource);}catch (err) {callback({},bodySource)};
                    return;
                }
            }
            //获取其他格式数据
            callback(postData, bodySource);
        });
        request.on('error', (err) => {
            if(err) {
                response.writeHead(500, {'Content-Type': 'text/html'});
                response.write('An error occurred');
                response.end();
            }
        });
    }
}
