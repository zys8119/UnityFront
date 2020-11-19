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
            COMMENT:`'用户id'`,
        },
        username:{
            varchar:"(255)",
            NOT:'NULL',
            COMMENT:`'账号'`,
        },
        name:{
            varchar:"(255)",
            COMMENT:`'用户名称'`,
        },
        password:{
            varchar:"(255)",
            NOT:'NULL',
            COMMENT:`'密码'`,
        },
        phone:{
            varchar:"(255)",
            COMMENT:`'手机号码'`,
        },
        email:{
            varchar:"(255)",
            COMMENT:`'邮箱'`,
        },
        avatar:{
            text:"",
            COMMENT:`'头像'`,
        },
        type:{
            int:"(10)",
            COMMENT:`'账号类型；0 管理员、1 普通管理用户、2 api用户、3 其他'`,
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
    // 账号：admin
    // 密码：admin
    $VALUES = `
        INSERT INTO \`user\` VALUES ('671b1f4f7fbe7927ebe7740b6acf75ad', 'admin', '管理员', '21232f297a57a5a743894a0e4a801fc3', '18700000000', 'UnityFront@qq.com', ' ', '0', '1');
    `
}
