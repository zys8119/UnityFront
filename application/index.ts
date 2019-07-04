import { ControllerInitDataOptions } from "../UnityFrontUtils/typeStript"
import { headersType } from "../UnityFrontUtils/typeStript/Types";
export default class applicationController implements ControllerInitDataOptions {
    $_body?:any;
    $_rawTrailers:[];
    $_headers:headersType;
    $_rawHeaders:object;
    $_method:string;
    $_url:string;//url
    $_urlParse:object;
    $_query:object;//query数据
    $_send?(sendData:any):any;
}
