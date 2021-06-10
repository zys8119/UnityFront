<template>
    <div class="MenuRoleSelect">
        <div class="inner el-row el-col-16">
            <div class="top">
                <slot name="title">
                    <p class="title">角色名称：信息上报审核员</p>
                    <div class="min_title">菜单设置：</div>
                </slot>
                <ul class="btn-area">
                    <li v-for="(item,key) in menuArr" @click="handleIsCheck(item)" :key="key">
                        <div class="message" :class="item.active ? 'active' : ''"><slot :data="item">{{item[showFieldName]}}</slot></div>
                    </li>
                </ul>
            </div>
            <div class="bottom" v-if="selective">
                <slot name="titleFooter">
                    <div class="min_title">已选择菜单（可拖拽换顺序）：</div>
                </slot>
                <draggable v-model="selectedMenuArr" group="people" @start="drag=true" @end="drag=false" v-if="draggable"
                           class="selected-area">
                    <li v-for="(item,key) in selectedMenuArr" :key="key">
                        <div class="message app_msg"><slot :data="item">{{item[showFieldName]}}</slot></div>
                    </li>
                </draggable>
                <div class="selected-area" v-else>
                    <li v-for="(item,key) in selectedMenuArr" :key="key">
                        <div class="message app_msg"><slot :data="item">{{item[showFieldName]}}</slot></div>
                    </li>
                </div>
                <div @click="handleSave" class="save-btn">保存</div>
            </div>
        </div>
    </div>
</template>

<script>
import draggable from 'vuedraggable'
export default {
    name: "MenuRoleSelect",
    components: {
        draggable
    },
    props:{
        // 菜单
        menus:{type:Array,default:Array},
        // v-model
        value:{type:Array,default:Array},
        // 显示的字段
        showFieldName:{type:String,default:"name"},
        // 绑定的value字段
        valueField:{type:String,default:"id"},
        // 是否允许拖拽排序
        draggable:{type:Boolean,default:true},
        // 是否可选择
        selective:{type:Boolean,default:true},
    },
    data() {
        return {
            menuArr: [],
            selectedMenuArr: []
        }
    },
    watch:{
        menus(){
            this.initMenus();
        },
        value(){
            this.initValue();
        }
    },
    mounted() {
        this.initMenus();
        this.initValue();
    },
    methods:{
        //初始化菜单
        initMenus(){
            this.menuArr = this.menus;
        },
        //初始化value
        initValue(){
            this.selectedMenuArr = this.value;
        },
        // 判断是否点击
        handleIsCheck(item) {
            if(!this.selective){
                return
            }
            item.active = !item.active;
            if (item.active) {
                this.selectedMenuArr.push(item);
            } else {
                let i = 0;
                this.selectedMenuArr.forEach((initem, index) => {
                    if (initem[this.valueField] == item[this.valueField]) i = index;
                });
                this.selectedMenuArr.splice(i, 1);
            }
            this.$emit("input",this.selectedMenuArr)
        },
        // 保存
        handleSave() {
            let ids = '';
            this.selectedMenuArr.forEach((item, index) => {
                if(this.draggable){
                    ids += item[this.valueField] + ':' + index + ','
                }else {
                    ids += item[this.valueField] + ','
                }
            });
            ids = ids.slice(0, -1);
            this.$emit("save",ids,this.selectedMenuArr);
        },
    }
}
</script>

<style scoped lang="less">
    .MenuRoleSelect {
        .inner {
            width: 100%;
            margin-top: 10px;
            padding: 0 30px;

            .title {
                color: #252A31;
                font-size: 14px;
                margin: 10px 0;
            }

            .top {
                .btn-area {
                    display: flex;
                    flex-wrap: wrap;
                }

                .btn-area li {
                    margin: 10px 0;
                    text-align: center;
                    margin-left: 30px;
                    line-height: 40px;

                    .message {
                        display: inline-block;
                        border: 1px solid #D9D9D9;
                        text-align: center;
                        cursor: pointer;
                        padding: 0 26px;
                        color: #262A30;
                        border-radius: 2px;

                        &.active {
                            border-color: #09AF39;
                            color: #09AF39;
                            position: relative;

                            &:before {
                                content: '';
                                position: absolute;
                                right: 0;
                                bottom: 0;
                                border-width: 13px;
                                border-style: solid;
                                border-color: transparent #09AF39 #09AF39 transparent;
                            }

                            &:after {
                                content: "";
                                position: absolute;
                                right: 5px;
                                bottom: 3px;
                                width: 4px;
                                height: 8px;
                                border: 2px solid #ffffff;
                                border-top: 0;
                                border-left: 0;
                                transform: rotate(39deg);
                                border-radius: 0 0 2px 0;
                            }
                        }
                    }
                }
            }

            .bottom {
                margin-top: 100px;

                .selected-area {
                    border: 1px solid #e4f0fd;
                    box-sizing: border-box;
                    display: flex;
                    flex-wrap: wrap;

                    li {
                        margin: 10px 0;
                        text-align: center;
                        margin-left: 28px;
                        line-height: 40px;
                        padding-right: 2px;

                        .message {
                            display: inline-block;
                            border: 1px solid #09AF39;
                            text-align: center;
                            cursor: pointer;
                            padding: 0 26px;
                            border-radius: 2px;
                            color: #09AF39;

                            &.app_msg {
                                background-color: #09AF39;
                                color: #ffffff;
                            }
                        }
                    }
                }

                .save-btn {
                    width: 166px;
                    height: 42px;
                    line-height: 42px;
                    text-align: center;
                    cursor: pointer;
                    background-color: #09AF39;
                    color: #ffffff;
                    float: left;
                    margin-top: 54px;
                    border-radius: 2px;
                    margin-bottom: 50px;
                    font-size: 16px;
                }
            }
        }

        .min_title {
            color: #5C626B;
            font-size: 14px;
            position: relative;
            padding-left: 10px;
            margin: 26px 0;

            &:before {
                content: "";
                position: absolute;
                left: 0;
                top: 0;
                width: 4px;
                height: 100%;
                background-color: #AF0A0B;
            }
        }
    }
</style>