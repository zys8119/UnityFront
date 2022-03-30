const toHump = (name)=> {
    const replaceCallback = (all, letter)=>{
        return (letter|| "").toUpperCase();
    }
    return name
        .replace(/ /g,"")
        .replace(/\_(.)/g, replaceCallback)
        .replace(/-(.)/g, replaceCallback);
}
console.log(toHump("asdasd_as_dass  das-asaa"))
