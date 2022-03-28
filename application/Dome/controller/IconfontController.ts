import {applicationController} from "../../../UnityFrontUtils/controller/applicationController";
import puppeteer, {
    Page,
} from "puppeteer"
export class IconfontController extends applicationController{
    constructor() {
        super();
    }

    async pageSuccess(){
        this.$_success()
    }

    async index(){
        const {username, password, projectName} = this.$_query;
        if(!username || !password || ! projectName){
            return this.$_error("参数有误")
        }
        let projectId = null;
        let ownProjectsObj = null;
        let detailJson = null;
        let manageUrl = null;
        let projectUrl = null;
        try {
            const puppeteer = require('puppeteer');
            const load = async (page, selectors)=> {
                return await page.evaluateHandle((selectors)=>{
                    return new Promise<void>(resolve=>{
                        const timeout = ()=> setTimeout(()=>{
                            if(document.querySelector(selectors)){
                                setTimeout(()=>{
                                    resolve()
                                })
                            }else {
                                timeout()
                            }
                        },200)
                        timeout()
                    })
                }, selectors)
            }
            const pageRequest = async (page:Page, browser, resolve)=>{
                try {
                    page.on("response", async (e)=>{
                        const url = e.url();
                        switch (true) {
                            case /www\.iconfont\.cn\/$/.test(url):
                                console.log("请稍等")
                                const page2 = await browser.newPage();
                                await page2.goto(e.url());
                                await pageRequest(page2, browser, resolve);
                                await load(page2,"#magix_vf_header > header > div > nav > ul > li:nth-child(3)");
                                await page2.hover("#magix_vf_header > header > div > nav > ul > li:nth-child(3)")
                                await page2.tap("#magix_vf_header > header > div > nav > ul > li:nth-child(3) > ul > li:nth-child(6)")
                                console.log("进入项目")
                                break;
                            case /manage\/index.*manage_type/.test(url):
                                manageUrl = url
                                break;
                            case /myprojects\.json.*isown_create=1/.test(url):
                                // 获取我的项目信息
                                if(!ownProjectsObj){
                                    console.log("请稍等")
                                    ownProjectsObj = (await e.json()).data.ownProjects.find(e=>e.name === projectName) || {}
                                    projectId = ownProjectsObj.id;
                                    const page3 = await browser.newPage();
                                    projectUrl = `${manageUrl}&projectId=${projectId}&__${encodeURIComponent(projectName)}__=true`;
                                    await pageRequest(page3, browser, resolve);
                                    page3.goto(projectUrl);
                                    console.log("进入项目：", projectName)
                                }
                                break;
                            case /detail.json/.test(url):
                                if(e.frame().url() === projectUrl){
                                    console.log("图标获取成功")
                                    const res = (await e.json()).data
                                    if(!detailJson && res.project.id === projectId){
                                        detailJson = res;
                                        browser.close()
                                        resolve(res);
                                    }
                                }
                                break;
                        }
                    });
                }catch (e){}
            }
            const res = await new Promise<any>(resolve => {
                puppeteer.launch({
                    // headless:false,
                    // devtools:true,
                }).then(async browser=>{
                    let page = await browser.newPage();
                    await pageRequest(page, browser, resolve);
                    await page.goto("https://www.iconfont.cn/login");
                    console.log("请稍等")
                    await load(page,"#userid");
                    await page.type("#userid",this.$_query.username,{delay:0});
                    await page.type("#password",this.$_query.password, {delay:0});
                    await page.tap("#login-form > div:nth-child(4) > button");
                    console.log("登陆成功")
                }).catch(err=>{
                    console.log(err.message, 33333)
                })
            }).catch(err=>{
                console.log(err,66666)
            })
            this.$_success(res)
        }catch (e){
            // this.$_error(e.message)
        }

    }

    async beiwai(index = 0){
        // console.log("=============================================")
        const item = {
            "outlineCode": "1627536666047",
            "curriculumCode": "ZK_BWME3020_20210730203203938",
            "parentCode": "1594610914500628978",
            "name": "第5节 网站信息架构与交互设计",
            "outlineOrder": 611,
            "nodeType": "resource",
            "type": 400004,
            "src": "proxy/resource/591568463508541440",
            "times": 31.5,
            "id": "167053",
            "tid": "1685018",
            "suffix": "_360p.m3u8",
            "courseElementId": 1685018,
            "courseElementState": "1",
            "learnerCourseId": 4812739
        }
        const config = {
            userId: 629700,
            learnCourseId: item.learnerCourseId,
            courseElementId: item.courseElementId,
            loginName: "张云山",
            orgCode: "beiwaionline",
            learnerCourseId: item.learnerCourseId,
            clientSource: 190010110,
            stayTime:60,
        }
        const headers = {
            origin: "https://study.ebeiwai.com",
        }
        const findLastLearnTime = (await this.$_axios({
            method:"post",
            url:"https://study.ebeiwai.com/api/studyservice/findLastLearnTime",
            headers,
            params:{
                userId:config.userId,
                learnCourseId:config.learnCourseId,
                courseElementId:config.courseElementId,
            },
        })).data
        const currIndex = index + (index === 0 ? 0 :1);
        const learnDetails = new Array(config.stayTime).fill(0).map((e,k)=>k+currIndex);
        const times = item.times*60;
        const lastLearnTime = currIndex + config.stayTime;
        const params = {
            userId: config.userId,
            loginName:config.loginName,
            orgCode: config.orgCode,
            learnerCourseId: config.learnerCourseId,
            clientSource: config.clientSource,
            stayTime: config.stayTime,
            courseElementId: config.courseElementId
        }
        const res = (await this.$_axios({
            method:"post",
            url:"https://study.ebeiwai.com/ws/studyservice/sendLearnDetailToMassdataTmp",
            params,
            headers,
        })).data
        const params2 = {
            userId: config.userId,
            loginName:config.loginName,
            orgCode: config.orgCode,
            learnerCourseId: config.learnerCourseId,
            clientSource: config.clientSource,
            lastLearnTime,
            learnDetails,
            courseElementId: config.courseElementId,
        }
        // console.log(params2)
        const res2 = (await this.$_axios({
            method:"post",
            url:"https://study.ebeiwai.com/ws/studyservice/sendLearnDetailToMassdataTmp",
            params:params2,
            headers,
            paramsSerializer(params){
                const result = Object.entries(params).map(([k,v]:[string,Array<number> & string])=>{
                    if(Object.prototype.toString.call(v) === "[object Array]"){
                        return v.map(e=>encodeURI(`${k}[]=${e}`)).join("")
                    }
                    return `${k}=${encodeURI(v)}`
                }).join("&");
                return result;
            }
        })).data
        console.log({
            item:findLastLearnTime.item,
            ...params,
            ...params2,
            res,
            res2,
        })
        if(lastLearnTime < times){
            return await this.beiwai(lastLearnTime)
        }else {
            this.$_success("学习完成");
        }
    }

    async beiwaicourse(){
        const res3 = (await this.$_axios({
            method:"post",
            url:"https://study.ebeiwai.com/ws/studyservice/getStandedCourseOutline",
            params:{
                code: "ZK_BWME3020_20210730203203938",
                type: 1,
                courseId: 4204,
                learnCourseId: 4812739,
            },
        })).data
        console.log(JSON.stringify(res3.outlines
            .find(e=>e.outlineCode === "1627536111167"), null, 4));
        const tree = this.toTree(res3.outlines,{
            id:"outlineCode",
            parent:"parentCode",
        })
        console.log(tree)
        this.$_success();
    }
}
