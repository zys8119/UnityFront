<template>
    <div class="ZUpload">
        <el-upload
            class="el-upload"
            ref="upload"
            :action="action"
            :auto-upload="autoUpload"
            :disabled="disabled"
            :limit="limit"
            :headers="headers"
            :show-file-list="showFileList"
            :with-credentials="withCredentials"
            :file-list="fileList"
            :drag="drag"
            :on-exceed="onExceed"
            :on-success="onSuccess"
            :on-error="onError"
            :on-preview="onPreview"
            :http-request="httpRequest"
            :on-remove="(...args)=>$emit('on-remove',args[0],args[1],args[2])"
            :on-progress="(...args)=>$emit('on-progress',args[0],args[1],args[2])"
            :on-change="(...args)=>$emit('on-change',args[0],args[1])"
            :before-upload="beforeUpload"
            :before-remove="beforeRemove"
            :list-type="listType"
            :data="data"
            :name="name"
            :multiple="multiple"
            :accept="accept"
        >
            <slot>
                <i class="el-icon-upload" v-if="drag"></i>
                <div class="el-upload__text" v-if="drag">
                    <slot name="dragTitle">将文件拖到此处，或<em>点击上传</em></slot>
                </div>
                <div class="el-upload__text_msg" v-if="drag">
                    <slot name="dragMsg"></slot>
                </div>
            </slot>
            <template slot="trigger">
                <slot name="trigger"></slot>
            </template>
            <template slot="tip">
                <slot name="tip"></slot>
            </template>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible" append-to-body>
            <img v-if="dialogImageUrl.indexOf('png') > -1 || dialogImageUrl.indexOf('jpg') > -1" width="100%" :src="dialogImageUrl" alt="">
            <iframe class="w-100 h-500" :src="dialogImageUrl" frameborder="0" v-else></iframe>
        </el-dialog>
    </div>

</template>

<script>
export default {
    name: "Upload",
    data() {
        return {
            dialogImageUrl: '',
            dialogVisible: false,
            bool:false,
            index:0,
            maxIndex:0,
        };
    },
    props:{
        action:{
            type:String,
            default:"/v1/file/upload/"
        },
        autoUpload:{
            type:Boolean,
            default:true
        },
        disabled:{
            type:Boolean,
            default:false
        },
        limit:{
            type:Number,
            default:null
        },
        headers:{
            type:Object,
            default:Object
        },
        withCredentials:{
            type:Boolean,
            default:false
        },
        showFileList:{
            type:Boolean,
            default:true
        },
        data:{
            type:Object,
            default:()=>({
                type: "document"
            })
        },
        name:{
            type:String,
            default:"file"
        },
        multiple:{
            type:Boolean,
            default:false
        },
        listType:{
            type:String,
            default:"text"
        },
        drag:{
            type:Boolean,
            default:false
        },
        accept:{
            type:String,
            default:null
        },
        fileList:{
            type:Array,
            default:Array
        },
        beforeUpload:{
            type:Function,
            default:null
        },
        beforeRemove:{
            type:Function,
            default:null
        }
    },
    methods:{
        onPreview(file){
            let url = null;
            try {
                if (file.url) {
                    url = file.url
                }else {
                    url = file.response.data.url;
                }
            }catch (e){
                // 文件错误
            }
            if(url){
                if(new RegExp(/\.(png|jgp|GIF|JPEG)$/img).test(url)){
                    this.$emit('on-preview',file);
                    this.dialogImageUrl = file.url;
                    this.dialogVisible = true;
                }else {
                    this.$emit('on-preview',file);
                    window.open(url);
                }
            }
        },
        submit(){
            this.bool = false;
            if(!this.autoUpload){
                this.$refs.upload.submit();
            }
        },
        submitAll(){
            this.bool = true;
            this.maxIndex = this.$refs.upload.uploadFiles.filter(e=>e.status === "ready").length;
            if(!this.autoUpload){
                this.$refs.upload.submit();
            }
        },
        onExceed(){
            this.$message.error(`文件超出个数,不能大于${this.limit}个文件`)
        },
        httpRequest(opts){
            // 进度条效果
            let s = Math.floor(Math.random()*60);// 预计60秒
            let AfterIndex = parseInt(Math.floor(Math.random()*20));// 剩余20%
            let index = 0;
            let setTime = 30;
            let time = setInterval(()=>{
                if(index >= s*1000){
                    clearInterval(time);
                }else {
                    index += setTime;
                    let percent = (index/(s*1000))*100-AfterIndex;
                    if(percent >= AfterIndex){
                        try {
                            opts.onProgress({
                                percent:percent
                            });
                        }catch (e) {
                            clearInterval(time);
                        }
                    }
                }
            },setTime);
            // 上传
            let AxiosOtpions = {
                url:opts.action,
                method:"post",
                isFormData:true,
            };
            AxiosOtpions.data = opts.data;
            AxiosOtpions.data[opts.filename] = opts.file;
            window.common.Axios(AxiosOtpions).then(res=>{
                clearInterval(time);
                opts.onProgress({
                    percent:100
                });
                this.index += 1;
                opts.onSuccess({
                    data:res.data,
                    message:`【${opts.file.name}】上传成功`
                });
            }).catch(err=>{
                this.index += 1;
                opts.onError({
                    data:err.data,
                    message:`【${opts.file.name}】上传失败`
                });
            })
        },
        onSuccess(res, file, fileList){
            if(this.bool){
                if(this.index === this.maxIndex){
                    this.$message({type:"success", message:res.message});
                    this.$emit("on-success",res.data,file,fileList);
                }
                return;
            }
            this.$message({type:"success", message:res.message});
            this.$emit("on-success",res.data,file,fileList);
        },
        onError(err, file, fileList){
            if(this.bool){
                if(this.index === this.maxIndex){
                    this.$message({type:"success", message:res.message});
                    this.$emit("on-success",file,fileList);
                }
                return;
            }
            this.$message.error(err.message);
            this.$emit("on-error",err.data,file,fileList);
        }
    }
}
</script>

<style scoped lang="less">
.ZUpload{
    text-align: inherit;
    .el-upload{
        text-align: inherit;
        .el-upload__text_msg{
            color: #AAAAAA;
            margin-top: @unit15;
        }
    }
}
</style>