import axios from "./axios"
import alert from "./alert"
// import api from "@/api"
// import $utils from "./utils"
const plugin = {
    install(vue){
        vue.prototype.axios = new axios();
        // vue.prototype.api = new api();
        // vue.prototype.$utils = $utils;
        vue.use(alert);
    }
}
export default plugin
export const install = plugin.install