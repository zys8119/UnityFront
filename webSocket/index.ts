import {webSocketApp, webSocketAppData} from "../UnityFrontUtils/typeStript";
import encrypt from "../UnityFrontUtils/utils/encrypt";
const index:webSocketApp = class {
    encryptInit:any;
    constructor(data:webSocketAppData) {
        this.encryptInit = new encrypt();
        try {
            this[data.data?.ws_emit??'init'](data);
        }catch (e) {
            console.error(new Error(`【ws_emit】${data.data?.emit??'init'} is not a function`))
        }

    }
    init({toSocket,data,requestData}:webSocketAppData){
        toSocket.socket.write(this.encryptInit.encodeWsFrame({
            payloadData: typeof data === 'object' ? JSON.stringify(requestData.payloadData.toString()):data
        }))
    }
};
export default index;
