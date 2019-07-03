import "../typeStript"
const { parse, URL, URLSearchParams } = require('url');
var qs = require('querystring');
// export default class bodyData {
//     constructor(request,response,callback?:Function){
//         let bodyDataStr = '';
//         request.on('data', data => {
//             let dataStr =data.toString()
//             if(dataStr.indexOf("form-data;")){
//                 console.log(dataStr.match(/form-data?.*/img),33333)
//             }else {
//                 bodyDataStr += data.toString();
//             }
//         });
//         console.log(bodyDataStr,6666)
//         request.on('end', callback(bodyDataStr));
//     }
// }
module .exports = (request,response,callback?:Function)=>{
    let bodyDataStr = '';
    request.on('data', data => {
        let dataStr =data.toString()
        if(dataStr.indexOf("form-data;")){
            console.log(dataStr.match(/form-data?.*/img),33333)
        }else {
            bodyDataStr += data.toString();
        }
    });
    console.log(bodyDataStr,9)
    request.on('end', callback(bodyDataStr));
}
