import PublicModel, {$sqlFieldConfigType, PublicModelInterface} from "../PublicModel";

export default class extends PublicModel implements PublicModelInterface{
    $TableName = "log_up";
    $sqlFieldConfig:$sqlFieldConfigType = {
        id:{
            varchar:"(255)",
            'CHARACTER SET':'utf8',
            COLLATE:'utf8_unicode_ci',
            NOT:'NULL',
            DEFAULT:`''`,
            COMMENT:`'日志id'`,
        },
        log_info:{
            longtext:"",
            COMMENT:`'日志数据'`,
        },
        status:{
            int:"(10)",
            COMMENT:`'日志是否删除；1 未删除、2 已删除'`,
            NOT:'NULL',
            DEFAULT:`'1'`,
        },
        creation_time:{
            varchar:"(255)",
            COMMENT:`'日志创建时间'`,
            NOT:'NULL',
            DEFAULT:`''`,
        },
        type:{
            text:"",
            COMMENT:`'上报类型'`,
        },
        app_id:{
            text:"",
            COMMENT:`'上报应用id'`,
        },
        project_version:{
            text:"",
            COMMENT:`'上报项目id'`,
        },
        user_id:{
            text:"",
            COMMENT:`'上报用户id'`,
        },
        user_tag:{
            text:"",
            COMMENT:`'上报用户标识'`,
        },
    };
    // PRIMARY_KEY = `('id')`;
    'CHARACTER SET' = 'utf8';
    COLLATE = `utf8_unicode_ci`;
    COMMENT =`'前端日志上报收集表'`;
}
