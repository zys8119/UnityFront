import {applicationController} from "../../../UnityFrontUtils/controller/applicationController";
import {LaunchOptions, BrowserLaunchArgumentOptions, BrowserConnectOptions, Page, Browser} from "puppeteer"
import {parse} from "url"
export class IconfontController extends applicationController{
    constructor() {
        super();
    }

    async index(){
        const res = await this.$_puppeteer("https://www.iconfont.cn/login",<LaunchOptions & BrowserLaunchArgumentOptions & BrowserConnectOptions & {
            jsContentFn:any
            jsContentBeforeFn:any
        }>{
            slowMo:10,
            jsContentBeforeFn:async (page:Page)=>{
                let bool = false
                page.on("response", async e=>{
                    if(/detail\.json/.test(e.url()) && bool){
                        // 返回项目数据
                        try {
                            const icons = (await e.json()).data.icons
                            await page.evaluateHandle(function (icons){
                                (<any>window).$_puppeteer = icons
                            }, icons)
                            console.log("返回项目数据")
                        }catch (e){
                            console.error(e.message)
                        }
                    }
                })
                // 输入密码
                await new Promise(r=>setTimeout(r,500))
                await page.type("#userid",this.$_query.userid,{delay:0});
                await page.type("#password",this.$_query.password, {delay:0});
                await page.tap("#login-form > div:nth-child(4) > button");
                console.log("登陆")
                // 登陆成功跳转
                await new Promise(r=>setTimeout(r,500))
                // 进入项目管理
                await page.hover("#magix_vf_header > header > div > nav > ul > li:nth-child(4)")
                await page.tap("#magix_vf_header > header > div > nav > ul > li:nth-child(4) > ul > li:nth-child(4) > a")
                await new Promise(r=>setTimeout(r,6000))
                console.log("进入项目管理")
                // 选中指定项目
                await page.tap("#mx_16 > div.page-manage-left > div > div:nth-child(2) > div.nav-lists.J_scorll_project_corp > div:nth-child(3)")
                console.log("选中指定项目")
                bool = true;
                await new Promise(r=>setTimeout(r,500))
                console.log(5)
            },
            jsContentFn:()=>{
                return Promise.resolve((<any>window).$_puppeteer)
            }
        }).catch(err=>{
            this.$_error(err)
        })
        console.log(res,666)
        this.$_success(res)
    }

    async beiwai(index = 0){
        console.log("=============================================")
        const item = {
            "outlineCode": "1627536666049",
            "curriculumCode": "ZK_BWME3020_20210730203203938",
            "parentCode": "1594610914500628978",
            "name": "第4节 网站目标与客户体验设计",
            "outlineOrder": 609,
            "nodeType": "resource",
            "type": 400004,
            "src": "proxy/resource/591561725505966080",
            "times": 16.53,
            "id": "167037",
            "tid": "1685016",
            "suffix": "_360p.m3u8",
            "courseElementId": 1685016,
            "courseElementState": "0",
            "learnerCourseId": 4812739
        }
        const cookie =  "INGRESSCOOKIE=8068b2df631e8d2d268530503cbde8f1; JSESSIONID=C7B48DF109DA7730B531A9CA5DEDA007"
        const config = {
            userId: 629700,
            learnCourseId: item.learnerCourseId,
            courseElementId: item.courseElementId,
            loginName: "张云山",
            orgCode: "beiwaionline",
            learnerCourseId: item.learnerCourseId,
            clientSource: 190010110,
            stayTime:60,
        }
        const currIndex = index + (index === 0 ? 0 :1);
        const learnDetails = new Array(config.stayTime).fill(0).map((e,k)=>k+currIndex);
        const times = item.times*60;
        const lastLearnTime = currIndex + config.stayTime;
        const params = {
            userId: config.userId,
            loginName:config.loginName,
            orgCode: config.orgCode,
            learnerCourseId: config.learnerCourseId,
            clientSource: config.clientSource,
            stayTime: config.stayTime,
            courseElementId: config.courseElementId
        }
        console.log(params)
        const res = (await this.$_axios({
            method:"post",
            url:"https://study.ebeiwai.com/ws/studyservice/sendLearnDetailToMassdataTmp",
            params,
            // withCredentials:true,
            // headers:{
            //     cookie
            // }
        })).data
        const params2 = {
            userId: config.userId,
            loginName:config.loginName,
            orgCode: config.orgCode,
            learnerCourseId: config.learnerCourseId,
            clientSource: config.clientSource,
            lastLearnTime,
            learnDetails,
            courseElementId: config.courseElementId,
        }
        console.log(params2)
        const res2 = (await this.$_axios({
            method:"post",
            url:"https://study.ebeiwai.com/ws/studyservice/sendLearnDetailToMassdataTmp",
            params:params2,
            // withCredentials:true,
            // headers:{
            //     cookie,
            // },
            paramsSerializer(params){
                const result = Object.entries(params).map(([k,v]:[string,Array<number> & string])=>{
                    if(Object.prototype.toString.call(v) === "[object Array]"){
                        return v.map(e=>encodeURI(`${k}[]=${e}`)).join("")
                    }
                    return `${k}=${encodeURI(v)}`
                }).join("&");
                return result;
            }
        })).data
        console.log(index, times, index < times,learnDetails)
        console.log(res, res2)
        if(lastLearnTime < times){
            return await this.beiwai(lastLearnTime)
        }else {
            this.$_success("学习完成");
        }
    }

    async beiwaicourse(){
        const res3 = (await this.$_axios({
            method:"post",
            url:"https://study.ebeiwai.com/ws/studyservice/getStandedCourseOutline",
            params:{
                code: "ZK_BWME3020_20210730203203938",
                type: 1,
                courseId: 4204,
                learnCourseId: 4812739,
            }
        })).data
        console.log(JSON.stringify(res3.outlines
            .find(e=>e.outlineCode === "1627536111167"), null, 4));
        const tree = this.toTree(res3.outlines,{
            id:"outlineCode",
            parent:"parentCode",
        })
        console.log(tree)
        this.$_success();
    }
}