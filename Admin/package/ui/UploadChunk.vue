<template>
    <div class="Upload">
        <div class="UploadContent" @click="$refs.inputFile.click()">
            <slot></slot>
            <input type="file" ref="inputFile" @change="change" multiple="multiple" accept="*/.zip" />
        </div>
        <ul class="UploadFileList">
            <li class="UploadFileListItem" v-for="(item,key) in fileList" :key="key">
                <div class="UploadFileListItemParent"  @click="item.show = !item.show">
                    <icon class="icon">icontupian</icon>
                    <span class="ellipsis-1 name">{{item.filename}}</span>
                    <span class="iconfont close" v-if="item.show">&#xe91c;</span>
                    <span class="iconfont close" v-else>&#xe91b;</span>
                    <div class="progress" :style="{width:getProgress(item) + '%'}"><span>{{getProgress(item)}}%</span></div>
                </div>
                <div class="UploadFileListItemParentList" v-if="item.show && item.chunk">
                    <div class="UploadFileListItemParent" v-for="(it,k) in item.chunk" :key="k">
                        <icon class="icon">icontupian</icon>
                        <span class="ellipsis-1 name">{{it.filename}}</span>
                        <span class="iconfont close" v-if="!it.start && !it.end" @click="goOn(item,it)">&#xe646;</span>
                        <span class="iconfont close" v-if="!it.end && it.start" @click="cancel(item,it)">&#xe607;</span>
                        <div class="progress" :style="{width:it.progress + '%'}"><span>{{it.progress}}%</span></div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from "axios"
export default {
    name: "Upload",
    data(){
        return {
            fileList:[],
            // 切割大小，默认1M
            size:1024*1024*100,
        }
    },
    methods:{
        // 继续上传
        goOn(item, it){
            it.end = false;
            it.cancel = null;
            this.upLoadFile(
                item.chunk,
                item.chunk.length,
                it.index-1,
                it.index-1,
                {
                    filename:item.filename,
                    md5:item.hash,
                    total_part:item.total,
                },
            )
        },
        // 取消请求
        cancel(item,it){
            it.cancel();
            it.end = true;
            it.start = false;
        },
        // 计算父级进度
        getProgress(item){
            if(item.chunk && item.chunk.length > 0){
                return item.chunk.map((e,i,a)=>e.progress/a.length).reduce((a,b)=>a+b).toFixed(2);
            }
            return 0;
        },
        // 批量上传文件
        upLoadFile(chunks, chunkLng,chunkIndex,index,data){
            if(chunkIndex < chunkLng){
                const chunk = chunks[chunkIndex];
                if(chunk){
                    if(chunk.end){
                        this.upLoadFile(chunks, chunkLng,chunkIndex+1,index,data);
                        return ;
                    }
                    this.fileList[index].chunk[chunkIndex].start = true;
                    window.common.Axios({
                        url:"http://192.168.1.117:8000/upload/part_upload/",
                        method:"post",
                        isFormData:true,
                        timeout:0,
                        isLoading:false,
                        isLoadingProgress:false,
                        data:{
                            ...chunk,
                            ...data,
                            part_number:chunkIndex+1,
                        },
                        cancelToken:new axios.CancelToken(c=>{
                            this.fileList[index].chunk[chunkIndex].cancel = c;
                        }),
                        onUploadProgress:progressEvent => {
                            let complete = (progressEvent.loaded / progressEvent.total * 100 | 0);
                            this.fileList[index].chunk[chunkIndex].progress = complete;
                            if(complete === 100){
                                this.fileList[index].chunk[chunkIndex].complete = true;
                            }
                        }
                    }).then(()=>{
                        this.upLoadFile(chunks, chunkLng,chunkIndex+1,index,data);
                    }).catch(()=>{
                        this.fileList[index].chunk[chunkIndex].end = false;
                    })
                }
            }else {
                window.common.Axios({
                    url:"http://192.168.1.117:8000/upload/finish_upload/",
                    method:"post",
                    isFormData:true,
                    timeout:0,
                    isLoading:false,
                    isLoadingProgress:false,
                    data,
                }).then(()=>{
                    this.$message({type:"success",message:"上传完毕"})
                })
            }
        },
        // 选择文件
        change(evt){
            evt.target.files.forEach(file=>{
                this.getChunk(file).then(res=>{
                    const index = this.fileList.length;
                    this.fileList.push(res);
                    evt.target.value = "";
                    // 批量上传文件
                    const chunkLng = res.chunk.length;
                    window.common.Axios({
                        url:"http://192.168.1.117:8000/upload/file_preprocessing/",
                        method:"post",
                        isFormData:true,
                        data:{
                            filename:res.filename,
                            md5:res.hash,
                            total_part:res.total,
                        }
                    }).then(()=>{
                        this.upLoadFile(res.chunk,chunkLng,0,index,{
                            filename:res.filename,
                            md5:res.hash,
                            total_part:res.total,
                        })
                    })
                })
            });
        },
        // 获取切片
        getChunk(file){
            return new Promise(resolve => {
                const filesize = file.size;
                const filename = file.name;
                //计算文件切片总数
                const total = Math.ceil(filesize / this.size);
                let chunk = [];
                let start = 0;
                let end = 0;
                let index = 0;
                while(start < filesize) {
                    end = start + this.size;
                    if(end > filesize) {
                        end = filesize;
                    }
                    index++;
                    chunk.push({
                        filename:`${filename}-chunk-${index}`,
                        progress:0,
                        index,
                        file:file.slice(start,end), //切割文件
                        end:false,
                        start:false,
                        cancel:null,
                    })
                    start = end;
                }
                let resUlt = {
                    filename,
                    progress:0,
                    show:false,
                    chunk,
                    file,
                    total,
                }
                const loading = this.$loading({
                    lock: true,
                    text: '文件处理中,请耐心等待...',
                    spinner: 'el-icon-loading',
                    target:this.$el,
                    background: 'rgba(255, 255, 255, 0.0)'
                });
                if("Worker" in window){
                    const WorkerObj =  new Worker("/js/fileUploadHash.js");
                    WorkerObj.onmessage = ev=>{
                        resUlt.hash = ev.data.hash;
                        loading.close();
                        resolve(resUlt);
                    }
                    WorkerObj.postMessage({
                        file,
                    })
                }else {
                    var fileRead = new FileReader();
                    fileRead.readAsDataURL(file);
                    fileRead.onload = function (ev) {
                        resUlt.hash = this.$utils.MD5(ev.target.result);
                        loading.close();
                        resolve(resUlt);
                    }
                }
            })
        }
    }
}
</script>

<style lang="less">
.Upload{
    width: 300px;
    margin-left: 50px;
    margin-top: 50px;
    .UploadContent{
        display: block;
        input{
            display: none;
        }
    }
    .UploadFileList{
        margin-top: 20px;
        .UploadFileListItem{
            .UploadFileListItemParent{
                display: flex;
                justify-items: center;
                align-items: center;
                line-height: 30px;
                padding:15px 0;
                position: relative;
                user-select: none;
                .icon{
                    margin-left: 10px;
                    margin-right: 10px;
                    display: flex;
                    float: left;
                }
                .name{
                    flex: 1;
                }
                .close{
                    color: #999999;
                    font-size: 16px;
                    margin-left: 10px;
                    margin-right: 10px;
                    float: right;
                    &:hover{
                        color: #000000;
                    }
                }
                .progress{
                    position: absolute;
                    width: 100%;
                    height: 2px;
                    background-color: #1b91ff;
                    left: 0;
                    bottom: 7px;
                    transition: all ease-in-out 500ms;
                    span{
                        font-size: 12px;
                        color: #1b91ff;
                        line-height: initial;
                        transform-origin: 0 0;
                        transform: scale(0.8) translateY(-50%);
                        transition: all ease-in-out 500ms;
                        position: absolute;
                        left: 100%;
                        top: 50%;
                    }
                }
                &:hover{
                    //background-color: #e5e5e5;
                    cursor: pointer;
                }
            }
            .UploadFileListItemParentList{
                //max-height: 300px;
                //overflow-x: hidden;
                .UploadFileListItemParent{
                    .name{
                        color: #999;
                    }
                }
            }
            &+.UploadFileListItem{
                margin-top: 10px;
                border-top:1px dashed #d8d8d8;
            }
        }
    }
}
</style>