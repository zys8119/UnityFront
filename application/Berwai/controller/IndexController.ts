import {applicationController} from "../../../UnityFrontUtils/controller/applicationController";
const {launch} = require("puppeteer")
export class IndexController extends applicationController{
    constructor() {
        super();
    }

    /**
     * 获取答案
     * @param name 账号
     * @param password 密码
     * @param reg 课程名称正则查询
     * @param reg_name 练习名称正则查询
     */
    async getAnswers(){
        const browser = await launch({
            // headless:false,
            // devtools:true,
        })
        const page = await browser.newPage()
        await page.goto("https://appd10.beiwaionline.com/")
        await page.type("#content3 > div > table > tbody > tr:nth-child(1) > td:nth-child(2) > input[type=text]", this.$_query.name)
        await page.type("#content3 > div > table > tbody > tr:nth-child(2) > td:nth-child(2) > input[type=password]", this.$_query.password)
        await page.tap("#content3 > div > table > tbody > tr:nth-child(1) > td:nth-child(3) > a > img")
        await page.waitForSelector('body > div.content_box2 > div.sidebar > div.information > table > tbody > tr:nth-child(1) > td:nth-child(1) > img')
        const courseInof:any = await (await page.evaluateHandle((reg)=>{
            return fetch("https://appd10.beiwaionline.com/learnerfore/learnerfore/listyouhua", {
                "body": "pageNum=1",
                "method": "POST",
            }).then(res=>{
                return res.text()
            }).then(html=>{
                const div = document.createElement('div') as any
                div.innerHTML = html
                const a = []
                a.push.apply(a, div.querySelectorAll('td a'))
                return a.map(e=>({code:(e.getAttribute('onclick') || '').replace(/^.+,|\).+/g,''), name:e.innerText})).filter(e=>new RegExp(reg, "img").test(e.name))
            })
        },this.$_query.reg || '国际金融')).jsonValue();
        if(this.$_body.reg_name){
            const reg_name = this.$_body.reg_name
            console.log(reg_name)
            const results = {}
            let index = 0
            while (index < reg_name.length){
                results[reg_name[index]] = await this.getCourseAnswer(courseInof, page, reg_name[index])
                index++
            }
            res = results
        }else {
            res = await this.getCourseAnswer( courseInof, page, this.$_query.reg_name || '4.1 练习')
        }
        await browser.close()
        this.$_success(res)
    }

    async getCourseAnswer (courseInof, page, reg_name){
        let res:any = courseInof
        console.log("课程", courseInof)
        await page.goto(`https://appd10.beiwaionline.com/learnerfore/learnerfore/gotoStudyCenter/${res[0].code}`)
        await page.tap("body > div:nth-child(1) > div.href-btn > button")
        await page.waitForSelector("#contentFclearId > aside > hgroup.course_details > title")
        res = await (await page.evaluateHandle((reg)=>{
            return Array.apply(null,document.querySelectorAll(".menu a .child-text")).map(e=> {
                return {
                    url:e.parentNode.href,
                    name:e.innerText
                }
            }).filter(e=>new RegExp(reg, 'img').test(e.name))
        },reg_name)).jsonValue()
        console.log("练习栏目", res)
        await page.goto(res[0].url)
        await page.waitForSelector("#app > div > div.content > div.content-part > div > iframe")
        res = await (await page.evaluateHandle(()=>{
            const a:HTMLIFrameElement = document.querySelector("#app > div > div.content > div.content-part > div > iframe")
            return a.src
        })).jsonValue()
        const pageUrl = res
        console.log("练习页面地址", res)
        await page.goto(res)
        res = await (await page.evaluateHandle((reg)=>{
            return {
                url:location.href,
                code:location.pathname.replace(/^.+\//,'')
            }
        })).jsonValue()
        console.log("重定向后的练习页面地址", res)
        console.log("练习页面id标识", res.code)
        res = await (await page.evaluateHandle((code)=>{
            return fetch(`https://quiz.ebeiwai.com/icourse/fore/myselftest/newView/${code}`).then(res=>{
                return res.text()
            }).then(text=>{
                return /您访问的页面出错了/.test(text)
            })
        }, res.code)).jsonValue()
        console.log("判断是否存在答案", res)
        if(res){
            // 答案不存在
            await page.waitForSelector("#submitRecord")
            res = await (await page.evaluateHandle(()=>{
                // @ts-ignore
                return Object.fromEntries($("form").serialize().split('&').map(e=>e.split('=')))
            })).jsonValue()
            console.log("提交的练习数据", res)
            res = await (await page.evaluateHandle((data)=>{
                const formData = new FormData()
                Object.entries(data).forEach(ee=>{
                    // @ts-ignore
                    formData.append(ee[0], ee[1])
                })
                return fetch("https://quiz.ebeiwai.com/fore/orgquiz/saveLearnerAnswer", {
                    "body":formData ,
                    "method": "POST",
                }).then(res=>{
                    return res.json()
                })
            }, res)).jsonValue()
            console.log("提交练习的接口响应", res)
            await page.goto(pageUrl)
        }
        await page.waitForSelector(".header")
        res = await (await page.evaluateHandle(()=>{
            return Array.apply(Array, document.querySelectorAll(".analysis-true")).map(e=>({value:e.innerText, name:e.parentNode.parentNode.querySelector('.question .question').innerText}))
        })).jsonValue()
        console.log("最终答案", res)
        return res
    }
}
