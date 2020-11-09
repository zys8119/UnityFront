<template>
    <div class="ZXDialogAlert" :class="{
        ZXDialogAlertRight:layout === 'right'
    }" v-if="showBox">
        <el-dialog :title="title"
                   :visible.sync="show"
                   :width="modeConfig.alert ? calcWidth : width"
                   :fullscreen="fullscreen"
                   :top="top"
                   :modal="modal"
                   :modal-append-to-body="modalAppendToBody"
                   :append-to-body="appendToBody"
                   :lock-scroll="lockScroll"
                   :custom-class="`${layout === 'right' && showBoxDialog ? 'ZXDialogAlert-custom-class' : ''} ${customClass? customClass : ''}`"
                   :close-on-click-modal="closeOnClickModal"
                   :close-on-press-escape="closeOnPressEscape"
                   :show-close="showClose"
                   :before-close="beforeClose"
                   :center="center"
                   :destroy-on-close="destroyOnClose"
                   @open="onShow"
                   @opened="onOpened"
                   @closed="onClosed"
                   @close="onHide"
                   ref="dialog"
                   class="x-dialog">
            <div class="ZXDialogAlert-el-dialog-box">
                <div class="ZXDialogAlert-el-dialog" :style="{maxHeight:maxHeightIndex+'px',height:layout === 'right' && showBoxDialog?maxHeightIndex + 'px':'auto'}">
                    <component ref="component" v-if="show && components && temp" :is="temp"></component>
                    <div v-if="show && !components && content && !temp" v-html="content" class="ZXDialogAlertContent console-PagePadding"></div>
                </div>
            </div>
            <component slot="title" ref="title" :is="slotTitleTemp" v-if="slotTitleTemp"></component>
            <component slot="footer" ref="footer" :is="slotFooterTemp" v-if="slotFooterTemp"></component>
        </el-dialog>
    </div>
</template>

<script>
import importVue from "import-vue"
export default {
    name: "z-x-dialog-alert",
    props: {
        components: {type: String, default: null},
        props: {type: Object, default: Object},
        content: {type: String, default: null},
        title: {type: String, default: null},
        width: {type: String, default: "50%"},
        fullscreen: {type: Boolean, default: null},
        top: {type: String, default: "15vh"},
        modal: {type: Boolean, default: true},
        modalAppendToBody: {type: Boolean, default: true},
        appendToBody: {type: Boolean, default: false},
        lockScroll: {type: Boolean, default: true},
        customClass: {type: String, default: null},
        closeOnClickModal: {type: Boolean, default: false},
        closeOnPressEscape: {type: Boolean, default: true},
        showClose: {type: Boolean, default: true},
        beforeClose: {type: Function, default: null},
        center: {type: Boolean, default: false},
        destroyOnClose: {type: Boolean, default: false},
        slotTitle: {type: Object, default: null},
        slotFooter: {type: Object, default: null},
        maxHeight: {type: Number, default: 1},
        layout: {type: String, default: "conter"},
    },
    data() {
        return {
            show: false,
            showBox: false,
            showBoxDialog: false,
            temp:null,
            modeConfig: {
                alert:true,
            },
            calcWidth:this.width,
            WinOnResize:()=>{},
            slotTitleTemp:null,
            slotFooterTemp:null,
            maxHeightIndex:700,
        }
    },
    watch:{
        width(){
            this.watchWidth();
        },
        maxHeight() {
            this.setHeight();
        },
        showBox(val){
            this.$nextTick(()=>{
                this.showBoxDialog = val;
            });
        }
    },
    beforeMount() {
        this.watchWidth();
    },
    mounted() {
        this.watchWidth();
        this.setHeight();
        this.WinOnResize = window.onresize;
        window.onresize = ()=>{
            this.setHeight();
            this.watchWidth();
            if(this.WinOnResize) this.WinOnResize();
        };
        this.$nextTick(()=>{
            this.init(this,this,"temp","component");
            try {
                this.init(this,this.slotTitle(),"slotTitleTemp","title");
            }catch (err) { /*err*/}
            try {
                this.init(this,this.slotFooter(),"slotFooterTemp","footer");
            }catch (err) { /*err*/}
        });
    },
    methods: {
        setHeight() {
            /**
             * surplusHeight: 弹出层的 头部高度 + 内容区域的 内外边距 + 底部高度
             * @type {number}
             */
            let surplusHeight = 100 + 1;
            this.maxHeightIndex = window.innerHeight*this.maxHeight - surplusHeight;
        },
        watchWidth(){
            if(typeof this.width === 'string' && this.modeConfig.alert){
                let index = parseInt(this.width);
                let minW = "50%";
                let maxW = "90%";
                if(isNaN(index)){ return this.calcWidth = minW}
                let m = /(?:[0-9]*(px)|[0-9]*(%))/.exec(this.width);
                if(m){
                    if(m[1]){
                        if(index > window.innerWidth){
                            this.calcWidth = maxW
                        }else {
                            this.calcWidth = this.width;
                        }
                        return;
                    }
                    if(m[2]){
                        this.calcWidth = this.width;
                        return ;
                    }
                    if(isNaN(index)){ return this.calcWidth = minW}
                } else {
                    if(isNaN(index)){ return this.calcWidth = minW}else {
                        if(index > window.innerWidth){
                            this.calcWidth = maxW
                        }else {
                            this.calcWidth = index+'px';
                        }
                        return;
                    }
                }
            }
        },
        onShow() {
            this.$emit('on-show');
        },
        onHide() {
            // 回收
            window.onresize = this.WinOnResize;
            this.$emit('on-hide');
        },
        onOpened() {
            this.$emit('on-opened');
        },
        onClosed() {
            this.showBox = false;
            this.show = false;
            this.$ZAlert.index -= 1;
            delete this.$ZAlert.vm[this.$ZAlert.index];
            this.$emit('on-closed');
        },
        init(_vm,_this, temp,ref) {
            try {
                _vm[temp] = null;
                let currentView = null;
                if(Object.prototype.toString.call(_this.components) === '[object Module]'){
                    currentView = (this.components.default)?_this.components.default:_this.components;
                }else {
                    currentView = importVue({
                        fileUrl:"",
                        name:_this.components
                    }).component;
                }
                if (currentView.props && !currentView.CopyPropsBool) {
                    currentView.CopyPropsBool = true;
                    currentView.CopyProps = JSON.parse(JSON.stringify(currentView.props));
                }
                for (let j in currentView.CopyProps) {
                    currentView.props[j].default = currentView.CopyProps[j].default;
                }
                for (let i in _this.props) {
                    try {
                        if (Object.keys(currentView.props).indexOf(i) > -1) {
                            currentView.props[i].default = _this.props[i];
                        }
                    } catch (e) {
                        // err
                    }
                }
                _vm.$nextTick(() => {
                    if (currentView.methods && !currentView.methodsBool) {
                        currentView.methodsBool = true;
                        currentView.CopyMethods = JSON.parse(JSON.stringify(currentView.methods));
                    }
                    for (let j in currentView.CopyMethods) {
                        currentView.$vnode.componentOptions._events[j] = currentView.CopyMethods[j];
                    }
                    for (let i in _this._event) {
                        _vm.getRefs(ref,component=>{
                            component._events[i] = [_this._event[i]];
                        })
                    }
                });
                _vm[temp] = currentView;
            } catch (e) {
                // err
            }
        },
        getRefs(keyName,callback){
            if(this.$refs[keyName]){
                callback(this.$refs[keyName]);
                return;
            }
            setTimeout(()=>{
                this.getRefs(keyName,callback);
            },300);
        }
    }
}
</script>

<style lang="less">
@ZAlertHeaderHeight: 60px; // 弹窗头部高度
.ZXDialogAlert {
    /deep/ .el-dialog__header {
        height: @ZAlertHeaderHeight;
        padding: 0 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid rgba(0,0,0,0.09);
        .el-dialog__headerbtn {
            font-size: 22px;
        }
    }
    /deep/ .el-dialog__body {
        padding: 0;
    }
    & /deep/ .x-dialog {
        width: auto;
        .weui-mask {
            z-index: 499 !important;
        }
        .weui-dialog {
            width: auto;
            z-index: 500 !important;
        }
        .el-dialog{
            overflow: hidden;
            border-radius: 4px;
            margin-bottom: 0!important;
        }
        .ZXDialogAlert-el-dialog-box{
            position: relative;
            .ZXDialogAlert-el-dialog{
                padding: 20px;
                overflow-x: hidden;
            }
        }
    }

    .ZXDialogAlertTitle {
        width: 100%;
        background-color: #f8f8f8;
        line-height: 40px;
        text-align: left;
        overflow: hidden;

        .minTitle {
            color: @main-color;
            margin-left: 25px;
        }

        .iconfont {
            float: right;
            width: 50px;
            display: inline-block;
            text-align: center;
            font-size: 30px;
            cursor: pointer;

            &:hover {
                background-color: #f8f8f8*0.9;
            }
        }

        .text {
            float: left;
            margin-left: 30px;
        }
    }

    .ZXDialogAlertContent {
        text-align: left;
        padding: 20px;
    }

    &/deep/ .el-dialog{
        &.draft-dialog{
            background: transparent;
            border-radius: 0;
            box-shadow: none;
            .el-dialog__header{
                display: none;
            }
            .ZXDialogAlert-el-dialog{
                margin-bottom: 0;
            }
        }
    }
    &.ZXDialogAlertRight{
        .x-dialog{
            .el-dialog{
                transition: all ease-in-out 700ms;
                border-radius: 0;
                margin-top: initial !important;
                margin-right: -100% !important;
                opacity: 0;
                transform: scale(0);
                &.ZXDialogAlert-custom-class{
                    margin-right: 0 !important;
                    opacity: 1;
                    transform: scale(1);
                }
            }
        }
    }
}
</style>