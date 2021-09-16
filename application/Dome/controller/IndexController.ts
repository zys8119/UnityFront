import applicationController from "../../../UnityFrontUtils/controller/applicationController";
import {writeFileSync, readFileSync, existsSync} from "fs"
import {resolve} from "path"
import {merge} from "lodash"
import {decode} from "iconv-lite"
import * as crypto from "crypto"
export class IndexController extends applicationController {
    macdNameMap = ["股票名字",
        "今日开盘价",
        "昨日收盘价",
        "当前价格",
        "今日最高价",
        "今日最低价",
        "竞买价，即“买一”报价",
        "竞卖价，即“卖一”报价",
        "成交的股票数，由于股票交易以一百股为基本单位，所以在使用时，通常把该值除以一百",
        "成交金额，单位为“元”，为了一目了然，通常以“万元”为成交金额的单位，所以通常把该值除以一万","日期","时间"]
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

    /**
     * chrome书签同步
     */
    async bookmarksSync(){
        const file_path = resolve(__dirname,"../bookmarks/bookmarks.json");
        let res = {};
        if(existsSync(file_path)){
            res = JSON.parse(readFileSync(file_path,"utf8"))
        }
        res = merge(res, this.$_body.bookmarks)
        if(this.$_body.bookmarks){
            writeFileSync(file_path, JSON.stringify(res, null, 4))
        }
        this.$_success(res)
    }

    async docbuilde(){
        this.$_axios({
            url:"http://localhost/docbuilder",
            method:"post",
            data:{
                async:true,
                url:"https://zhrd.nbrd.gov.cn/jw_files/pdf/B5C6BCB7-B5FB-11BA-C076-24BDA4EF1354-1黄军军 关于要求制定《宁波市供水用水条例》的议案.pdf"
            }
        }).then(res=>{
            console.log(res.data)
            this.$_axios({
                url:"http://localhost/ConvertService.ashx",
                method:"post",
                data:{
                    async:false,
                    filetype:"pdf",
                    outputtype:"jpg",
                    key:res.data.key,
                    // key:"45",
                    url:"https://zhrd.nbrd.gov.cn/jw_files/pdf/B5C6BCB7-B5FB-11BA-C076-24BDA4EF1354-1黄军军 关于要求制定《宁波市供水用水条例》的议案.pdf"
                }
            }).then(res=>{
                console.log(res.data)
                this.$_success(res.data)
            }).catch(()=>this.$_error())
        }).catch(()=>this.$_error())
    }

    /**
     * @天天向上人大群
     * 钉钉机器人消息发送
     * 开发文档：https://ding-doc.dingtalk.com/doc#/serverapi2/qf2nxq
     */
    async ddSendMsg(){
        const timestamp = Date.now();
        const access_token = "4fd7f9fed237f5ac5b72ab1ac32d069d13532a8e44aaaa4a212c0551e21df981";
        const secret = "SEC949de5da0d2656f474e606de59d76a1e121bef515b8d9897c8620c9171744594";
        const sign = crypto
            .createHmac('sha256', secret)
            .update(`${timestamp}\n${secret}`, "utf8")
            .digest('base64');
        this.$_axios({
            url:"https://oapi.dingtalk.com/robot/send",
            method:"post",
            params:{
                access_token,
                timestamp,
                sign:encodeURIComponent(sign),
            },
            data: {
                // 消息类型
                msgtype: "text",
                text: {
                    // 默认会被getContent替代，所以暂不建议使用
                    content:this.$_query.content || `正式环境部署`
                },
                at:{
                    atMobiles:this.$_query.at || [
                        "17858938961",// 群昵称：秦慧桦(秦慧桦)
                        "17600883859",// 群昵称：任众磊(任众磊)
                        "18112916651",// 群昵称：张广响(张广响)
                        // "13857483191",// 群昵称：陈周云(陈周云)
                    ],
                    isAtAll:!!this.$_query.isAtAll,
                }
            }
        }).then(res=>{
            if(res.data && typeof res.data.errcode === "number" && res.data.errcode === 0){
                this.$_error("【钉钉消息】发送成功")
            }else {
                this.$_error("【钉钉消息】发送成功",res.data)
            }
        }).catch(err=>{
            this.$_error("【钉钉消息】发送成功",err.message)
        })
    }

    async videoparser(){
        this.$_success(await this.$_puppeteer(`https://tool.lu/videoparser`, (url)=>{
            return new Promise(resolve1 => {
                fetch("https://tool.lu/videoparser/ajax.html", {
                    "headers": {
                        "accept": "application/json, text/javascript, */*; q=0.01",
                        "accept-language": "zh-CN,zh;q=0.9",
                        "cache-control": "no-cache",
                        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                        "pragma": "no-cache",
                        "sec-ch-ua": "\" Not;A Brand\";v=\"99\", \"Google Chrome\";v=\"91\", \"Chromium\";v=\"91\"",
                        "sec-ch-ua-mobile": "?0",
                        "sec-fetch-dest": "empty",
                        "sec-fetch-mode": "cors",
                        "sec-fetch-site": "same-origin",
                        "x-requested-with": "XMLHttpRequest"
                    },
                    "referrer": "https://tool.lu/videoparser/",
                    "referrerPolicy": "strict-origin-when-cross-origin",
                    "body": "url="+url,
                    "method": "POST",
                    "mode": "cors",
                    "credentials": "include"
                }).then((res:any)=>{
                    res.json().then(res=>{
                        resolve1(res.items)
                    })
                }).catch(err=>{
                    resolve1("请求错误")
                })
            })
        },this.$_query.url))
    }

    async curl(){
        if(this.$_query.url){
            this.$_success((await this.$_axios({
                method:"get",
                url:this.$_query.url
            })).data)
        }else {
            this.$_error()
        }
    }

    async test(){
        const res = await this.$_puppeteer("http://jbxww.cnnb.com.cn/",()=>new Promise(resolve1 => {
            const data = []
            document.querySelectorAll(".jbyw a").forEach((el:HTMLAnchorElement)=>{
                data.push({
                    innerText:el.innerText,
                    herf:el.getAttribute("href")
                })
            })
            resolve1(data)
        }))
        this.$_success(res)
    }

    /**
     * 股票平均线MACD计算
     */
    async macd(){
        this.$_axios({
            url:`https://hq.sinajs.cn/list=sh601600,sh600928`,
            method:"get",
            responseType:"arraybuffer"
        }).catch(()=>this.$_error()).then((res:any)=>{
            const data = decode(res.data,"GBK").match(/"(.|\n)*"/)[0].match(/[^"]*?,/img).map(e=>e.replace(",",""))
            let resUlt = [];
            let resUltItem = {};
            data.forEach((it,key)=>{
                if((key % 33) === 0){
                    resUltItem = {}
                }
            })
            console.log(data.slice(0,33))
            this.$_success(resUlt)
        })
    }

    /**
     * 获取小说内容
     * @param res
     * @param resArr
     */
    async getLuotianContent(res, resArr, source){
        if(res.length > 0){
            const concurrentIndex = this.$_query.concurrent || 3;
            console.log(`【${res[0].innerText}】至【后${concurrentIndex}章节】 正在下载`)
            const resUltArr = await Promise.all(res.slice(0,concurrentIndex).map(it=>this.$_puppeteer(it.href,(it)=>new Promise(resolve1 => {
                resolve1({
                    title:it.innerText,
                    content:(<HTMLDivElement>document.querySelector("#zjneirong")).innerText,
                })
            }),it)))
            resArr = resArr.concat(resUltArr)
            console.log(`【${res[0].innerText}】至【后${concurrentIndex}章节】 下载完成,当前进度：${((source.length - res.length)/source.length*100).toFixed(2)}%`);
            console.log("----------------------------------------------------")
            return await this.getLuotianContent(res.slice(concurrentIndex),resArr,source);
        }else{
            console.info("下载完成。")
            return await Promise.resolve(resArr);
        }
    }

    /**
     * 逍遥兵王，洛天归来，小说最新章节txt下载
     * @query start {number} 开始章数
     * @query end {number} 结束章数，可不填，不填则自动下载到最新章节
     * @concurrent concurrent {number} 结束章数，可不填，默认每次3章节下载
     */
    async luotian(){
        const url = "http://www.bxwx333.org/txt/368055-true-130/";
        const res = await this.$_puppeteer(url,({start, end})=>new Promise(resolve1 => {
            setTimeout( ()=>{
                const data = []
                document.querySelectorAll("#list_dl a").forEach((el:HTMLAnchorElement)=>{
                    data.push({
                        innerText:el.innerText,
                        href:el.getAttribute("href")
                    })
                })
                if(end){
                    resolve1(data.filter((e,k)=>(k > (+start || 0) - 2) && k < +end))
                }else{
                    resolve1(data.filter((e,k)=>k > (+start || 0) - 2))
                }
            },1000)
        }),{start:this.$_query.start,end:this.$_query.end});
        const texts:any = await this.getLuotianContent(res, [],res);
        this.setHeaders({
            "Content-Type":"text/plain; charset=utf-8",
            "Content-Disposition":"attachment; filename="+encodeURIComponent(`洛天归来(${this.$_query.start || 0}) ${new Date().toLocaleDateString()}`)+".txt",
        })
        this.setRequestStatus(200)
        this.$_send(Buffer.from(texts.map((e:any)=>e.title+"\n\n"+e.content).join("\n\n\n\n\n")));
    }
}
