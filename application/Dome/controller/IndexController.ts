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

    async test(){
        this.$_success(await this.$_puppeteer(`https://tool.lu/videoparser`, ()=>{
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
                    "body": "url=https%3A%2F%2Fv.qq.com%2Fx%2Fcover%2Fmzc00200y4wycre.html%3Freport_recomm_player%3Dptag%253Dv_qq_com%257Crtype%253Dcid%257CalgId%253D5419%257CbucketId%253DEXP%253ARERANK%253D10156%257CNRBE%253D10156%257CPROFILE%253D10156%257CSELECTOR%253D10156%257CENGINE%253D10156%257CRANK%253D10156%257CINDEX%253D10156%257CACCESS%253D10156%257Creason%253D%257CreasonType%253D%257Ccid%253Dmzc00200y4wycre%257Cvid%253D%257Cpid%253D%257Cmodule%253D%25E7%2584%25A6%25E7%2582%25B9%25E5%259B%25BE%257CpageType%253DfilmIndex%257Cseqnum%253D1911203982_1626667218.43477_8038%257Cvideo_rec_report%253Dis_insert%253A%257Cinsert_type%253A%257Cload_type%253A%257Cflow_rule_id%253A156%257Ca_exp_id%253ARERANK-10156%2523NRBE-10156%2523PROFILE-10156%2523SELECTOR-10156%2523ENGINE-10156%2523RANK-10156%2523INDEX-10156%2523ACCESS-10156%257Ca_src_key%253A100137%257Ca_seqnum%253A1911203982_1626667218.43477_8038%257Ca_area_code%253A%257Ca_scene_type%253A2%257Creturn_item_num%253A37%257Ce_module_type%253A410%257C%257Ca_module_id%253A20190423006136%257Ce_item_id%253Amzc00200y4wycre%257Ce_item_type%253A13%257Ce_item_mixid%253A%257C%257Ca_alg_id%253A5419%257Ca_alg_type%253A0%257Citem_score%253A0.003337",
                    "method": "POST",
                    "mode": "cors",
                    "credentials": "include"
                }).then((res:any)=>{
                    res.json().then(res=>{
                        resolve1(res)
                    })
                })
            })
        }))
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
}
