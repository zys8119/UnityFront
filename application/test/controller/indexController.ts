import applicationController from "../../../UnityFrontUtils/controller/applicationController";
import axios from "axios";
const http = require("http");
const querystring = require('querystring');
export class IndexController extends  applicationController{
    constructor(){
        super();
    }

    index(){
        console.log(`=================================`,Date.now());
        // this.setHeaders({
        //     'Content-Type': 'text/html; charset=utf-8',
        // });
        // this.$_RequestStatus = 500;
        axios({
            url:"http://apis.juhe.cn/cnoil/oil_city",
            params:{
                'key': 'a2e387effbe81dda89d35eb947b15485'
            }
        }).then(res=>{
            if(res.status >= 200 && res.status < 300 && res.data.resultcode == "200"){
                this.$_send(res.data);
            }else {
                Promise.all([
                    // this.DB()
                    //     .select("*")
                    //     .from("aa").query(),
                    // this.DB()
                    //     .select("*")
                    //     .from("bb").query(),
                    this.DB()
                        .select("*")
                        .from("cc").where({
                        id:375
                    }).query(),
                ]).then(res=>{
                    this.$_send({
                        resultcode:"10101",
                        mrg:"请求失败",
                        data:res
                    });
                });
            }
        }).catch(err=>{
            this.$_send(err);
        });
    }
}

