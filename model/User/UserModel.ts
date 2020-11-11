import PublicModel, {$sqlFieldConfigType, PublicModelInterface} from "../PublicModel";

export default class extends PublicModel implements PublicModelInterface{
    $TableName = "user";
    $sqlFieldConfig:$sqlFieldConfigType = {
        id:{
            varchar:"(255)",
            'CHARACTER SET':'utf8',
            COLLATE:'utf8_unicode_ci',
            NOT:'NULL',
            DEFAULT:`''`,
            COMMENT:`'用户'`,
        },
        username:{
            varchar:"(255)",
            NOT:'NULL',
            COMMENT:`'账号'`,
        },
        password:{
            varchar:"(255)",
            NOT:'NULL',
            COMMENT:`'密码'`,
        },
        email:{
            varchar:"(255)",
            COMMENT:`'邮箱'`,
        },
        type:{
            int:"(10)",
            COMMENT:`'账号类型；0 管理员、1 普通用户、2 api用户'`,
            NOT:'NULL',
            DEFAULT:`'1'`,
        },
        status:{
            int:"(10)",
            COMMENT:`'账号是否删除；1 未删除、2 已删除'`,
            NOT:'NULL',
            DEFAULT:`'1'`,
        }
    };
    // PRIMARY_KEY = `('id')`;
    'CHARACTER SET' = 'utf8';
    COLLATE = `utf8_unicode_ci`;
    COMMENT =`'用户表'`;
}
