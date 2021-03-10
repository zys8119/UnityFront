import applicationController, {method_post, method_get} from "../../../UnityFrontUtils/controller/applicationController";
import {ServerConfig, ServerPublicConfig} from "../../../UnityFrontUtils/config";
const path = require("path")
const fs = require("fs")
export class IndexController extends applicationController {
    constructor(){
        super();
    }



    /**
     * @name index
     * @body aa {object|any} 参数a
     * @params b {object} 参数b
     * @query b {object} 参数b
     * @query bb {object}
     * @query dd 参数b
     * @route /Dome/urlParams/:id/:b
     * @method post
     * @description asdasdasda
     */
    index(){
        console.log(`此平台是 ${process.platform}`);
        this.$_success({
            data:(<any>"_").repeat(100).split("").map((e,key)=>({
                name:"数据"+key,
                key
            }))
        });
    }

    /**
     */

    axios(){

        this.$_axios({
            url:"http://www.baidu.com"
        }).then(res=>{
            this.$_success(res.data);
        });
    }
    /**
     * @name dom
     */
    dom(){
        this.$_puppeteer("https://www.baidu.com/s?ie=UTF-8&wd="+this.$_query.q,()=>new Promise(resolve=>{
            let resData = [];
            resData.push.apply(resData,document.querySelectorAll(".c-container .t a"));
            let result =  resData.map((el:HTMLAnchorElement)=>({
                url:el.href,
                value:el.innerText
            }));
            resolve(result)
        })).then(res=>{
            this.$_success(res)
        }).catch(err=>{
            this.$_error(err);
        });
    }

    fileStreamDownload(){
        this.$_fileStreamDownload("https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576473666143&di=394e5a43bd77b3e34f8460da13fb26f8&imgtype=0&src=http%3A%2F%2Fwww.365heart.com%2Fmeeting%2Fxinjian%2FCICI2015%2F%25E4%25B8%2593%25E5%25AE%25B6%25E4%25B8%25AA%25E4%25BA%25BA%2F%25E9%2599%2588%25E6%2599%2596%2FCICI2015-0002604.JPG").catch((err)=>{
            this.$_error(err);
        });
    }

    encrypt(){
        this.$_success({
            a:this.$_encode({a:1,b:2}),
            b:this.$_decode((<string>this.$_encode({a:1,b:2}))),
            key:ServerPublicConfig.createEncryptKey,
        });
    }

    getImageCode(){
        this.$_getSvgCode();
    }

    codeTest(){
        this.$_success();
    }

    uploadTest(){
        this.Render()
    }

    //todo less 转 css
    getcss(){
        const less = require("less")
        if(!this.$_query.color){
            this.$_error("主题设置失败,颜色字段必填");
            return;
        }
        less.render(fs.readFileSync(path.resolve(__dirname,"../../../public/less/nbrd_red_new.less"),{encoding:"utf8"})+`.initTheme(${this.$_query.color});`,{})
        .then(({css})=> {
            if(this.$_query.type === "file"){
                //todo 文件流返回
                this.response.writeHead(200,{
                    'Access-Control-Allow-Origin': "*",
                    'Access-Control-Allow-Methods':'*',
                    'Access-Control-Allow-Headers':'*',
                    'Content-Type':`text/css; charset=utf-8;`,
                });
                this.response.end(css);
            }else {
                //todo 接口返回
                this.setHeaders({
                    'Access-Control-Allow-Headers': '*',
                });
                this.$_send({
                    code: 0,
                    data: css,
                    message: "success"
                });
            }
        }).catch(()=>{
            this.$_error("主题获取失败");
        });
    }

    @method_post(IndexController,"upload")
    upload(){
        this.$_getRequestFormData().then((res:any)=>{
            res.filter(e=>e.type === 'file').forEach(file=>{
                fs.writeFileSync(path.resolve(ServerConfig.Template.publicPath,'./upload',file.fileName),file.fileBuff)
            });
            this.$_success("上传成功",null,0);
        });
    }

    urlParams(){
        this.$_success(this.$_params);
    }

    userModel(){
        new this.$sqlModel.UserModel().getPage({
            pageNo:this.$_query.pageNo,
        }).then(res=>this.$_success(res)).catch(()=>this.$_error());
    }

    driveLetter(){
        var d = require('diskinfo');

        d.getDrives((err, aDrives) =>{
            this.$_success(aDrives);
        });
    }

    editor(){
        this.Render();
    }

    /**
     * 查询当前socket在线人数
     */
    socketList(){
        const userList = Object.keys(ServerConfig.ws_user).map(k=>{
            const {socket, ...resUlt} = ServerConfig.ws_user[k];
            return resUlt
        });
        this.$_success(userList);
    }

    /**
     * 保存同屏canvas base64 数据
     * @constructor
     */
    SameScreen(){
        this.$ControllerConfig.SameScreen = this.$_body.img;
        this.$_success("保存成功",null,0);
    }

    /**
     * 获取同屏canvas base64 数据
     */
    getSameScreen(){
        this.$_success("成功",{
            img:this.$ControllerConfig.SameScreen
        },0);
    }

    getFileData(){
        this.request.setTimeout(0);
        this.$_getRequestFormData().then(res=>{
            console.log(res)
            this.$_success(null,{

            },0);
        })

    }

    /**
     * 获取文件上传
     */
    onlyOfficeFilesUpload(){
        this.$_getRequestFormData().then((res:any)=>{
            let file = res.filter(e=>e.type === "file")[0];
            let filePath = path.resolve(__dirname,"../../../public",file.fileName)
            fs.writeFileSync(filePath,file.fileBuff)
            new this.$sqlModel.OnlyOfficeModel().insert({
                name:file.fileName,
            }).query().then(()=>{
                this.$_success(null,null, 0)
            }).catch(()=>{
                this.$_error();
            })
        })
    }

    /**
     * 获取文件列表
     */
    onlyOfficeFiles(){
        new this.$sqlModel.OnlyOfficeModel().select().from().query().then(res=>{
            this.$_success(null,res,0)
        }).catch(()=>{
            this.$_error();
        })
    }

    /**
     * 服务端保存
     */
    @method_post(IndexController,"onlyOffice")
    onlyOffice(){
        if(this.$_body.status === 6){
            console.log(this.$_body)
        }
        this.$_send({
            error:0,
            data:{
                a:1
            }
        })
    }

    /**
     * 文件转换
     */
    onlyOfficeDocbuilder(){
        this.$_axios({
            url:"http://192.168.1.107:9000/docbuilder",
            method:"post",
            data:{
                async:true,
                url:"http://192.168.1.107:81/public/a.pdf"
            }
        }).then(res=>{
            console.log(res.data)
            this.$_axios({
                url:"http://192.168.1.107:9000/ConvertService.ashx",
                method:"post",
                data:{
                    async:false,
                    filetype:"pdf",
                    outputtype:"jpg",
                    key:res.data.key,
                    // key:"45",
                    url:"http://192.168.1.107:81/public/a.pdf"
                }
            }).then(res=>{
                console.log(res.data)
                this.$_success()
            }).catch(()=>this.$_error())
        }).catch(()=>this.$_error())
    }

    /**
     * 3d案例
     */
    '3d'(){
        this.Render();
    }

    /**
     * 钉钉机器人消息发送
     * 开发文档：https://ding-doc.dingtalk.com/doc#/serverapi2/qf2nxq
     */
    dingtalkSend(){
        let timestamp = Date.now();
        let access_token = "";
        const crypto = require('crypto');
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
            data:{
                msgtype: "text",
                text: {
                    content: '\n前端更新：' +
                        '\n1、更新项目名称：' +
                        '\n2、更新环境：正式/测试/其他' +
                        '\n3、更新目录标明   更新分支说明' +
                        '\n4、更新内容说明（回滚使用）：' +
                        '\n5、备注说明：'
                },
                at:{
                    atMobiles:[
                    ],
                    isAtAll:true,
                }
            }
        }).then(res=>{
            this.$_success(res.data);
        }).catch(err=>{
            this.$_error(err)
        })
    }

    git(){
        // 24903929a75a8cfc6077a47cd8d2c86f69034014
        // 1c82c5ec537ad053c0cf76de02879dca365dc57a
        // let p = path.resolve(__dirname,"../../../",".git/objects/24/903929a75a8cfc6077a47cd8d2c86f69034014");
        // let f = fs.readFileSync(p);
        // console.log(f)
        // console.log(f.forEach(e=>{
        //     console.log(e, e.toString(16), Buffer.from("张"))
        // }))

        this.$_success("az@09xY-.阿斯顿卡省的".split("").map(e=>this.getUnicode(e)))
    }

    getUnicode(str){
        let res = [...(<any>Buffer.from(str))]
            .map(e=> e.toString(2))
            .join("")
            .match(/\d{0,8}/g)
            .filter(e=>e)
            .map((e,i , arr)=> {
                if(arr.length === 1){
                    return (<any>"0").repeat(8 - e.length)+e;
                }
                if(arr.length === 3){
                    return e.replace(new RegExp(`^\\d{${i === 0 ? 4 : 2}}`),"")
                }
                return e;
            })
            .join("")
            .match(/\d{4}/g)
            .map(e=>parseInt(e,2).toString(16))
            .join("");
        return res.length < 4 ?  (<any>"0").repeat(4 - res.length)+res:res;
    }

    chart(){
        this.$_success([
            {value: Math.random()*100, name: '已提交', itemStyle:{color:"#4F8BFE"}},
            {value: Math.random()*100, name: '未提交', itemStyle:{color:"#44BED9"}},
        ],null,0)
    }

    /**
     * vpn账号获取
     */
    vpn(){

        this.$_axios({
            url:this.$_query.url || "https://jiang.netlify.app/",
            method:"get"
        }).then(res=>{
            let base64 = res.data;
            let vpnLogData = this.bufferSplit(Buffer.from(base64,"base64"),"\n").map(e=>e.toString()).map(e=>{
                let b = e.replace(/^.*\/\//img,"");
                let c = Buffer.from(b,"base64").toString();
                try {
                    return  JSON.parse(c);
                }catch (e){
                    let cs = c.split(":");
                    try {
                        return {
                            "address": cs[1].split("@")[1],
                            "method": cs[0],
                            "password": cs[1].split("@")[0],
                            "port": (port=>{
                                if(port.length > 5){
                                    let portMatch = port.match(/.{5}/)
                                    return portMatch ? portMatch[0] : null;
                                }else {
                                    return port;
                                }
                            })(cs[2]),
                        };
                    }catch (e) {
                        return null;
                    }
                }
            }).filter(e=>e);
            this.$_createLog(vpnLogData,"vpnLog")
            this.$_success("vpn同步成功",vpnLogData);
        }).catch((err)=>{
            this.$_error(err)
        })
    }

    /**
     * 创建占位符图片
     * @constructor
     */
    CreatePicture(){
        this.$createPicture()
    }

    pdf(){
        const puppeteer = require('puppeteer');
        // (async () => {
        //     const browser = await puppeteer.launch();
        //     const page = await browser.newPage();
        //     // await page.goto('https://news.ycombinator.com', {
        //     // await page.goto('https://www.baidu.com', {
        //     await page.goto('https://snpctest.zhijiasoft.com/media/npc_pc_new_all/#/login', {
        //         waitUntil: 'networkidle2',
        //     });
        //     await page.pdf({ path: 'hn.pdf', format: 'A4' });
        //
        //     await browser.close();
        //     this.$_success()
        // })();
        (async () => {
            const browser = await puppeteer.launch({
                // devtools:true,
                // headless:false,
                // defaultViewport:null
            });
            const page = await browser.newPage();
            await page.on("load",()=>{
                (async ()=>{
                    let opt = {
                        // fullPage:true,
                        path:'hn.pdf',
                        format: 'A4',
                    }
                    await page.pdf(opt)
                    await browser.close();
                })()
            })
            // await page.goto("https://www.baidu.com",{
            //     waitUntil: 'networkidle2',
            // })
            await page.goto("https://snpctest.zhijiasoft.com/media/npc_pc_new_all/")

            this.$_success()
        })();
    }

    /**
     * PDF 解析
     */
    pdfParsing(){
        let cont = fs.readFileSync(path.resolve(__dirname,"a.pdf"));
        let data = [];
        let stream = [];
        let isStream = false;
        this.bufferSplit(cont,"\n").forEach(e=>{
            if(e.indexOf(Buffer.from("stream")) > -1){
                data.push({
                    buf:e,
                    type:"info"
                });
                isStream = true;
                if(e.indexOf(Buffer.from("endstream")) > -1){
                    isStream = false;
                }
            }else {
                if(isStream){
                    stream.push(e)
                }else {
                    let itemData = {}
                    if(stream.length === 0){
                        itemData = {
                            buf:e,
                            type:"info"
                        }
                    }else {
                        itemData = {
                            buf:Buffer.concat(stream.map((e,k,a)=>(k === (a.length - 1)) ? e : Buffer.concat([e,Buffer.from("\n")]))),
                            type:"stream"
                        }
                    }
                    data.push(itemData);
                    stream = [];
                }
            }
        })
        const zlib = require("zlib");
        data = data.map(e=> {
            let content = null;
            if(e.type === 'stream'){
                content = zlib.unzipSync(e.buf).toString();
            }else {
                content = e.buf.toString()
            }
            return  {
                ...e,
                content
            }
        })
        let pdfObjData:any = {}
        console.log(data)
        data.forEach(item=>{
            let info = (pdfObjData.info = pdfObjData.info || {});
            if(item.type === "info" && /^%PDF/.test(item.content)){
                info.version = (item.content.match(/(\d{1,}\.\d{1,})|(\d{1,})/) || [])[0] || null;
            }
            else if(item.type === "info" && /^\/CreationDate/.test(item.content)){
                info.CreationDate = ((item.content.match(/\d{1,}/) || [])[0] || "").replace(/(\d{4})(\d{2})(\d{2})/,"$1-$2-$3 ");
            }
            else if(item.type === "info" && /^\/ModDate/.test(item.content)){
                info.ModDate = ((item.content.match(/\d{1,}/) || [])[0] || "").replace(/(\d{4})(\d{2})(\d{2})/,"$1-$2-$3");
            }
            else if(item.type === "info" && /^<<\/Creator/.test(item.content)){
                info.Creator = item.content.replace(/<<|\/Creator/g,"")
            }
            else if(item.type === "info" && /^\/Producer/.test(item.content)){
                info.Producer = item.content.replace("/Producer","")
            }
        })
        console.log(pdfObjData)
        this.$_success()
    }

    html(){
        this.Render()
    }
    test(){
        this.$_success()
    }
    print(){
        // 查询打印机端口
        //reg query "HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Ports" /s
        (async ()=>{
            var net = require('net');
            var client = new net.Socket();
            var buffer = fs.readFileSync(path.resolve(__dirname,"print.pdf"))
            console.log(buffer)
            await new Promise(resolve => {
                client.connect(1106, "192.168.2.154", function () {
                    client.write(buffer, function(){
                        resolve();
                    });
                });
            })
            this.$_success()
        })()
    }
}
