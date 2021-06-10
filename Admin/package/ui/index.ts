import Vue from 'vue'
declare const require:any;
const requireComponent = require.context('.', true, /(\.vue)$/);
// 注入全局公共组件
requireComponent.keys().forEach(fileName => {
    const config = requireComponent(fileName);
    const componentName = fileName.replace(/^\.(.*\/|\/)/, '').replace(/\.\w+$/, '');
    Vue.component(componentName, config.default || config)
});