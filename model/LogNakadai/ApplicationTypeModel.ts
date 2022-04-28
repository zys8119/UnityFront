import PublicModel, {$sqlFieldConfigType, PublicModelInterface} from "../PublicModel";

export default class ApplicationTypeModel extends PublicModel implements PublicModelInterface{
    $TableName = "log_nakadai_application_type";
    // PRIMARY_KEY = `('id')`;
    'CHARACTER SET' = 'utf8';
    COLLATE = `utf8_unicode_ci`;
    COMMENT =`'日志中台-应用类型表'`;
    $sqlFieldConfig:$sqlFieldConfigType = {
        id:{
            varchar:"(255)",
            'CHARACTER SET':'utf8',
            COLLATE:'utf8_unicode_ci',
            NOT:'NULL',
            DEFAULT:`''`,
            COMMENT:`'应用类型id'`,
        },
        name:{
            varchar:"(255)",
            'CHARACTER SET':'utf8',
            COLLATE:'utf8_unicode_ci',
            NOT:'NULL',
            DEFAULT:`''`,
            COMMENT:`'应用类型名称'`,
        },
        is_del:{
            int:"(255)",
            NOT:'NULL',
            DEFAULT:`'1'`,
            COMMENT:`'是否删除：1 未删除、2 已删除'`,
        },
    }
}
