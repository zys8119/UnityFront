import { ComponentOptions, RenderContext, VNode, VNodeData } from "vue"
import { CreateElement } from "vue/types/umd";
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
                            [].concat(createElement("img",{
                                attrs:{
                                    src:item.url,
                                },
                                on:{
                                    click:()=>this.downloadImg(item)
                                }
                            }))
                        ))))
                    .concat(createElement("div",
                        {
                            staticClass:"pictureFooter"
                        },
                        []
                            .concat(createElement("span",{staticClass:"total"},`共${this.total}个`))
                            .concat(createElement("span",{staticClass:"pageNo"},`第${this.pageNo+1}页`))
                            .concat(createElement("span",{staticClass:"prev",on:{click:()=>this.pageNo -=1}},`上一页`))
                            .concat(createElement("span",{staticClass:"next",on:{click:()=>this.pageNo +=1}},`下一页`))
                    ))
                )
            },
            watch:{
                select(){
                    this.pageNo = 0;
                    this.getData();
                },
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
                },
                // 获取分类数据
                getData(){
                    this.axios({
                        url:"/getData_4k",
                        method:"get",
                        params:{
                            id:this.select,
                            pageNo:this.pageNo*15,
                            pageSize:15,
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