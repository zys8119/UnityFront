import PublicModel, {$sqlFieldConfigType, PublicModelInterface} from "../PublicModel";

export default class extends PublicModel implements PublicModelInterface{
    $TableName = "roles";
    $sqlFieldConfig:$sqlFieldConfigType = {
        id:{
            varchar:"(255)",
            'CHARACTER SET':'utf8',
            COLLATE:'utf8_unicode_ci',
            NOT:'NULL',
            DEFAULT:`''`,
            COMMENT:`'角色id'`,
        },
        name:{
            varchar:"(255)",
            NOT:'NULL',
            COMMENT:`'角色名称'`,
        },
        type:{
            varchar:"(255)",
            NOT:'NULL',
            DEFAULT:`'1'`,
            COMMENT:`'角色分类：1 后台、2 前台、3 其他'`,
        },
        description:{
            text:"",
            COMMENT:`'角色描述'`,
        },
        is_effective:{
            int:"(255)",
            NOT:'NULL',
            DEFAULT:`'1'`,
            COMMENT:`'角色是否有效：1 有效、2 无效'`,
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
    COMMENT =`'角色表'`;
    $VALUES = `
        INSERT INTO \`roles\` VALUES ('1605671372549', '管理员', '1605577243072', '管理员角色', '1', '1');
    `
}