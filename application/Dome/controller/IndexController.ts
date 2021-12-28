import applicationController from "../../../UnityFrontUtils/controller/applicationController";
import * as crypto from "crypto"
import {extend} from "lodash";
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
        const res:Array<{id:number}> = await this.DB().select().from("test").where({
            "name REGEXP ":"17560",
        }).asc("name").query();
        console.log(res)
        this.$_success()
    }

    async test3(){
        const data = new Array(100000).fill(0).map((e,b)=>({
            name:Math.random()*10000,
            b
        }))
        await this.DB().insert("test",data).query()
        this.$_success()
    }
}
