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
    $VALUES = `
        INSERT INTO \`roles_permission\` VALUES ('1605679492327', '1605505190793', '1605671372549', '1605573581233551,160576915126284,1605769095259843,1605769190027186,160576927459951,1605769287136368,1605769296852808,1605769306949211,1605769320496678,160577242393565,1605770967404849,1605772354630210,1605778715087343,160577893512851', '1');
    `
}