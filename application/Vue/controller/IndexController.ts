import applicationController from "../../../UnityFrontUtils/controller/applicationController";
import {ServerConfig} from "../../../UnityFrontUtils/config";
import encrypt from "../../../UnityFrontUtils/utils/encrypt";
export class IndexController extends applicationController {
    encryptInit:any;
    constructor() {
        super();
        this.encryptInit = new encrypt();
    }

    index(){
        this.Render({
            q:JSON.stringify(this.$_query)
        })
    }

    bb(){
        try {
            let socket = Object.keys(ServerConfig.ws_user).map(e=>ServerConfig.ws_user[e]).filter(e=>e.data.emit === '111')[0];
                socket.socket.write(this.encryptInit.encodeWsFrame({
                payloadData: JSON.stringify(this.$_query)
            }));
        }catch (e) {

        }
        this.$_success()
    }
}