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
        this.$_getRequestFormData().then(res=>{
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

    @method_post(IndexController,"onlyOffice")
    onlyOffice(){
        this.$_getRequestFormData().then(res=>{
            console.log(this.$_body,res)
            if(this.$_body.status === 2){
                console.log(this.$_body.url)
            }
            this.$_send({
                error:0,
            })
        })
    }

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
                        "17858938961",// 群昵称：秦慧桦(秦慧桦)
                        "13857483191",// 群昵称：陈周云(陈周云)
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
}
