import axios from "./axios"
import alert from "./alert"
import apis from "@/apis"
import ContentTable from "./Mixins/ContentTable"
// import $utils from "./utils"
const plugin = {
    install(vue){
        vue.prototype.axios = new axios();
        vue.prototype.apis = new apis();
        // vue.prototype.$utils = $utils;
        vue.use(alert);
        vue.mixin(ContentTable);
    }
}
export default plugin
export const install = plugin.install