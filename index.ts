import mysql from "./UnityFrontUtils/mysql"
new mysql()
    .select("id,name")
    .from('aa').where({
    id:1,
    name:2,
})
    .query()
    .then(res=>{
        console.log(res)
});

