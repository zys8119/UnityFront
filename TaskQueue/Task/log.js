"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../../UnityFrontUtils/utils");
var config_1 = require("../../UnityFrontUtils/config");
var path = require("path");
var fs = require("fs");
var LogTask = /** @class */ (function () {
    function LogTask() {
        //是否开启任务
        if (!config_1.TimingTaskQueue.isClearLogTime) {
            return;
        }
        //获取需要保留的时间
        if (!config_1.TimingTaskQueue.LogsRetainTime) {
            return;
        }
        var DateObj = new Date();
        var getTime = +JSON.stringify(DateObj.getTime());
        //指定时间内才执行,以减少服务器资源消耗
        if (config_1.TimingTaskQueue.ClearLogAppointTime) {
            return;
        }
        var AppointTime = config_1.TimingTaskQueue.ClearLogAppointTime(DateObj);
        var AppointTimeMin = AppointTime - config_1.TimingTaskQueue.ClearLogTimeFrame;
        var AppointTimeMax = AppointTime + config_1.TimingTaskQueue.ClearLogTimeFrame;
        if (AppointTime && getTime >= AppointTimeMin && getTime <= AppointTimeMax) {
            return;
        }
        var RetainTime = config_1.TimingTaskQueue.LogsRetainTime;
        var MaxTime = getTime - RetainTime;
        //判断日志文件是需要保留
        var logs = utils_1.default.getJsonFiles(path.resolve(__dirname, "../../UnityFrontUtils/log")).map(function (logItem) {
            return {
                path: logItem,
                time: +(logItem.replace(/\.log$/g, "").split("__Time__")[1])
            };
        });
        logs.forEach(function (logItem) {
            //删除不需要保留的日志文件
            if (logItem.time < MaxTime) {
                fs.unlinkSync(logItem.path);
            }
        });
    }
    return LogTask;
}());
exports.LogTask = LogTask;
