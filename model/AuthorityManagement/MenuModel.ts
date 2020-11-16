import PublicModel, {$sqlFieldConfigType, PublicModelInterface} from "../PublicModel";

export default class extends PublicModel implements PublicModelInterface{
    $TableName = "menu";
    $sqlFieldConfig:$sqlFieldConfigType = {
        id:{
            varchar:"(255)",
            'CHARACTER SET':'utf8',
            COLLATE:'utf8_unicode_ci',
            NOT:'NULL',
            DEFAULT:`''`,
            COMMENT:`'id'`,
        },
        name:{
            varchar:"(255)",
            NOT:'NULL',
            COMMENT:`'菜单名称'`,
        },
        url:{
            text:"",
            NOT:'NULL',
            COMMENT:`'菜单url路径'`,
        },
        parent:{
            varchar:"(255)",
            COMMENT:`'父级菜单'`,
        },
        type:{
            varchar:"(255)",
            NOT:'NULL',
            COMMENT:`'菜单分类'`,
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
    COMMENT =`'权限菜单表'`;
}