const toHump = (name)=> {
    const replaceCallback = (all, letter)=>{
        return (letter|| "").toUpperCase();
    }
    return name.toLowerCase()
        .replace(/ |(\_|\-){1,}$/g,"")
        .replace(/\_{1,}/g,"_")
        .replace(/\-{1,}/g,"-")
        .replace(/\_(.)/g, replaceCallback)
        .replace(/\-(.)/g, replaceCallback)
        .replace(/^(.)/g, (all,letter)=>(letter || "").toUpperCase());
}
console.log(toHump("asdasd_as_dass  das-asaa"))
console.log(toHump("jiehunzheng----WPmzkwmdmwmg---"))
console.log(toHump("jiehunzheng----WPmzkwmdmwmg___"))
