import PublicModel, {$sqlFieldConfigType, PublicModelInterface} from "../PublicModel";

export default class extends PublicModel implements PublicModelInterface{
    $TableName = "user";
    $sqlFieldConfig:$sqlFieldConfigType = {
        id:"int",
        name:"varchar",
        d:{
            varchar:"(255)",
            'CHARACTER SET':'utf8',
            COLLATE:'utf8_unicode_ci',
            NOT:'NULL',
            DEFAULT:`'1'`,
            COMMENT:`'物料id'`,
        },
        e:"int",
    };
    PRIMARY_KEY:`('id')`;
    'CHARACTER SET':'utf8';
    COLLATE:`utf8_unicode_ci`;
    COMMENT:`'计划单BOM清单'`;
}
