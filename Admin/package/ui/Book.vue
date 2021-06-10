<template>
    <div class="Book">
        <div class="BookBox"
            :class="{
                leftShow:leftShowBool,
                rightShow:rightShowBool,
                initShow:!leftShowBool && !rightShowBool,
                clickBool:!clickBool
            }"
        >
            <el-button class="BookLeft" @click="to(false)" v-if="leftShow" :style="{zIndex:zIndex+1}">left</el-button>
            <el-button class="BookRight" @click="to(true)" v-if="rightShow" :style="{zIndex:zIndex+1}">right</el-button>
            <div class="BookPage" v-for="(item, i) in list" :key="i"
                 :style="{
                zIndex:item.zIndex?item.zIndex:item.open?item.value : list.length - item.value,
            }"
                 :class="{
                left:item.open,
                right:item.bool && !item.open,
                init:!item.bool,
            }"
            >
                <div class="pageContentA" :class="{
                step1:item.step1,
                step2:item.step2,
                step3:item.step3,
            }"><BookItem :vnode="item.before"></BookItem></div>
                <div class="pageContentB" :class="{
                step1:item.step1,
                step2:item.step2,
                step3:item.step3,
            }"><BookItem :vnode="item.after"></BookItem></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Book",
    props:{
        value:{
            type:Number,
            default:0,
        }
    },
    data(){
        return {
            list:[],
            leftShowBool:false,
            rightShowBool:true,
            clickBool:false
        }
    },
    computed:{
        leftShow(){
            return this.list.filter(e=>e.open).length > 0;
        },
        rightShow(){
            return this.list.filter(e=>!e.open).length > 0;
        },
        zIndex(){
            return this.list.length+1
        }
    },
    watch:{
        $slots(){
            this.init();
        },
        value(){
            // this.initValue(true);
        },
        leftShow(val){
            this.rightShowBool = false;
            if(val){
                this.leftShowBool = false;
            }else {
                setTimeout(()=>{
                    this.leftShowBool = true;
                },0.7*1000)
            }
        },
        rightShow(val){
            this.leftShowBool = false;
            if(val){
                this.rightShowBool = false;
            }else {
                setTimeout(()=>{
                    this.rightShowBool = true;
                },0.7*1000)
            }
        }
    },
    mounted() {
        this.init();
        this.rightShowBool = false;
        if(this.leftShow){
            this.leftShowBool = false;
        }else {
            setTimeout(()=>{
                this.leftShowBool = true;
            },0.7*1000)
        }
    },
    methods:{
        // 初始化数据
        init(){
            this.$slots.default.forEach((e,i)=>{
                if(e && e.componentOptions && e.componentOptions.tag === "book-item"){
                    let children = e.componentOptions.children || [];
                    this.list.push({
                        value:i+1,
                        open:false,
                        zIndex:null,
                        step1:null,
                        step2:null,
                        step3:null,
                        bool:null,
                        after:children.find(e=>e.data.slot === "after"),
                        before:children.find(e=>e.data.slot === "before"),
                    });
                }
            });
            this.initValue();
        },
        // 初始化value
        initValue(bool){
            for(let i = 1 ; i <= this.value; i++){
                this.to(true, bool);
            }
        },
        // 设置步长
        clearStep(find,n){
            find.step1 = null;
            find.step2 = null;
            find.step3 = null;
            if(n){
                find[`step${n}`] = true;
            }
        },
        // 下一步
        next(find){
            let time =0.7*1000;
            this.clearStep(find,1);
            setTimeout(()=>{
                this.clearStep(find,2);
            },time/2)
            setTimeout(()=>{
                find.zIndex = null;
                this.clearStep(find,3);
                setTimeout(()=>{
                    this.clearStep(find);
                },100)
            },time);
        },
        // 执行翻页
        pageTurning(bool){
            this.bool = true;
            let find = null;
            if(bool){
                // 左
                find = this.list.find(e=>!e.open);
                if(find){
                    find.zIndex = this.zIndex
                    find.open = bool;
                    find.bool = true;
                    this.next(find);
                    this.$emit("input",find.value);
                }
            }else {
                // 右
                find = JSON.parse(JSON.stringify(this.list.map(e=>({...e,after:null,before:null})))).reverse().find(e=>e.open);
                if(find){
                    find = this.list.find(e=>e.value === find.value);
                    find.zIndex = this.zIndex
                    find.open = bool;
                    find.bool = true;
                    this.next(find);
                    this.$emit("input",find.value-1);
                }
            }
        },
        // 翻页
        to(bool){
            this.clickBool = true;
            if(this.leftShowBool || this.rightShowBool){
                this.leftShowBool = false;
                this.rightShowBool = false;
                setTimeout(()=>{
                    this.pageTurning(bool);
                },1000)
            }else {
                this.pageTurning(bool);
            }
        }
    }
}
</script>

<style scoped lang="less">
.Book{
    position: relative;
    @h:400px;
    height: @h;
    -webkit-perspective:@h*8;
    .BookBox{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        .BookLeft{
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            z-index: 10000;
        }
        .BookRight{
            .BookLeft;
            left: initial;
            right: 0;
        }
        .BookPage{
            position: absolute;
            right:0;
            top: 0;
            width: 50%;
            height: 100%;
            @time: ease-in-out 0.7s;
            -webkit-transform-style: preserve-3d;
            .animation(@name){
                .if() when (@name = leftPage){
                    @keyframes leftPage {
                        0%{
                            transform: rotateY(180deg);
                        }
                        100%{
                            transform: rotateY(0deg);
                        }
                    }
                    animation: leftPage @time;
                    -moz-animation: leftPage @time;	/* Firefox */
                    -webkit-animation: leftPage @time;	/* Safari 和 Chrome */
                    -o-animation: leftPage @time;	/* Opera */
                }
                .if() when (@name = rightPage){
                    @keyframes rightPage {
                        0%{
                            transform: rotateY(-180deg);
                        }
                        50%{

                        }
                        100%{
                            transform: rotateY(0deg);
                        }
                    }
                    animation: rightPage @time;
                    -moz-animation: rightPage @time;	/* Firefox */
                    -webkit-animation: rightPage @time;	/* Safari 和 Chrome */
                    -o-animation: rightPage @time;	/* Opera */
                }
                .if()
            }
            &.left{
                right: 50%;
                transform-origin: right;
                .animation(leftPage);
                .pageContentA{
                    display: none;
                    &.step1{display: block; transform: rotateY(180deg)}
                    &.step2{display: none;}
                }
                .pageContentB{
                    display: block;
                    &.step1{display: none}
                    &.step2{display: block}
                }
                &:before{
                    content: "";
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    background-image: linear-gradient(to right,transparent 50%, rgba(0,0,0,0.05));
                }
            }
            &.right{
                right:0;
                transform-origin: left;
                .animation(rightPage);
                .pageContentA{
                    display: block;
                    &.step1{display: none}
                    &.step2{display: block;}
                }
                .pageContentB{
                    display: none;
                    &.step1{display: block; transform: rotateY(180deg)}
                    &.step2{display: none;}
                }
                &:before{
                    content: "";
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    background-image: linear-gradient(to left,transparent 50%,rgba(0,0,0,0.05));
                }
            }
            &.init{
                .pageContentA{display: block;}
                .pageContentB{display: none;}
                &:before{
                    content: "";
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    background-image: linear-gradient(to left,transparent 50%,rgba(0,0,0,0.05));
                }
            }
        }
        &.leftShow{
            width: 50%;
            left: 50%;
            transform: translateX(-50%);
            .BookPage{
                width: 100%;
            }
            @keyframes leftShow {
                0%{
                    /*left: 50%;*/
                    transform: translateX(0%);
                }
                100%{
                    /*left: 50%;*/
                    transform: translateX(-50%);
                }
            }
            animation: leftShow ease-in-out 1s;
        }
        &.rightShow{
            width: 50%;
            left: 50%;
            transform: translateX(-50%);
            .BookPage{
                width: 100%;
                right: 0;
            }
            @keyframes rightShow {
                 0%{
                     left: 0;
                     transform: translateX(0%);
                 }
                 100%{
                     left: 50%;
                     transform: translateX(-50%);
                 }
             }
            animation: rightShow ease-in-out 1s;
        }
        &.initShow{
            width: 100%;
            left: 0;
            transform: translateX(0%);
            @keyframes initShow {
                0%{
                    width: 50%;
                    left: 50%;
                    transform: translateX(-50%);
                }
                100%{
                    width: 100%;
                    left: 0%;
                    transform: translateX(0%);
                }
            }
            animation: initShow ease-in-out 1s;
        }
        &.clickBool{
            width: 50%;
            left: 50%;
            transform: translateX(-50%);
            .BookPage{
                width: 100%;
                right: 0;
            }
            animation: none;
        }
    }
}
</style>