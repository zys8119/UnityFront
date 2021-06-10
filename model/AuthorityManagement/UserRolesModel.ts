import PublicModel, {$sqlFieldConfigType, PublicModelInterface} from "../PublicModel";

export default class extends PublicModel implements PublicModelInterface{
    $TableName = "user_roles";
    $sqlFieldConfig:$sqlFieldConfigType = {
        id:{
            varchar:"(255)",
            'CHARACTER SET':'utf8',
            COLLATE:'utf8_unicode_ci',
            NOT:'NULL',
            DEFAULT:`''`,
            COMMENT:`'用户角色id'`,
        },
        user_id:{
            text:"",
            NOT:'NULL',
            COMMENT:`'用户id'`,
        },
        user_roles_id:{
            text:"",
            NOT:'NULL',
            COMMENT:`'角色id组'`,
        },
        is_del:{
            int:"(255)",
            NOT:'NULL',
            DEFAULT:`'1'`,
            COMMENT:`'是否删除：1 未删除、2 已删除'`,
        },
    }
    'CHARACTER SET' = 'utf8';
    COLLATE = `utf8_unicode_ci`;
    COMMENT =`'用户角色表'`;
    $VALUES = `
        INSERT INTO \`user_roles\` VALUES ('1605749712856', '671b1f4f7fbe7927ebe7740b6acf75ad', '1605671372549,1605687789796', '1');
        INSERT INTO \`user_roles\` VALUES ('1605770691801', '1f979d7ffc039899544ade187417c9ab', '1605770674641', '1');
    `
}