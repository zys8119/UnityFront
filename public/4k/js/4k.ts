// @ts-ignore
import { ComponentOptions, RenderContext, VNode, VNodeData } from "vue"
// @ts-ignore
import { CreateElement } from "vue/types/umd";
// @ts-ignore
import { DefaultProps } from "vue/types/options";
import { AxiosInstance, AxiosRequestConfig } from "axios";
declare const Vue:any;
interface optionType4k{
    navlist:any[];
    axios:AxiosInstance;
    [key:string]:any;
}
window['4k_init'] = class {
    constructor({navlist,axios:axiosObj}:optionType4k) {
        return new Vue(<ComponentOptions<any>>{
            data(){
                return {
                    navlist:navlist,
                    select:(navlist[0] || {}).id,
                    imgs:{
                        data:[],
                    },
                    pageNo:0,
                    pageSize:20,
                }
            },
            computed:{
                total(){
                    if(isNaN(parseInt(this.imgs.total))){
                        return 0;
                    }
                    return parseInt(this.imgs.total);
                }
            },
            render(createElement: CreateElement, hack: RenderContext<DefaultProps>): VNode {
                return createElement("div",{
                    attrs:{
                        id:"app"
                    }
                },[]
                    .concat(createElement("div",
                        {class:"headerBox"},
                        this.navlist.map(item=> createElement('div',
                            <VNodeData>{
                                class: {
                                    select:this.select === item.id
                                },
                                staticClass:"headerBoxItem",
                                on:{
                                    click:()=>this.clickSwitch(item)
                                }
                            },item.name)
                        ),
                    ))
                    .concat(createElement("div",
                        {
                            staticClass:"pictureBox"
                        },
                        this.imgs.data.map(item=>createElement('div',
                            {
                                staticClass:"pictureItem"
                            },
                            []
                                .concat(createElement("img",{
                                    attrs:{
                                        src:item.url,
                                    },
                                    on:{
                                        click:()=>this.downloadImg(item)
                                    }
                                }))
                                .concat(createElement("div",{staticClass:"mask"},
                                    []
                                        .concat(createElement("span",{staticClass:"resolution"},item.resolution))
                                        .concat(createElement("span",{staticClass:"utag"},item.utag))
                                ))
                        ))))
                    .concat(createElement("div",
                        {
                            staticClass:"pictureFooter"
                        },
                        []
                            .concat(createElement("span",{staticClass:"total"},`共${this.total}个`))
                            .concat(createElement("span",{staticClass:"pageNo"},`第${this.pageNo+1}页, 跳转到 `))
                            .concat(createElement("input",<VNodeData>{
                                staticClass:"go",
                                domProps:{
                                    value:this.pageNo+1,
                                },
                                on:{
                                    input:(e)=>{
                                        const pageNo = parseInt(e.target.value);
                                        if(!isNaN(pageNo)){
                                            this.pageNo = pageNo - 1;
                                        }
                                    }
                                }
                            }))
                            .concat(createElement("span",{staticClass:"prev",on:{click:()=>this.pageNo -=1}},`上一页`))
                            .concat(createElement("span",{staticClass:"next",on:{click:()=>this.pageNo +=1}},`下一页`))
                    ))
                )
            },
            watch:{
                pageNo(){
                    this.getData();
                }
            },
            mounted() {
                this.getData();
            },
            methods:{
                axios(data:AxiosRequestConfig){
                    return axiosObj({
                        baseURL:"/Dome/Img4k",
                        ...data,
                    });
                },
                // 选择分类
                clickSwitch(item){
                    this.select = item.id;
                    this.pageNo = 0;
                    this.getData();
                },
                // 获取分类数据
                getData(){
                    this.axios({
                        url:"/getData_4k",
                        method:"get",
                        params:{
                            id:this.select,
                            pageNo:this.pageNo*this.pageSize,
                            pageSize:this.pageSize,
                        }
                    }).then(res=>{
                        this.imgs = res.data.data;
                    })
                },
                // 下载图片
                downloadImg(item){
                    open("/Dome/Img4k/downloadImg?url="+item.url)
                }
            }
        }).$mount("#app")
    }
}