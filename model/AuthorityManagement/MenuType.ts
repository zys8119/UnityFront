import PublicModel, {$sqlFieldConfigType, PublicModelInterface} from "../PublicModel";

export default class extends PublicModel implements PublicModelInterface{
    $TableName = "menu_type";
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
            COMMENT:`'菜单类型名称'`,
        },
        type:{
            varchar:"(255)",
            NOT:'NULL',
            COMMENT:`'类型：1 后台、2 前台、3 其他'`,
        },
    }
    'CHARACTER SET' = 'utf8';
    COLLATE = `utf8_unicode_ci`;
    COMMENT =`'权限菜单类型表'`;
}