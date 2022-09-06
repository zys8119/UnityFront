import {applicationController} from "../../../UnityFrontUtils/controller/applicationController";
import puppeteer from "puppeteer"
import {writeFileSync} from "fs"
import {resolve} from "path"
export class XsController extends applicationController{
    constructor() {
        super();
    }

    /**
     * 逍遥兵王，洛天归来，小说最新章节txt下载
     * @query start {number} 开始章数
     * @query end {number} 结束章数，可不填，不填则自动下载到最新章节
     * @query concurrent {number} 结束章数，可不填，默认每次3章节下载
     */
    async index(){
        console.time("下载花费时间")
        const url = this.$_query.url || "http://www.bxwx333.org/txt/368055-true-130/";
        const browser = await puppeteer.launch({
            // headless:false,
            // devtools:true
        })
        const page = await browser.newPage()
        page.on("response", async event => {
            if(/zj\.ashx$/.test(event.url())){
                const resultHandle = await page.evaluateHandle(({start, end, text})=>{
                    const data = []
                    const div = document.createElement("div")
                    div.innerHTML = text;
                    div.querySelectorAll("a").forEach((el:HTMLAnchorElement)=>{
                        data.push({
                            innerText:el.innerText,
                            href:el.getAttribute("href")
                        })
                    })
                    return Promise.resolve(data.filter((e,k)=>{
                        start = (+start || 0);
                        end = +end;
                        if(end){
                            return k > (start - 2) && k < end
                        }else{
                            return k > start - 2
                        }
                    }))
                },{start:this.$_query.start,end:this.$_query.end, text:await event.text()})
                const res = await resultHandle.jsonValue();
                await browser.close()
                const texts:any = await this.getLuotianContent(res, [],res);
                console.timeEnd("下载花费时间")
                const resContent = Buffer.from(texts.map((e:any)=>e.title+"\n\n"+e.content).join("\n\n\n\n\n"))
                const filename = `${this.$_query.name || "洛天归来"}_${Date.now()}`
                writeFileSync(resolve(__dirname, filename + Date.now().toString()+".txt"), resContent)
                this.setHeaders({
                    "Content-Type":"text/plain; charset=utf-8",
                    "Content-Disposition":"attachment; filename="+encodeURIComponent(filename)+".txt",
                })
                this.setRequestStatus(200)
                this.$_send(resContent);
            }
        })
        await page.goto(url)


    }


    /**
     * 获取小说内容
     * @param res
     * @param resArr
     */
    async getLuotianContent(res, resArr, source){
        if(res.length > 0){
            const concurrentIndex = this.$_query.concurrent || 3;
            const awaitData = res.slice(0,concurrentIndex)
            console.log(`【${res[0].innerText}】至【后${concurrentIndex}章节】 正在下载`)
            const browser = await puppeteer.launch({})
            const resUltArr = await Promise.all(awaitData.map( async it=>{
                const page = await browser.newPage();
                await page.goto(it.href,{
                    timeout:0,
                })
                const resultHandle = await page.evaluateHandle((it)=>new Promise(resolve => {
                    resolve({
                        title:it.innerText,
                        content:(<HTMLDivElement>document.querySelector("#zjneirong")).innerText
                    })
                }), it)
                return resultHandle.jsonValue()
            }))
            await browser.close()
            resArr = resArr.concat(resUltArr)
            console.log(`【${res[0].innerText}】至【后${concurrentIndex}章节】 下载完成,当前进度：${((source.length - res.length)/source.length*100).toFixed(2)}%`);
            console.timeLog("下载花费时间")
            console.log("----------------------------------------------------")
            return await this.getLuotianContent(res.slice(concurrentIndex),resArr,source);
        }else{
            console.info("下载完成。")
            return await Promise.resolve(resArr);
        }
    }
}