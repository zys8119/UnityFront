import Vue from 'vue'
const requireComponent = require.context('.', true, /(\.vue)$/);
// 注入全局公共组件
window.dashboard = [];
requireComponent.keys().forEach(fileName => {
    let config = requireComponent(fileName);
    const componentName = fileName.replace(/^\.|\//img, '').replace(/\.\w+$/, '');
    const name = `D${componentName}`;
    config = config.default || config;
    Vue.component(name, config);
    window.dashboard.push({
        name,
        title:config.title,
    });
});
