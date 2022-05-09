import {applicationController} from "../../../UnityFrontUtils/controller/applicationController";
import utils from "../../../UnityFrontUtils/utils/index";
import puppeteer, {
    Page,
} from "puppeteer"
import {resolve} from "path"
import {readFileSync, unlinkSync, writeFileSync, existsSync, readdirSync, statSync, rmdirSync, mkdirSync} from "fs";
import {template} from "lodash";
const root = resolve(process.cwd(),"../packages/icons");
// const root = resolve(process.cwd(),"./packages/icons");
// const root = resolve("/Users/zhangyunshan/work/wisdom-plus/icons","../packages/icons");
if(!existsSync(root)){
    utils.mkdirSync(root)
}
const config = resolve(root, "config.json");
const src = resolve(root, "src");
const main = resolve(root, "index.tsx");
export class IconfontController extends applicationController{
    constructor() {
        super();
    }

    toHump(name) {
        const replaceCallback = (all, letter)=>{
            return (letter|| "").toUpperCase();
        }
        return name.toLowerCase()
            .replace(/ |(\_|\-){1,}$/g,"")
            .replace(/\_{1,}/g,"_")
            .replace(/\-{1,}/g,"-")
            .replace(/\_(.)/g, replaceCallback)
            .replace(/\-(.)/g, replaceCallback)
            .replace(/^(.)/g, (all,letter)=>(letter || "").toUpperCase());
    }

    createIconName(data, prefixStr?:string){
        const prefix =  this.toHump(data.font_class);
        const suffix =  this.toHump(Buffer.from(String(data.id)).toString("base64").replace(/=/img,""));
        return `${prefixStr || ''}${prefix}${suffix}`
    }

    /**
     * 同步配置
     */
    async synchronousConfigs(bool:boolean){
        try {
            // 删除目录资源
            await utils.deleteFolder(src);
            const json = JSON.parse(readFileSync(config,"utf-8"));
            writeFileSync(main, "export {\n}")
            for (let icon in json){
                await this.setConfigs(json[icon])
            }
            if(!bool){
                this.$_success("同步成功")
            }
        }catch (e){
            this.$_error(e.message)
        }
    }

    /**
     * 更新配置，is_delete_wp_icon 为true 则是删除图标
     */
    async setConfigs(bodyData){
        try {
            const {is_delete_wp_icon, wp_icon_prefix, ...data} = (bodyData || this.$_body);
            data.font_class = (bodyData || is_delete_wp_icon)  ? data.font_class : this.createIconName(data, wp_icon_prefix || "Wp")
            const name = data.font_class;
            // json数据
            const json = JSON.parse(readFileSync(config,"utf-8"));
            if(is_delete_wp_icon){
                // 删除
                delete json[data.id];
            }else {
                // 添加
                json[data.id] = data;
            }
            writeFileSync(config,JSON.stringify(json, null, 4))
            writeFileSync(main, ((content:any)=>{
                const IconExportInfo = `import ${name} from "./src/${name}" // ${data.name}`
                const exportName = `${name},`
                let contentArrs = content.split("\n").filter(e=>{
                    return e && ![IconExportInfo, exportName].includes(e)
                });
                if(!is_delete_wp_icon){
                    contentArrs.unshift(IconExportInfo)
                    const lng = contentArrs.length;
                    contentArrs = contentArrs.slice(0,lng-1).concat([exportName]).concat([contentArrs[lng-1]])
                }
                return contentArrs.join("\n");
            })(readFileSync(main,"utf-8")))
            const iconPath = resolve(src,`${name}.tsx`)
            if(is_delete_wp_icon){
                if(existsSync(iconPath)){
                    unlinkSync(iconPath);
                }
            }else {
                const svgTemp = readFileSync(resolve(__dirname,'./svg.txt'), "utf-8")
                writeFileSync(iconPath,template(svgTemp)({
                    name,
                    svg:data.show_svg
                }))
            }
            if(!bodyData){
                this.$_success("更新成功")
            }
        }catch (e){
            if(!bodyData){
                this.$_error(e.message)
            }
        }
    }

    /**
     * 获取配置
     */
    async getConfigs(){
        try {
            if(!existsSync(config)){
                writeFileSync(config,JSON.stringify({}))
                writeFileSync(resolve(config, "..","package.json"),JSON.stringify({
                    "name": "@iconfont/icon",
                    "version": "0.0.1",
                    "main": "index.tsx"
                }, null, 4))
                await this.synchronousConfigs(true)
            }
            this.$_success(JSON.parse(readFileSync(config,"utf-8")))
        }catch (e){
            this.$_error(e.message)
        }
    }

    /**
     * 搜索阿里图标
     */
    async search(){
        try {
            this.$_puppeteer(`https://www.iconfont.cn/search/index?searchType=icon&${decodeURIComponent(new URLSearchParams(this.$_query).toString())}`, {
                gotoFn:async (page,browser, resolve)=>{
                    page.on("response",async res=>{
                        switch (true){
                            case /search\.json/.test(res.url()):
                                let result = [];
                                try {
                                    result = (await res.json()).data
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
                console.log(err)
                this.$_error(err.message)
            })
        }catch (err){
            this.$_error(err.message)
        }
    }

    /**
     * 获取我的阿里图标字体项目，需要提供账号密码及对应项目名称
     */
    async getMyIconfont(){
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
                    console.log(err)
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
