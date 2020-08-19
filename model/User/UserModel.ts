import PublicModel, {$sqlFieldConfigType, PublicModelInterface} from "../PublicModel";

export default class extends PublicModel implements PublicModelInterface{
    $TableName = "test";
    $sqlFieldConfig:$sqlFieldConfigType = {
        id:"int",
        name:"string",
    }
}
