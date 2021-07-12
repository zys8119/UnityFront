import applicationController, {method_post, method_get} from "../../../UnityFrontUtils/controller/applicationController";
import {writeFileSync, readFileSync, existsSync} from "fs"
import {resolve} from "path"
import {merge} from "lodash"
import axios from "axios";
import * as crypto from "crypto"
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
        })
    }
}
