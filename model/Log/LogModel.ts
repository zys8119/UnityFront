import PublicModel, {$sqlFieldConfigType, PublicModelInterface} from "../PublicModel";

export default class extends PublicModel implements PublicModelInterface{
    $TableName = "log";
    $sqlFieldConfig:$sqlFieldConfigType = {
        id:{
            varchar:"(255)",
            'CHARACTER SET':'utf8',
            COLLATE:'utf8_unicode_ci',
            NOT:'NULL',
            DEFAULT:`''`,
            COMMENT:`'日志id'`,
        },
        log_user_id:{
            varchar:"(255)",
            COMMENT:`'日志所属用户id'`,
        },
        log_info:{
            text:"",
            COMMENT:`'日志数据'`,
        },
        type:{
            int:"(10)",
            COMMENT:`'日志类型；1 登录日志'`,
            NOT:'NULL',
            DEFAULT:`'1'`,
        },
        status:{
            int:"(10)",
            COMMENT:`'日志是否删除；1 未删除、2 已删除'`,
            NOT:'NULL',
            DEFAULT:`'1'`,
        }
    };
    // PRIMARY_KEY = `('id')`;
    'CHARACTER SET' = 'utf8';
    COLLATE = `utf8_unicode_ci`;
    COMMENT =`'日志表'`;
}