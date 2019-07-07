import Utils from "../../UnityFrontUtils/utils"
import { TimingTaskQueue } from "../../UnityFrontUtils/config"
const path = require("path");
const fs = require("fs");
export class LogTask {
    constructor(){
        //是否开启任务
        if(!TimingTaskQueue.isClearLogTime){
            return;
        }
        //获取需要保留的时间
        if(!TimingTaskQueue.LogsRetainTime){
            return;
        }
        let DateObj = new Date();
        let getTime =  +JSON.stringify(DateObj.getTime());
        //指定时间内才执行,以减少服务器资源消耗
        if(TimingTaskQueue.ClearLogAppointTime){
            return;
        }
        let AppointTime =  TimingTaskQueue.ClearLogAppointTime(DateObj);
        let AppointTimeMin = AppointTime-TimingTaskQueue.ClearLogTimeFrame;
        let AppointTimeMax = AppointTime+TimingTaskQueue.ClearLogTimeFrame;
        if(AppointTime && getTime >= AppointTimeMin && getTime <= AppointTimeMax){
            return;
        }
        let RetainTime = TimingTaskQueue.LogsRetainTime;
        let MaxTime = getTime - RetainTime;
        //判断日志文件是需要保留
        let logs = Utils.getJsonFiles(path.resolve(__dirname,"../../UnityFrontUtils/log")).map(logItem=>{
            return {
                path:logItem,
                time:+(logItem.replace(/\.log$/g,"").split("__Time__")[1])
            };
        });
        logs.forEach(logItem=>{
            //删除不需要保留的日志文件
            if(logItem.time < MaxTime){
                fs.unlinkSync(logItem.path);
            }
        });
    }
}