import "../typeStript"
const { parse, URL, URLSearchParams } = require('url');
var qs = require('querystring');
/**
 * @获取body数据
 */
export default class bodyData {
    constructor(request,response,callback?:Function){
        let bodyDataStr = '';
        request.on('data', data => {
            let dataStr =data.toString()
            if(dataStr.indexOf("form-data;")){
                bodyDataStr = dataStr.match(/form-data?.*/img);
            }else {
                bodyDataStr += data.toString();
            }
        });
        request.on('end', ()=>{
            callback(bodyDataStr);
        });
    }
}
