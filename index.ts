import mysql from "./UnityFrontUtils/mysql"
//"SELECT * FROM aa a LEFT JOIN bb b ON a.id = b.a2 LEFT JOIN cc c ON b.id = c.a2 WHERE a.id = 23 and b.id = c.a2"
new mysql().select().from('aa a').join({
    'bb b':"a.id = b.a2",
    'cc c':"b.id = c.a2",
}).where({'a.id':23,'b.id':'c.a2'})
.query(null,true).then(res=>{
    console.log(res)
});

