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
            gotoFn:any
        }>{
            headless:false,
            devtools:true,
            slowMo:8,
            jsContentBeforeFn:async (page:Page)=>{
                await new Promise(r=>setTimeout(r,500))
                await page.type("#userid","***",{delay:0})
                await page.type("#password","**", {delay:0})
                await page.tap("#login-form > div:nth-child(4) > button")
                await new Promise(r=>setTimeout(r,1000))
                await page.hover("#magix_vf_header > header > div > nav > ul > li.nav-item.current")
            },
            jsContentFn:()=>{
                return async resolve => {
                    // await page.tap("");
                    resolve(null);
                }
            }
        }).catch(err=>{
            console.log(err)
        })
        console.log(res)
        this.$_success()
    }
}