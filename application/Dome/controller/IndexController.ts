import applicationController, {method_post, method_get} from "../../../UnityFrontUtils/controller/applicationController";
const path = require("path")
const fs = require("fs")
export class IndexController extends applicationController {
    constructor(){
        super();
    }

    index(){
        this.$_success()
    }

    /**
     * 手机页面测试
     */
    phonePageTest(){
        const puppeteer = require('puppeteer');
        new Promise((resolve, reject) => {
            try {
                puppeteer.launch({
                    headless:false,
                    devtools:true,
                    defaultViewport:{
                        width:375,
                        height:667,
                        isMobile:true,
                        isLandscape:true,
                        hasTouch:false,
                    }
                }).then(async browser => {
                    const page = await browser.newPage();
                    await page.setUserAgent("Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1")
                    await page.goto(this.$_query.url);
                    await page.evaluateOnNewDocument(({token,unit,host})=>{
                        const AddEventListenerFun = document.addEventListener;
                        document.addEventListener = function (e,l){
                            if(e === "message"){
                                l({
                                    data:JSON.stringify({
                                        token,
                                        unit,
                                        host:host || location.origin
                                    })
                                });
                            }
                            AddEventListenerFun.apply(this, arguments)
                        }
                    },this.$_query)
                    const resultHandle = await page.evaluateHandle(
                        js => js,
                        await page.evaluateHandle(({token, unit, host})=>{
                            window.localStorage.setItem("userInfo",JSON.stringify({token}))
                            window.sessionStorage.setItem("userInfo",JSON.stringify({token}))
                            window.sessionStorage.setItem("USER_TOKEN",token);
                            window.sessionStorage.setItem("USER_UNIT",unit);
                            window.sessionStorage.setItem("USER_HOST",host || location.origin);
                        },this.$_query)
                    );
                    const result = await resultHandle.jsonValue();
                    // await browser.close();
                    resolve(result);
                }).catch(err=>{
                    reject(err.message)
                });
            }catch (err) {
                reject(err.message)
            }
        }).then(res=>{
            this.$_success(res)
        }).catch((err)=>{
            console.log(err)
            this.$_error()
        })
    }

    async test(){
        console.log(this.$_headers)
        this.$_success()
    }
}
