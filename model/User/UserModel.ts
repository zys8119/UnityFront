import PublicModel, {$sqlFieldConfigType, PublicModelInterface} from "../PublicModel";

export default class extends PublicModel implements PublicModelInterface{
    $TableName = "user";
    $sqlFieldConfig:$sqlFieldConfigType = {
        id:{
            varchar:"(10)",
            'CHARACTER SET':'utf8',
            COLLATE:'utf8_unicode_ci',
            NOT:'NULL',
            DEFAULT:`'1'`,
            COMMENT:`'物料id'`,
        },
    };
    PRIMARY_KEY = `('id')`;
    'CHARACTER SET' = 'utf8';
    COLLATE = `utf8_unicode_ci`;
    COMMENT =`'计划单BOM清单'`;
}
