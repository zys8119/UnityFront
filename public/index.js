// ==UserScript==
// @name         zys8119英文翻译
// @namespace    http://tampermonkey.net/
// @version      0.1.2.10
// @description  shows how to use babel compiler
// @author       You
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.18.2/babel.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.16.0/polyfill.js
// @match
// @include         *://www.npmjs.com/*
// @include         *://www.github.com/*
// @icon         <$ICON$>
// ==/UserScript==
window.addEventListener('load',()=>{
    const urls = [
        /www\.(github|npmjs)\.com/
    ]
    if(!urls.some(reg=>reg.test(location.href))){
        return
    }
    (async ()=>{
        const lang = {
            "Pull requests":"拉取请求",
            "Issues":"问题",
            "Marketplace":"市场",
            "Explore":"探索",
            "Overview":"概述",
            "Repositories":"存储库",
            "Projects":"项目",
            "Stars":"星星",
            "followers":"追随者",
            "following":"跟随",
            "Achievements":"成就",
            "Organizations":"组织",
            "Pinned":"固定",
            "Customize your pins":"定制您的针",
            "sign out":"退出登录",
            "Add Organization":"添加组织",
            "Access Tokens":"访问令牌",
            "Billing Info":"年代计费信息",
            "Account":"账号",
            "Profile":"配置文件",
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
            "Packages":"包",
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
