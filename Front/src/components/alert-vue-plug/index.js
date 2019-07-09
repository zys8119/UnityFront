import ZXDialogAlert from './ZXDialogAlert.vue'
let $vm;
const plugin = {
    install (vue, pluginOptions = {}) {
        const Toast = vue.extend(ZXDialogAlert)
        if (!$vm) {
            $vm = new Toast({
                el: document.createElement('div')
            })
            document.body.appendChild($vm.$el)
        }
        const $ZXDialogAlert = {
            show:(opts)=>{
                $vm.show = false;
                opts = opts ||{};
                opts.width = opts.width || "80%";
                opts.maxWidth = opts.maxWidth || null;
                opts.maskZIndex = opts.maskZIndex || 1000;
                opts.title = opts.title || null;
                opts.minTitle = opts.minTitle || null;
                opts.props = opts.props || {};
                opts._event = opts._event || {};
                opts.content = opts.content || null;
                opts.components = opts.components || null;

                for(var i in opts){
                    if(i == 'onShow' || i == 'onHide' || i == 'onClose' || i == '_event'){
                        $vm[i] = opts[i];
                    }else {
                        $vm.$props[i] = opts[i];
                    }
                }
                $vm.show = true;
            },
            hide(){
                $vm.show = false;
            }
        };
        if(!vue.$ZAlert){
            vue.$ZAlert =  $ZXDialogAlert;
        }
        vue.mixin({
            created: function () {
                this.$ZAlert = vue.$ZAlert;
            }
        })
    }
}
export default plugin
export const install = plugin.install