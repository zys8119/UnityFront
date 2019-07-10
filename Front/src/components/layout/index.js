import iv from "import-vue"
const ivTo = (name)=>{
    return iv({
        fileUrl:"components/layout/",
        name
    }).component;
};
export const UnityFrontLayoutMenu = ivTo("UnityFrontLayoutMenu");
export const UnityFrontLayoutTool = ivTo("UnityFrontLayoutTool");
export const UnityFrontLayoutComponentPane = ivTo("UnityFrontLayoutComponentPane");
