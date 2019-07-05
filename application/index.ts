import { ControllerInitDataOptions } from "../UnityFrontUtils/typeStript"
import { headersType } from "../UnityFrontUtils/typeStript/Types";
export default class applicationController implements ControllerInitDataOptions {
    $_body?:any;
    $_rawTrailers:[];
    $_headers:headersType;
    $_rawHeaders:object;
    $_method:string;
    $_url:string;
    $_urlParse:object;
    $_query:object;
    $_send?(sendData:any):any;
    $_RequestStatus:number;
    $_RequestHeaders:headersType;

    /**
     * 设置header头
     * @param Headers
     */
    setHeaders(Headers:headersType = {}){
        this.$_RequestHeaders = Headers;
    }

    setRequestStatus(Status:number){
        this.$_RequestStatus = Status;
    }
}
