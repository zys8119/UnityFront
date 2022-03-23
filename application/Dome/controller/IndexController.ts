import applicationController from "../../../UnityFrontUtils/controller/applicationController";
import * as crypto from "crypto"
import {extend} from "lodash";
import * as fs from "fs";
import path, {resolve} from "path";
import {ServerConfig} from "../../../UnityFrontUtils/config";
import {readFileSync} from "fs";
import {stringify} from "yaml";
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

    /**
     * @天天向上人大群
     * 钉钉机器人消息发送
     * 开发文档：https://ding-doc.dingtalk.com/doc#/serverapi2/qf2nxq
     */
    async ddSendMsg(){
        const timestamp = Date.now();
        const access_token = "";
        const secret = "";
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
        const aes = require("../../../public/aes.js")
        const res = await this.$_axios({
            method:"post",
            url:"http://192.168.110.1/cgi-bin/luci/api/auth",
            data:{
                "method": "login",
                "params": {
                    "password": aes.enc("123456", "RjYkhwzx$2018!").replace(/\s+/g, ''),
                    "username": "admin",
                    "time": Date.now(),
                    "encry": true,
                    "limit": false
                }
            }
        })
        this.$_success(res.data)
    }

    async test2(){
        const res = await this.DB().select().from("test").like({
            name:`%${this.$_query.a}%`,
        }).query()
        this.$_success(res)
    }

    async '3d'(){
        this.Render()
    }

    /**
     * 敏感词检测测试
     */
    async keywords (){
        this.$_success("sadsa",null,0);
    }

    /**
     * 获取敏感词
     */
    async gwKkeywords (){
        const filePath = path.resolve(ServerConfig.Template.publicPath,"keywords");
        this.$_success({
            keywords:fs.readFileSync(filePath).toString().split("\n"),
            time:Date.now()+100000000
        });
    }

    /**
     * 获取订阅地址
     */
    async getVpnSub (){
        const base64 = await this.$_getFileContent(this.$_query.url || "https://www.cxkv2.xyz/link/xBUv7DLBLyRROucc?mu=2");
        const content = Buffer.from(base64 as string,"base64").toString();
        const proxiesArr = content.split("\n")
            .filter(e=>e)
            .map(e=>e.replace(/^.*\/\//,""))
            .map(bsee64=>JSON.parse(Buffer.from(bsee64,"base64").toString()))
            .map(e=>({
                name:e.ps,
                server:e.add,
                port:e.port,
                type:"vmess",
                uuid:e.id,
                alterId:e.aid,
                cipher:e.cipher || "auto",
                tls:!!e.tls,
                network:e.net,
                "ws-opts":{
                    path:e.path,
                    headers:{
                        Host:e.add
                    },
                }
            }))
        const proxies = {
            proxies:proxiesArr
        }
        const prefix = readFileSync(resolve(__dirname,"vpn-prefix.yaml"),"utf-8");
        const rules = readFileSync(resolve(__dirname,"vpn-rules.yaml"),"utf-8");
        const publicProxyGroups = proxiesArr.map(e=>e.name);
        const proxyGroups = {
            'proxy-groups':[
                {name:"🔰 节点选择", type:"select", proxies:["♻️ 自动选择", "🎯 全球直连",].concat(publicProxyGroups)},
                {name:"♻️ 自动选择", type:"select", proxies:publicProxyGroups},
                {name:"🌍 国外媒体", type:"select", proxies:["🔰 节点选择","♻️ 自动选择","🎯 全球直连"].concat(publicProxyGroups)},
                {name:"🌏 国内媒体", type:"select", proxies:["🎯 全球直连"].concat(publicProxyGroups)},
                {name:"Ⓜ️ 微软服务", type:"select", proxies:["🎯 全球直连","🔰 节点选择"].concat(publicProxyGroups)},
                {name:"📲 电报信息", type:"select", proxies:["🎯 全球直连","🔰 节点选择"].concat(publicProxyGroups)},
                {name:"🍎 苹果服务", type:"select", proxies:["🎯 全球直连","🔰 节点选择", "♻️ 自动选择"].concat(publicProxyGroups)},
                {name:"🎯 全球直连", type:"select", proxies:["DIRECT"]},
                {name:"🛑 全球拦截", type:"select", proxies:["REJECT", "DIRECT"]},
                {name:"🐟 漏网之鱼", type:"select", proxies:["♻️ 自动选择", "🎯 全球直连","🔰 节点选择"].concat(publicProxyGroups)},
            ]
        }
        this.setHeaders({
            "Content-Type": "text/vnd.yaml;charset=utf-8"
        })
        this.$_send(`${prefix}${stringify(proxies)}${stringify(proxyGroups)}${rules}`)
    }
}
