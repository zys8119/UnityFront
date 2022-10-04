import {applicationController} from "../../../UnityFrontUtils/controller/applicationController";
import {readFileSync, writeFileSync} from "fs";
import {resolve} from "path";
import {createHash} from "crypto";
export class WexinController extends applicationController {
    private UpdateInterval = 86400000;// 更新间隔时间，默认一天更新一次
    // 公众号appid
    appid = "";
    // 公众号密钥
    secret = "";
    constructor() {
        super();
    }

    /**
     * 微信服务器校验接口
     */
    wxRedirect(){
        this.response.end(this.$_query.echostr);
    }

    /**
     * 获取微信Access token
     */
    async getAccessToken(bool?:boolean){
        return new Promise((_resolve,reject)=>{
            const filepath = resolve(__dirname, "./AccessToken.json");
            let AccessToken:any = {};
            try {
                AccessToken = JSON.parse(readFileSync(filepath));
            }catch(e){};
            let expires_in = AccessToken.expires_in || 0;
            if(Date.now() >  expires_in){
                this.$_axios({
                    url:"https://api.weixin.qq.com/cgi-bin/token",
                    params:{
                        grant_type:"client_credential",
                        appid:this.$_query.appid || this.appid,
                        secret:this.$_query.secret || this.secret
                    }
                }).then(res=>{
                    console.log("更新AccessToken")
                    let data = res.data || {};
                    data.expires_in = (Date.now()+ (data.expires_in || 0))
                    writeFileSync(filepath,JSON.stringify(data,null,4));
                    if(bool){
                        _resolve(data);
                    }else{
                        this.$_success(null,data,0);
                    }
                }).catch(()=>{
                    reject();
                    if(bool){
                        reject();
                    }else{
                        this.$_error();
                    }
                });
            }else{
                console.log("获取缓存AccessToken")
                if(bool){
                    _resolve(AccessToken);
                }else{
                    this.$_success(null,AccessToken,0);
                }
            }
        })
    }

    /**
     * 获取微信ticket
     */
    async getticket(bool?:boolean){
        return new Promise((_resolve,reject)=>{
            const filepath = resolve(__dirname, "./ticket.json");
            let AccessToken:any = {};
            try {
                AccessToken = JSON.parse(readFileSync(filepath));
            }catch(e){};
            let expires_in = AccessToken.expires_in || 0;
            if(Date.now() >  expires_in){
                this.getAccessToken(true).then(({access_token})=>{
                    this.$_axios({
                        url:"https://api.weixin.qq.com/cgi-bin/ticket/getticket",
                        params:{
                            access_token:access_token,
                            type:"jsapi",
                        }
                    }).then(res=>{
                        console.log("更新ticket")
                        let data = res.data || {};
                        data.expires_in = (Date.now()+ (data.expires_in || 0))
                        writeFileSync(filepath,JSON.stringify(data,null,4));
                        if(bool){
                            _resolve(data);
                        }else{
                            this.$_success(null,data,0);
                        }
                    }).catch(()=>{
                        reject();
                        if(bool){
                            reject();
                        }else{
                            this.$_error();
                        }
                    });
                })
            }else{
                console.log("获取缓存ticket")
                if(bool){
                    _resolve(AccessToken);
                }else{
                    this.$_success(null,AccessToken,0);
                }
            }
        })
    }

    /**
     * 获取微信签名
     * 签名校验工具 http://mp.weixin.qq.com/debug/cgi-bin/sandbox?t=jsapisign
     */
    async getwxSignature(){
        this.getticket(true).then(({ticket})=>{
            var config:any = {
                jsapi_ticket: ticket,
                nonceStr: this.createNonceStr(),
                timestamp: this.createTimestamp(),
                url: this.$_query.url
            };
            var string = this.raw(config)
            console.log(string)
            config.signature = this.sha1(string)
            config.appId = this.$_query.appid || this.appid;
            this.$_success(null,config,0);
        }).catch(()=>this.$_error())
    }

    // sha1加密
     sha1(str) {
        let shasum = createHash("sha1")
        shasum.update(str)
        str = shasum.digest("hex")
        return str
    }

    /**
     * 生成签名的时间戳
     * @return {字符串}
     */
     createTimestamp() {
        // @ts-ignore
        return parseInt(new Date().getTime() / 1000) + ''
    }

    /**
     * 生成签名的随机串
     * @return {字符串}
     */
     createNonceStr() {
        return Math.random().toString(36).substr(2, 15)
    }

    /**
     * 对参数对象进行字典排序
     * @param  {对象} args 签名所需参数对象
     * @return {字符串}    排序后生成字符串
     */
     raw(args) {
        var keys = Object.keys(args)
        keys = keys.sort()
        var newArgs = {}
        keys.forEach(function (key) {
            newArgs[key.toLowerCase()] = args[key]
        })

        var string = ''
        for (var k in newArgs) {
            string += '&' + k + '=' + newArgs[k]
        }
        string = string.substr(1)
        return string
    }
}