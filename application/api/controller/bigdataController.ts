import {applicationController} from "../../../UnityFrontUtils/controller/applicationController";

export class bigdataController extends applicationController{
    /**
     * 获取天气接口
     */
    weather(){
        this.$_axios({
            method:"get",
            url:"http://toy1.weather.com.cn/search",
            params:{
                cityname:this.$_query.q,
                callback:"",
            }
        }).then(res=>{
            let nb = null;
            try {
                nb = eval(res.data)[0].ref.split("~")[0]
            }catch (e) {}
            if(!nb){
                this.$_error("获取失败");
                return;
            }
            this.$_axios({
                method:"get",
                url:`http://www.weather.com.cn/weather/${nb}.shtml#input`,
            }).then(res=>{
                const puppeteer = require('puppeteer');
                puppeteer.launch().then(async browser => {
                    const page = await browser.newPage();
                    const resultHandle = await page.evaluateHandle(
                        js => js,
                        await page.evaluateHandle((innerHTML,name)=>new Promise(resolve => {
                            let div:HTMLDivElement;
                            div = document.createElement("div");
                            div.innerHTML = innerHTML;
                            let resData = [];
                            resData.push.apply(resData,div.querySelectorAll(".clearfix .sky"));
                            let result =  resData.map((el:HTMLElement)=>({
                                title:(<HTMLElement>el.querySelector("h1")).innerText,
                                wea:(<HTMLElement>el.querySelector(".wea")).innerText,
                                tem:(<HTMLElement>el.querySelector(".tem")).innerText,
                                win:(<HTMLElement>el.querySelector(".win")).innerText,
                                icon:(<HTMLElement>el.querySelector(".png40")).classList[1],
                            }));
                            resolve({
                                name,
                                today:(<any>result).find(e=>e.title.indexOf("今天") > -1),
                                list:result,
                            })
                        }),res.data,this.$_query.q)
                    );
                    const result = await resultHandle.jsonValue();
                    await browser.close();
                    this.$_success(result)
                }).catch(err=>{
                    this.$_error(err);
                });
            }).catch(err=>{
                this.$_error(err);
            });
        }).catch(err=>{
            this.$_error(err);
        });

    }
}