import {applicationController} from "../../../UnityFrontUtils/controller/applicationController";
import {LaunchOptions, BrowserLaunchArgumentOptions, BrowserConnectOptions, Page} from "puppeteer"
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
}