import {applicationController} from "../../../UnityFrontUtils/controller/applicationController";
export class Img4kController extends applicationController{
    baseUrl = "http://cdn.apc.360.cn/index.php";
    constructor() {
        super()
    }

    /**
     * 渲染页面
     */
    index(){
        this.$_axios({
            url:this.baseUrl,
            method:"get",
            params:{
                a:"getAllCategoriesV2",
                c:"WallPaper",
                from:"360chrome",
            }
        }).catch(err=>this.$_error(err.message)).then((res:any)=>{
            this.Render({
                list:res.data.data
            });
        })
    }

    /**
     * 获取分类图片
     */
    getData_4k(){
        this.$_axios({
            url:this.baseUrl,
            method:"get",
            params:{
                a:"getAppsByCategory",
                c:"WallPaper",
                cid:this.$_query.id,
                start:this.$_query.pageNo,
                count:15,
            }
        }).catch(err=>this.$_error(err.message)).then((res:any)=>{
            this.$_success(res.data);
        })
    }

    /**
     * 下载图片
     */
    downloadImg(){
        this.$_fileStreamDownload(this.$_query.url);
    }
}