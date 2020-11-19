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
            COMMENT:`'菜单id'`,
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
        is_child_page:{
            int:"(255)",
            NOT:'NULL',
            DEFAULT:`'1'`,
            COMMENT:`'是否为子页面：1 不是、2 是；如果是子页面则权限菜单将不可见'`,
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
    $VALUES = `
        INSERT INTO \`menu\` VALUES ('160576915126284', '系统管理', '/system-management/authority-management/menu-management', null, '1605505190793', '1', '1');
        INSERT INTO \`menu\` VALUES ('1605769190027186', '权限管理', '/system-management/authority-management/menu-management', '160576915126284', '1605505190793', '1', '1');
        INSERT INTO \`menu\` VALUES ('160576927459951', '菜单管理', '/system-management/authority-management/menu-management', '1605769190027186', '1605505190793', '1', '1');
        INSERT INTO \`menu\` VALUES ('1605769287136368', '菜单类型管理', '/system-management/authority-management/menu-type-management', '1605769190027186', '1605505190793', '1', '1');
        INSERT INTO \`menu\` VALUES ('1605769296852808', '角色管理', '/system-management/authority-management/roles-management', '1605769190027186', '1605505190793', '1', '1');
        INSERT INTO \`menu\` VALUES ('1605769306949211', '角色分类管理', '/system-management/authority-management/roles-type-management', '1605769190027186', '1605505190793', '1', '1');
        INSERT INTO \`menu\` VALUES ('1605772354630210', '角色权限设置', '/system-management/authority-management/roles-permission-settings', '1605769190027186', '1605505190793', '1', '2');
        INSERT INTO \`menu\` VALUES ('1605769095259843', '首页', '/home', null, '1605505190793', '1', '1');
        INSERT INTO \`menu\` VALUES ('1605769320496678', '用户管理', '/system-management/authority-management/users-management', '1605769190027186', '1605505190793', '1', '1');
        INSERT INTO \`menu\` VALUES ('1605770967404849', '用户中心', '/userInfo', null, '1605505190793', '1', '2');
        INSERT INTO \`menu\` VALUES ('1605778715087343', '用户注册页面', '/User/Auth/register', null, '1605505190793', '2', '1');
        INSERT INTO \`menu\` VALUES ('160577893512851', '角色权限设置', '/system-management/authority-management/roles-permission-settings', '1605769190027186', '1605505190793', '2', '1');
        INSERT INTO \`menu\` VALUES ('1605779531522659', '用户中心', '/userInfo', null, '1605505190793', '2', '1');
    `
}