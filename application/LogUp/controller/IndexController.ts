import {applicationController, method_post, method_get} from "../../../UnityFrontUtils/controller/applicationController";

export class IndexController extends applicationController {
    constructor() {
        super();
    }

    /**
     * 日志上报
     window.localStorage.LogUpUserInfo = JSON.stringify({
        userId:null,
        userTag:null,
        appId:null,
        projectVersion:null,
    })
     */
    @method_post(IndexController, "index")
    async index(){
        try {
            let LogUpUserInfo = {
                userId:null,
                userTag:null,
                appId:null,
                projectVersion:null,
            };
            try {
                LogUpUserInfo = {
                    ...JSON.parse(this.$_body.localStorage.LogUpUserInfo)
                }
            }
            catch (e) {
                // err
            }
            const ufUserInfoArr = Object.entries(LogUpUserInfo)
            if(ufUserInfoArr.filter(e=>e[1] !== null).length === ufUserInfoArr.length){
                await new this.$sqlModel.LogUpModel().insert({
                    id:Date.now(),
                    log_info:JSON.stringify(this.$_body.errorData),
                    creation_time:this.$dayjs().format().toString(),
                    type:this.$_body.type,
                    app_id:LogUpUserInfo.appId,
                    project_version:LogUpUserInfo.projectVersion,
                    user_id:LogUpUserInfo.userId,
                    user_tag:LogUpUserInfo.userTag,
                }).query()
                this.$_success("上报成功")
            }else {
                this.$_error("上报失败, 请正确配置 LogUpUserInfo")
            }
        }catch (e){
            console.error(e)
            this.$_log(e)
            this.$_error("上报失败")
        }
    }

    /**
     * 获取日志详情
     */
    @method_get(IndexController, "get")
    async get(){
        try {
            const id = this.$_query.id;
            const res = await new this.$sqlModel.LogUpModel().getPage({
                pageNo:this.$_query.pageNo || 0,
                pageSize:this.$_query.pageSize || 15,
                search:id,
                like:{
                    app_id:true,
                }
            }, null , function (){
                this.where({
                    app_id:id
                })
            })
            console.log(res)
            this.$_success(res.map(e=>e));
        }catch (e) {
            this.$_error()
        }
    }
}
