export default {
    // 添加外部js
    addJs(src){
        return new Promise(resolve => {
            if(document.getElementById(src)){
                resolve();
                return ;
            }
            const js = document.createElement("script");
            js.id = src;
            js.src = src;
            document.body.appendChild(js)
            js.onload = ()=>{
                setTimeout(()=>{
                    resolve();
                });
            }
            js.onerror = ()=>{
                this.addJs(src).then(()=>{
                    setTimeout(()=> {
                        resolve();
                    });
                })
            }
        })
    },
}