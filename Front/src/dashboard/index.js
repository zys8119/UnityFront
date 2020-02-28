import Vue from 'vue'
const requireComponent = require.context('.', true, /(\.vue)$/);
// 注入全局公共组件
requireComponent.keys().forEach(fileName => {
    const config = requireComponent(fileName);
    const componentName = fileName.replace(/^\.|\//img, '').replace(/\.\w+$/, '');
    Vue.component(`D${componentName}`, config.default || config)
});
