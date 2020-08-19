import applicationController, {method_post} from "../../../UnityFrontUtils/controller/applicationController";
import {ServerConfig, ServerPublicConfig} from "../../../UnityFrontUtils/config";
const path = require("path")
const fs = require("fs")
const less = require("less")
export class IndexController extends applicationController {
    constructor(){
        super();
    }

    index(){
        this.$_success();
    }

    axios(){
        this.$_axios({
            url:"http://www.baidu.com"
        }).then(res=>{
            this.$_success(res.data);
        });
    }

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
        let UserModel = new this.$sqlModel.UserModel();
        UserModel.getPage({
            TableName:UserModel.$TableName + " as a",
            select:`a.id,a.name `,
        },function (bool) {
            if(bool){
                this.join({
                    'test2 as b':'a.id = b.pid'
                })
            }
        }).then(res=>{
            this.$_success(res);
            // Promise.all(res.list.map(e=>{
            //     return this.DB().select()
            //         .from("test2")
            //         .where({
            //             pid:e.id,
            //         }).query()
            // })).then(bb=>{
            //     this.$_success({
            //         ...res,
            //         list:res.list.map((e,i)=>({
            //             ...e,
            //             data:bb[i],
            //         }))
            //     });
            // }).catch((err)=>this.$_error(err));
        }).catch((err)=>this.$_error(err));
    }
}
