import PublicModel, {$sqlFieldConfigType, PublicModelInterface} from "../PublicModel";

export default class extends PublicModel implements PublicModelInterface{
    $TableName = "user";
    $sqlFieldConfig:$sqlFieldConfigType = {
        id:{
            varchar:"(10)",
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
        }
    };
    // PRIMARY_KEY = `('id')`;
    'CHARACTER SET' = 'utf8';
    COLLATE = `utf8_unicode_ci`;
    COMMENT =`'计划单BOM清单'`;
}
