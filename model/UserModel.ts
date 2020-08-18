import PublicModel, {PublicModelInterface} from "./PublicModel";

export default class extends PublicModel implements PublicModelInterface{
    $TableName = "user"
    $sqlFieldConfig = {
        id:{
            varchar:255,
            CHARACTER:255,
            "NOT NULL":true,
        }
    }
}
