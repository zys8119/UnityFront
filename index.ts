import mysql from "./UnityFrontUtils/mysql"
new mysql()
    .select("id,name")
    .from('aa').where({id:2,name:2},true)
    .query()
    .then(res=>{
        console.log(res)
});

