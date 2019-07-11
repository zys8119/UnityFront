import iv from "import-vue"
const ivTo = (name)=>{
    return iv({
        fileUrl:"components/",
        name
    }).component;
};
export const ComponentTree = ivTo("ComponentTree");
export const UfBox = ivTo("UfBox");
