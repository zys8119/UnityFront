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
        name:{
            varchar:"(255)",
            COMMENT:`'名称'`,
        },
        url:{
            varchar:"(255)",
            COMMENT:`'文件路径'`,
        }
    };
    'CHARACTER SET' = 'utf8';
    COLLATE = `utf8_unicode_ci`;
    COMMENT =`'OnlyOfficeModel'`;
}