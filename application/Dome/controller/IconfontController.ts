import {applicationController} from "../../../UnityFrontUtils/controller/applicationController";
import {LaunchOptions, BrowserLaunchArgumentOptions, BrowserConnectOptions, Page, Browser} from "puppeteer"
export class IconfontController extends applicationController{
    constructor() {
        super();
    }

    async index(){
        const res = await this.$_puppeteer("https://www.iconfont.cn/login",<LaunchOptions & BrowserLaunchArgumentOptions & BrowserConnectOptions & {
            jsContentFn:any
            jsContentBeforeFn:any
        }>{
            slowMo:10,
            jsContentBeforeFn:async (page:Page)=>{
                let bool = false
                page.on("response", async e=>{
                    if(/detail\.json/.test(e.url()) && bool){
                        // 返回项目数据
                        try {
                            const icons = (await e.json()).data.icons
                            await page.evaluateHandle(function (icons){
                                (<any>window).$_puppeteer = icons
                            }, icons)
                            console.log("返回项目数据")
                        }catch (e){
                            console.error(e.message)
                        }
                    }
                })
                // 输入密码
                await new Promise(r=>setTimeout(r,500))
                await page.type("#userid",this.$_query.userid,{delay:0});
                await page.type("#password",this.$_query.password, {delay:0});
                await page.tap("#login-form > div:nth-child(4) > button");
                console.log("登陆")
                // 登陆成功跳转
                await new Promise(r=>setTimeout(r,500))
                // 进入项目管理
                await page.hover("#magix_vf_header > header > div > nav > ul > li:nth-child(4)")
                await page.tap("#magix_vf_header > header > div > nav > ul > li:nth-child(4) > ul > li:nth-child(4) > a")
                await new Promise(r=>setTimeout(r,6000))
                console.log("进入项目管理")
                // 选中指定项目
                await page.tap("#mx_16 > div.page-manage-left > div > div:nth-child(2) > div.nav-lists.J_scorll_project_corp > div:nth-child(3)")
                console.log("选中指定项目")
                bool = true;
                await new Promise(r=>setTimeout(r,500))
                console.log(5)
            },
            jsContentFn:()=>{
                return Promise.resolve((<any>window).$_puppeteer)
            }
        }).catch(err=>{
            this.$_error(err)
        })
        console.log(res,666)
        this.$_success(res)
    }

    async beiwai(){
        await this.$_puppeteer("http://www.beiwaionline.com/index.htm",<LaunchOptions & BrowserLaunchArgumentOptions & BrowserConnectOptions & {
            jsContentFn:any
            jsContentBeforeFn:any
            resultFilterFn:any
        }>{
            headless:false,
            devtools:true,
            defaultViewport:{
                width:1920,
                height:1080
            },
            args:['--start-maximized'],
            jsContentFn:()=>Promise.resolve(null),
            jsContentBeforeFn:(async (page:Page, browser:Browser)=>{
                await page.type("#main > div.login > div.loginbo > table > tbody > tr:nth-child(1) > td:nth-child(2) > input", this.$_query.username)
                await page.type("#main > div.login > div.loginbo > table > tbody > tr:nth-child(2) > td:nth-child(2) > div > input", this.$_query.password)
                await page.tap("#main > div.login > div.loginbo > table > tbody > tr:nth-child(3) > td > input[type=image]:nth-child(1)")
                await new Promise(resolve => setTimeout(resolve,1000))
                await page.tap("#suckertree1 > li:nth-child(3) > ul > li:nth-child(1)")
            }),
            resultFilterFn:(async (result:any, next:any,  page:Page, browser:Browser)=>{
                await browser.close();
                next(result);
            })
        })
        this.$_success()
    }
}