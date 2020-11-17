<template>
    <div class="Upload">
        <div class="UploadContent" @click="$refs.inputFile.click()">
            <slot></slot>
            <input type="file" ref="inputFile" @change="change" :multiple="multiple" :accept="accept" />
            <div class="operate">
                <span class="goon" @click.stop="goOn">续传</span>
                <span class="cancel" @click.stop="cancel">暂停</span>
            </div>
        </div>
        <ul class="UploadFileList">
            <li class="UploadFileListItem" v-for="(item,key) in fileList" :key="key">
                <div class="UploadFileListItemParent" :class="{
                    finish:parseInt(getProgress(item)) === 100,
                    error:item.chunk.filter(e=>e.error).length > 0
                }"  @click="item.show = !item.show">
                    <icon class="icon">icontupian</icon>
                    <span class="ellipsis-1 name">{{item.filename}}</span>
                    <span class="iconfont close" v-if="item.show">&#xe91c;</span>
                    <span class="iconfont close" v-else>&#xe91b;</span>
                    <div class="progress" :style="{width:getProgress(item) + '%'}">
                        <span v-if="parseInt(getProgress(item)) === 100" class="iconfont">&#xe763;</span>
                        <span v-else>{{getProgress(item)}}%</span>
                        <span class="msg" v-if="parseInt(getProgress(item)) === 0">请稍等，文件处理中...</span>
                    </div>
                </div>
                <div class="UploadFileListItemParentList" v-if="item.show && item.chunk">
                    <div class="UploadFileListItemParent" :class="{
                        finish:it.progress === 100,
                        error:it.error,
                    }" v-for="(it,k) in item.chunk" :key="k">
                        <icon class="icon">icontupian</icon>
                        <span class="ellipsis-1 name">{{it.filename}}</span>
                        <div class="progress" :style="{width:it.progress + '%'}">
                            <span v-if="it.progress === 100" class="iconfont">&#xe763;</span>
                            <span v-else>{{it.progress}}%</span>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from "axios"
import SparkMD5 from "spark-md5"
export default {
    name: "Upload",
    props:{
        // 切割大小，默认2M
        size:{type:Number, default:1024*1024*2},
        multiple:{type:Boolean, default:false},
        accept:{type:String, default:"*"},
        autoUpload:{type:Boolean, default:true},
        baseURL:{type:String, default:"http://192.168.1.117:8000"},
    },
    data(){
        return {
            fileList:[],
            isSubmit:false,
        }
    },
    methods:{
        // 继续上传
        goOn(){
            const indexStartArr = this.fileList.map(e=>e.chunk.findIndex(j=>!j.complete && !j.start));
            this.fileList.forEach((item,key)=>{
                let bool = true;
                let index = indexStartArr[key] - 1;
                if(index === item.chunk.length-1){
                    index += 1;
                }
                if(index === -1){
                    index = 0;
                }
                item.chunk.forEach((it)=>{
                    it.start = false;
                    it.end = false;
                    it.cancel = null;
                    it.error = false;
                    if(bool && !it.complete){
                        bool = false;
                        this.upLoadFile(
                            item.chunk,
                            item.chunk.length,
                            index > 0 ? index : 0,
                            key,
                            {
                                filename:item.filename,
                                md5:item.hash,
                                total_part:item.total,
                            },
                        )
                    }
                })
            })
        },
        // 取消请求
        cancel(){
            this.fileList.forEach(item=>{
                item.chunk.forEach(it=>{
                    if(!it.complete){
                        it.end = true;
                        it.error = true;
                    }
                    if(it.cancel){
                        it.cancel();
                    }
                })
            })
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
                    let dataInfo = {
                        ...chunk,
                        ...data,
                        part_number:chunkIndex+1,
                    }
                    window.common.Axios({
                        url:`${this.baseURL}/upload/part_upload/`,
                        method:"post",
                        isFormData:true,
                        timeout:0,
                        loading:false,
                        isLoading:false,
                        isLoadingProgress:false,
                        data:dataInfo,
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
                        this.fileList[index].chunk[chunkIndex].error = true;
                        this.$message.error(`【${data.filename}】上传失败`);
                    })
                }
            }else {
                if(chunks.filter(e=>e.complete).length === chunkLng){
                    window.common.Axios({
                        url:`${this.baseURL}/upload/finish_upload/`,
                        method:"post",
                        isFormData:true,
                        timeout:0,
                        loading:false,
                        isLoading:false,
                        isLoadingProgress:false,
                        data,
                    }).then((res)=>{
                        this.$message({type:"success",message:`【${data.filename}】上传完毕`})
                        this.$emit("on-success",res, data)
                    })
                }
            }
        },
        // 检测hash
        isCheckHash(item,key){
            if(item.hash){
                this.submit(item,key);
            }else {
                setTimeout(()=>{
                    this.isCheckHash(item,key);
                },500);
            }
        },
        // 无历史碎片
        get_complete_list_process(res, index, data){
            const chunkLng = res.chunk.length;
            window.common.Axios({
                url:`${this.baseURL}/upload/file_preprocessing/`,
                method:"post",
                isFormData:true,
                timeout:0,
                loading:false,
                isLoading:false,
                isLoadingProgress:false,
                data:{
                    filename:res.filename,
                    md5:res.hash,
                    total_part:res.total,
                }
            }).then(()=>{
                this.upLoadFile(res.chunk,chunkLng,0,index,data)
            })
        },
        // 文件手动上传
        submit(res, index){
            if(!res){
                // 手动处理
                if(!this.isSubmit){
                    this.isSubmit = true;
                    this.fileList.forEach((item,key)=>{
                        this.isCheckHash(item,key);
                    });
                }
                return;
            }
            // 获取历史碎片
            window.common.Axios({
                url:`${this.baseURL}/upload/get_complete_list/`,
                method:"get",
                timeout:0,
                loading:false,
                isLoading:false,
                isLoadingProgress:false,
                data:{
                    filename:res.filename,
                    md5:res.hash,
                    total_part:res.total,
                }
            }).then((reshistory)=>{
                let data = {
                    filename:res.filename,
                    md5:res.hash,
                    total_part:res.total,
                }
                let complete_parts = reshistory.data.complete_parts;
                if(complete_parts.length > 0){
                    if(complete_parts.length === res.total){
                        // 秒级上传
                        res.chunk.forEach((c,k)=>{
                            res.chunk[k].complete = true;
                            res.chunk[k].progress = 100;
                        });
                        this.upLoadFile(res.chunk,res.chunk.length,res.chunk.length+1,index,data)
                    }else {
                        // 部分上传则续传
                        let complete_parts_index = complete_parts.length - 1;
                        complete_parts.forEach((c,k)=>{
                            res.chunk[k].complete = true;
                            res.chunk[k].progress = 100;
                        });
                        this.upLoadFile(res.chunk,res.chunk.length,complete_parts_index,index,data)
                    }
                }else {
                    this.get_complete_list_process(res, index, data);
                }
            })

        },
        // 选择文件
        change(evt){
            this.$emit("change", evt.target.files, evt);
            evt.target.files.forEach(file=>{
                this.getChunk(file).then(res=>{
                    const index = this.fileList.length;
                    this.fileList.push(res);
                    evt.target.value = "";
                    // 获取文件 Hash
                    this.getHash(file).then(hash=>{
                        this.$set(this.fileList[index],"hash", hash);
                        // 上传文件主体信息
                        this.$nextTick(()=>{
                            if(this.autoUpload){
                                this.submit(this.fileList[index],index);
                            }
                        })
                    })
                })
            });
        },
        // 获取文件 Hash
        getHash(file){
            return new Promise(resolve => {
                var blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice,
                    chunkSize = this.size,                             // Read in chunks of 2MB
                    chunks = Math.ceil(file.size / chunkSize),
                    currentChunk = 0,
                    spark = new SparkMD5.ArrayBuffer(),
                    fileReader = new FileReader();
                fileReader.onload = function (e) {
                    spark.append(e.target.result);                   // Append array buffer
                    currentChunk++;

                    if (currentChunk < chunks) {
                        loadNext();
                    } else {
                        resolve(spark.end())
                    }
                };
                const loadNext = function () {
                    var start = currentChunk * chunkSize,
                        end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;
                    fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
                }
                loadNext();
            })

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
                        complete:false,
                        error:false,
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
                resolve(resUlt);
            })
        }
    }
}
</script>

<style lang="less">
.Upload{
    width: 300px;
    min-width: 300px;
    margin-left: 50px;
    margin-top: 50px;
    padding-right: 30px;
    .UploadContent{
        display: block;
        position: relative;
        input{
            display: none;
        }
        .operate{
            position: absolute;
            top: 50%;
            right: 0;
            transform: translateY(-50%);
            span{
                background-color: #e5e5e5;
                padding: 10px;
                cursor: pointer;
                color: #999999;
                &:hover{
                    background-color: #ffffff;
                    color: #1b91ff;
                }
                &+span{
                    margin-left: 15px;
                }
            }
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
                        &.iconfont{
                            font-size: 26px;
                        }
                        &.msg{
                            width: 200px;
                            text-align: right;
                            color: #999999;
                        }
                    }
                }
                &:hover{
                    cursor: pointer;
                }
                &.finish{
                    .progress{
                        background-color: #67c23a;
                        span{
                            &.iconfont{
                                color: #67c23a;
                            }
                        }
                    }
                }
                &.error{
                    .progress{
                        background-color: #FF0000;
                        span{
                            color: #FF0000;
                        }
                    }
                }
            }
            .UploadFileListItemParentList{
                background: #e5e5e5;
                padding: 0 30px;
                max-height: 100px;
                overflow-x: hidden;
                .UploadFileListItemParent{
                    .icon{
                        text-align: left;
                        margin-left: 0;
                    }
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