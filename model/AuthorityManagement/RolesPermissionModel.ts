import PublicModel, {$sqlFieldConfigType, PublicModelInterface} from "../PublicModel";

export default class extends PublicModel implements PublicModelInterface{
    $TableName = "roles_permission";
    $sqlFieldConfig:$sqlFieldConfigType = {
        id:{
            varchar:"(255)",
            'CHARACTER SET':'utf8',
            COLLATE:'utf8_unicode_ci',
            NOT:'NULL',
            DEFAULT:`''`,
            COMMENT:`'权限id'`,
        },
        menu_id:{
            varchar:"(255)",
            NOT:'NULL',
            DEFAULT:`''`,
            COMMENT:`'菜单id'`,
        },
        roles_id:{
            varchar:"(255)",
            NOT:'NULL',
            DEFAULT:`''`,
            COMMENT:`'角色id'`,
        },
        permission:{
            text:"",
            COMMENT:`'权限组，js字符串'`,
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
    COMMENT =`'角色权限表'`;
}