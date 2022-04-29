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
                    log_info:Buffer.from(JSON.stringify(this.$_body.errorData)).toString("base64"),
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
            if(!this.$_query.app_id){return this.$_error("字段【app_id】不存在")}
            const res = await new this.$sqlModel.LogUpModel()
                .select(["log_info"],"total")
                .from(" ")
                .join(` (${
                    new this.$sqlModel.LogUpModel()
                        .select("*,")
                        .COUNT()
                        .OVER()
                        .AS("total")
                        .from()
                        .where({
                            app_id:this.$_query.app_id,
                        })
                        .limit("creation_time",this.getPageLimit(this.$_query.pageNo, this.$_query.pageSize), true)
                        .getSql()
                }) a `)
                .query();
            this.$_success({
                code:0,
                list:res.map((e)=>{
                    try {
                        return {
                            ...e,
                            creation_time:this.$dayjs(e.creation_time).format("YYYY-MM-DD HH:mm:ss")
                        }
                    }catch (err){
                        console.log(err.message)
                        return  e;
                    }
                }),
                pageNo:this.$_query.pageNo,
                pageSize:this.$_query.pageSize,
                total: (res[0] || {}).total,
            });
        }catch (e) {
            this.$_error()
        }
    }
}
