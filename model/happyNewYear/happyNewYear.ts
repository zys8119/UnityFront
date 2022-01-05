import PublicModel, {$sqlFieldConfigType, PublicModelInterface} from "../PublicModel";

export default class extends PublicModel implements PublicModelInterface{
    $TableName = "office";
    $sqlFieldConfig:$sqlFieldConfigType = {
        id:{
            varchar:"(10)",
            'CHARACTER SET':'utf8',
            COLLATE:'utf8_unicode_ci',
            NOT:'NULL',
            DEFAULT:`'1'`,
            COMMENT:`'id'`,
        },
    };
    'CHARACTER SET' = 'utf8';
    COLLATE = `utf8_unicode_ci`;
    COMMENT =`'年会抽奖'`;
}
