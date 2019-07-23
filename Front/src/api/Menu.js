export default {
    getMenuUi(){
        // return new Promise((resolve, reject)=>{
            this.action({
                moduleName:"Menu_getMenuUi",
                method:"post",
                url:"Menu/getMenuUi",
                data:this.airforce.install,
                resthen:()=>{
                    this.action({
                        moduleName: "Menu_getMenuUi",
                        goods:null
                    });
                }
            }).then(res=>{
                if(res.code == 200){
                    // resolve(1212);
                    console.log(res)
                }
            });
            return "asdad";
            return new Promise(resolve => resolve(new Promise(resolve => resolve(4444))))
        // })
    }
}
