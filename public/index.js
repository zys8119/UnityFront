// ==UserScript==
// @name         zys8119英文翻译
// @namespace    http://tampermonkey.net/
// @version      0.1.2.10
// @description  shows how to use babel compiler
// @author       You
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.18.2/babel.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.16.0/polyfill.js
// @match        *://www.npmjs.com/*
// @icon         <$ICON$>
// ==/UserScript==
window.addEventListener('load',()=>{
    (async ()=>{
        const lang = {
            "Products":"产品",
            "Pro":"专业版",
            "Teams":"团队",
            "Pricing":"定价",
            "Popular libraries":"流行的库",
            "Discover packages":"发现包",
            "By the numbers":"按数字",
            "Front-end":"前端",
            "Back-end":"后端",
            "cli":"命令行界面",
            "Documentation":"文档",
            "css":"css",
            "testing":"测试",
            "lot":"物联网",
            "Coverage":"覆盖范围",
            "Mobile":"移动端",
            "Frameworks":"架构",
            "Robotics":"机器人技术",
            "Math":"数学",
            "Downloads · Last Week":"下载·上周",
            "Downloads · Last Month":"下载·上个月",
            "Recently updated packages":"最新更新包",
            "Packages Found":"找到套餐",
            "Sort Packages":"排序套餐",
            "Optimal":"最佳",
            "Popularity":"人气",
            "Quality":"质量",
            "Maintenance":"维护",
            "Packages":"套餐",
            "Packages":"套餐",
            "Search":"搜索"
        }
        const regs = Object.entries(lang).map(e=>[new RegExp(e[0],"img"), e[1]]);
        (function run(body){
            if(body.childNodes && body.childNodes.length > 0 && !["link",'style', 'script', 'img', 'meta'].includes(body.tagName.toLowerCase())){
                body.childNodes.forEach(el=>{
                    run(el)
                })
            }else {
                if(Object.prototype.toString.call(body) === '[object Text]'){
                    body.textContent = body.textContent ? regs.reduce((a,b)=>{
                        return a.replace(b[0], b[1]);
                    }, body.textContent) : body.textContent;
                }
            }
        })(document.body)
    })()
})
