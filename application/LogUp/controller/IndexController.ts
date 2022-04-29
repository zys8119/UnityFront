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
            const pageNo = Number(this.$_query.pageNo) || 1
            const pageSize = Number(this.$_query.pageSize) || 15
            if(!this.$_query.app_id){return this.$_error("字段【app_id】不存在")}
            if(!/^[0-9]*$/.test(pageNo as any)){return this.$_error("字段【pageNo】不是数字")}
            if(!/^[0-9]*$/.test(pageSize as any)){return this.$_error("字段【pageSize】不是数字")}
            const res = await new this.$sqlModel.LogUpModel().query(`
            
            SELECT * FROM 
                  (SELECT *,COUNT(1) OVER() AS total
                   FROM log_up
                   WHERE app_id = '${this.$_query.app_id}' limit ${(pageNo-1)*pageSize}, ${pageSize}) a 
            order by creation_time desc
            `)
            this.$_success({
                code:0,
                list:res.map(e=>{
                    try {
                        return {
                            ...e,
                            log_info:null,
                            creation_time:this.$dayjs(e.creation_time).format("YYYY-MM-DD HH:mm:ss")
                        }
                    }catch (err){
                        console.log(err.message)
                        return  e;
                    }
                }),
                pageNo,
                pageSize,
                total: (res[0] || {}).total,
            });
        }catch (e) {
            this.$_error()
        }
    }
}
