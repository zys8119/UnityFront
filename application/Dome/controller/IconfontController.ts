import {applicationController} from "../../../UnityFrontUtils/controller/applicationController";
import puppeteer, {
    Page,
} from "puppeteer"
import {resolve} from "path"
import {readFileSync, writeFileSync} from "fs";
// const root = resolve(process.cwd(),"../packages/icons");
const root = resolve("/Users/zhangyunshan/work/wisdom-plus/icons","../packages/icons");
const config = resolve(root, "config.json");
const src = resolve(root, "src");
const main = resolve(root, "index.tsx");
export class IconfontController extends applicationController{
    constructor() {
        super();
    }

    async setConfigs(){
        try {
            const data = {
                "id": 2892818,
                "name": "删除",
                "status": 1,
                "is_private": null,
                "category_id": "1",
                "slug": "删除",
                "unicode": "58949",
                "width": 1024,
                "height": 1024,
                "defs": null,
                "path_attributes": "",
                "fills": null,
                "font_class": "changyonggoupiaorenshanchu",
                "user_id": 204163,
                "repositorie_id": 39146,
                "updated_at": "2017-09-13T07:52:16.000Z",
                "created_at": "2017-09-13T07:35:44.000Z",
                "deleted_at": null,
                "show_svg": "<svg class=\"icon\" style=\"width: 1em;height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M96 320a32 32 0 1 1 0-64h832a32 32 0 0 1 0 64H96z m736 0h64v448a160 160 0 0 1-160 160H288a160 160 0 0 1-160-160V320h64v96H128v-96h64v448a96 96 0 0 0 96 96h448a96 96 0 0 0 96-96V320z m-512 112a32 32 0 0 1 64 0v320a32 32 0 0 1-64 0v-320z m320 0a32 32 0 0 1 64 0v320a32 32 0 0 1-64 0v-320zM288 256H224V192a96 96 0 0 1 96-96h384a96 96 0 0 1 96 96v64h-64V224h64v32h-64V192a32 32 0 0 0-32-32H320a32 32 0 0 0-32 32v64z\" /></svg>"
            }
            const json = JSON.parse(readFileSync(config,"utf-8"));
            // json数据
            json[data.id] = data;
            writeFileSync(config,JSON.stringify(json))
            writeFileSync(main, ((content:any)=>{
                const data = `export { default as DateRangeOutlined } from "./src/DateRangeOutlined${parseInt(String(Math.random()*10000)).toString()}"`
                const contentArrs = content.split("\n").filter(e=>e && e !== data);
                contentArrs.push(data)
                return contentArrs.join("\n");
            })(readFileSync(main,"utf-8")))
            writeFileSync(resolve(src,"aa.tsx"),"asdas")

            this.$_success("更新成功")
        }catch (e){
            this.$_error(e.message)
        }
    }

    async getConfigs(){
        try {
            this.$_success(JSON.parse(readFileSync(config,"utf-8")))
        }catch (e){
            this.$_error(e.message)
        }
    }

    async search(){
        try {
            this.$_puppeteer("https://www.iconfont.cn/search/index?searchType=icon&q="+(this.$_query.search || ''), {
                gotoFn:async (page,browser, resolve)=>{
                    page.on("response",async res=>{
                        switch (true){
                            case /search\.json/.test(res.url()):
                                let result = [];
                                try {
                                    result = (await res.json()).data.icons
                                }catch (e) {
                                    console.log(e)
                                }
                                resolve(result)
                                setTimeout(async ()=>{
                                    await browser.close()
                                })
                                break;
                        }
                    })
                },
                resultFilterFn:async ()=>{}
            }).then(res=>{
                this.$_success(res)
            }).catch(err=>{
                this.$_error(err.message)
            })
        }catch (err){
            this.$_error(err.message)
        }
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
}
