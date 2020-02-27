import {applicationController} from "../../../UnityFrontUtils/controller/applicationController";
import {ServerConfig} from "../../../UnityFrontUtils/config";
const fs = require("fs");
const path = require("path");
export class viewController extends applicationController{
    TabelName:string;
    constructor() {
        super();
        this.TabelName = "uf_project";
    }
    create(){
        let project_id = `${Date.now()}${parseInt(`${Math.random()*100000000}`)}`;
        this.DB().insert(this.TabelName,{
            project_id,
            project_name:this.$_body.name,
        }).query().then(()=>{
            this.$_success({
                project_id
            });
        }).catch(err=>{
            this.$_error(err);
        });
    }

    update(){
        this.isProjectExist().then(()=> {
            let {image,...config} = this.$_body.config;
            let base64 = image.replace(/^data:image\/\w+;base64,/, "");
            let dataBuffer = Buffer.from(base64, 'base64');
            let imageUrl = `public/img/images/${this.$_body.project_id}.png`;
            let url = path.resolve(__dirname,"../../../",imageUrl);
            fs.writeFile(url,dataBuffer, 'utf8', err=>{
                if (err) this.$_error();
            });
            config.image = imageUrl;
            this.DB().update(this.TabelName, {
                project_name: this.$_body.project_name || '',
                config: this.$_encode(config)
            }).where({
                project_id: this.$_body.project_id,
            }).query(null, false).then(() => {
                this.$_success();
            }).catch(err => {
                this.$_error(err);
            });
        });
    }

    isProjectExist(){
        return new Promise((resolve, reject) => {
            this.DB().select().from(this.TabelName).where({
                project_id:this.$_body.project_id || this.$_query.project_id,
            }).query().then(res=>{
                if(res.length > 0){
                    resolve();
                }else {
                    this.$_error("项目不存在");
                    reject();
                }
            }).catch(err=>{
                this.$_error(err);
                reject();
            });
        })
    }

    getProject(){
        this.isProjectExist().then(()=>{
            this.DB().select().from(this.TabelName).where({
                project_id:this.$_query.project_id,
            }).query(null,false).then(res=>{
                let result = {};
                let config = this.$_decode(res[0].config);
                if(config.image){
                    config.image = `http://${(ServerConfig.host)?ServerConfig.host:'localhost'}:${ServerConfig.port}/${config.image}`
                }
                try {
                    result = {
                        ...res[0],
                        config:config
                    }
                }catch (e) {}
                this.$_success(result);
            }).catch(err=>{
                this.$_error(err);
            });
        });
    }

    list(){
        this.DB().select().from(this.TabelName).query().then(res=>{
            this.$_success(res);
        }).catch(err=>this.$_error(err));
    }
}