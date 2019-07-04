import "../typeStript"
import getFormData from "../lib/formData"
var qs = require('querystring');
/**
 * @获取body数据
 */
export default class bodyData {
    constructor(request,response,callback?:Function){
        let postData = "";
        request.on('data', data => {
            postData += data;
        });
        request.on('end', ()=>{
            if(request.headers["content-type"].indexOf("multipart/form-data;") > -1){
                //获取multipart/form-data;数据
                try {callback(new getFormData(postData));}catch (err) {callback({})};
                return;
            }else if(request.headers["content-type"].indexOf("application/x-www-form-urlencoded") > -1){
                //获取application/x-www-form-urlencoded数据
                try {callback(qs.parse(postData));}catch (err) {callback({})};
                return;
            }else if(request.headers["content-type"].indexOf("text/plain") > -1){
                //获取text/plain数据
                try {callback(postData);}catch (err) {callback({})};
                return;
            }else if(request.headers["content-type"].indexOf("application/json") > -1){
                //获取application/json数据
                try {callback(JSON.parse(postData));}catch (err) {callback({})};
                return;
            }else {
                //其他数据，可扩展
                try {callback(postData);}catch (err) {callback({})};
                return;
            }
            //获取其他格式数据
            callback(postData);
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
