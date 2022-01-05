import PublicModel, {$sqlFieldConfigType, PublicModelInterface} from "../PublicModel";

export default class extends PublicModel implements PublicModelInterface{
    $TableName = "happyNewYear";
    $sqlFieldConfig:$sqlFieldConfigType = {
        id:{
            varchar:"(10)",
            'CHARACTER SET':'utf8',
            COLLATE:'utf8_unicode_ci',
            NOT:'NULL',
            DEFAULT:`'1'`,
            COMMENT:`'id'`,
        },
        nickname:{
            longtext:"",
            NOT:'NULL',
            COMMENT:`'用户名称'`
        },
        openid:{
            longtext:"",
            COMMENT:`'微信openid'`
        },
        headimgurl:{
            longtext:"",
            COMMENT:`'微信openid'`
        },
        wall:{
            varchar:"(255)",
            DEFAULT:`'1'`,
            NOT:'NULL',
            COMMENT:`'是否展现签到墙'`
        }
    };
    'CHARACTER SET' = 'utf8';
    COLLATE = `utf8_unicode_ci`;
    COMMENT =`'年会抽奖'`;
}
