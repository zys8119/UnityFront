import "../typeStript"
import getFormData from "../lib/formData"
const { parse, URL, URLSearchParams } = require('url');
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
            console.log("====================="+Date.now());
            if(postData.indexOf("Content-Disposition: form-data;") > -1){
                try {callback(new getFormData(postData));}catch (e) {callback(e.message)};
            }
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
