import Vue from 'vue'
const requireComponent = require.context('.', true, /(\.vue)$/);
// 注入全局公共组件
window.dashboard = [];
requireComponent.keys().forEach(fileName => {
    const config = requireComponent(fileName);
    const componentName = fileName.replace(/^\.|\//img, '').replace(/\.\w+$/, '');
    const name = `D${componentName}`;
    Vue.component(name, config.default || config);
    window.dashboard.push(name);
});
