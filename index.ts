import mysql from "./UnityFrontUtils/mysql"
new mysql()
    // .select("id,name").from("aa").where({name:"2"},true)
    .insert('aa',{id:7,name:"asd"},true)
    .query().then(res=>{
        console.log(res)
});

