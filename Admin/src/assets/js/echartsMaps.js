export default {
    /**
     * 线性图表
     * @param data
     * ==============data数据格式============================
     *   super_title: "履职活动统计"
         title: "履职活动总数量："
         total: 2
         legend_data: ["履职活动数量", "履职活动参与人次"]
         x_data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
         series: [{name: "履职活动数量", data: [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0]},…]
     * ==========================================
     *
     * @return {{yAxis: {type: string}, xAxis: {axisLabel: {textStyle: {color: string}}, data: *, type: string, boundaryGap: boolean}, legend: {data: *, type: string}, grid: {left: string, bottom: string, right: string, containLabel: boolean}, series: *, tooltip: {trigger: string}, toolbox: {feature: {saveAsImage: {}}}, title: {}}}
     */
    line:data=>{
        const colors = ['#B097F3','#528FEF'];
        return {
            title: {
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data:data.legend_data,
                type:"scroll"
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                axisLabel: {
                    textStyle: {
                        color: '#007020',//坐标值得具体的颜色
                    }
                },
                data: data.x_data,
            },
            yAxis: {
                type: 'value'
            },
            series:data.series.map((e,index)=>({
                ...e,
                type:"line",
                symbol: 'circle',
                symbolSize: 10,
                stack: (index+1).toString(),
                itemStyle : {
                    normal : {
                        color:colors[index] || colors[0],
                        lineStyle:{
                            color:colors[index] || colors[0]
                        }
                    }
                },
                label: {
                    normal: {
                        show: true,
                        position: 'top',
                        textStyle: {
                            color: colors[index] || colors[0],
                        }
                    },
                },
            }))
        }
    },
    /**
     * 横向柱形图表
     * @param data
     *  ==============data数据格式============================
     * super_title: "会议统计"
     meet_info: "会议总数"
     meet_unit: "场"
     document_info: "文件总数"
     document_unit: "件"
     legend_data: ["会议数量", "文件数量"]
     yAxis: {type: "category", data: ["全国会议", "人代会", "常委会会议", "主任会议", "正常会议", "座谈会"]}
     series: [{name: "会议数量", type: "bar", data: [4, 3, 9, 6, 1, 42]},…]
     ==========================================================
     * @return {{yAxis: ({type: string}|{type: string}|[{type: string}]), xAxis: {axisLabel: {formatter: string}, name: string, type: string}, legend: {data: *, y: string}, grid: {left: string, bottom: string}, series: *, tooltip: {axisPointer: {type: string}, trigger: string}, toolbox: {feature: {saveAsImage: {}}, show: boolean}, title: {}}}
     * @constructor
     */
    Horizontal_cylinder:data=>{
        const colors = ['#ED7070','#528FEF'];
        return {
            title: {
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                y:'bottom',
                data:data.legend_data
            },
            grid: {
                left:'80',
                bottom:'50'
            },
            toolbox: {
                show: true,
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'value',
                name: '数量',
                axisLabel: {
                    formatter: '{value}'
                }
            },
            yAxis: data.yAxis,
            series:data.series.map((e,index)=>({
                ...e,
                itemStyle : {
                    normal : {
                        color:colors[index] || colors[0],
                        lineStyle:{
                            color:colors[index] || colors[0]
                        }
                    }
                },
                label: {
                    normal: {
                        show: true,
                        position: 'right',
                        textStyle: {
                            color: colors[index] || colors[0],
                        }
                    },
                },
            }))
        };
    },
    /**
     * 柱形图
     * @param data
     *  ==============data数据格式============================
     *  super_title: "议案建议统计"
     title: "建议总数："
     total: 4980
     x_data: ["农业农村", "社会事业", "财政商贸", "城建环保", "政治法律", "工业交通", "综合"]
     series: [{name: "建议", data: [418, 1116, 556, 1169, 427, 851, 443]}]
     *   =====================================================
     * @return {{yAxis: [{type: string}], xAxis: [{axisLabel: {interval: number, textStyle: {color: string}}, data: *, axisTick: {alignWithLabel: boolean}, type: string}], color: [string], grid: {left: string, bottom: string, right: string, containLabel: boolean}, series: *, tooltip: {axisPointer: {type: string}, trigger: string}}}
     */
    cylinder:data=>{
        return {
            color: ['#528FEF'],
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    data : data.x_data,
                    axisTick: {
                        alignWithLabel: true
                    },
                    axisLabel: {
                        interval:0,
                        textStyle: {
                            color: '#007020',//坐标值得具体的颜色
                        }
                    },
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series :data.series.map(e=>({
                ...e,
                type:'bar',
                barWidth: '40%',
            }))
        };
    },
    line_type:data=>{
        const colors = ['#B097F3','#528FEF'];
        return {
            tooltip: {
                trigger: 'axis',
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '30',
                containLabel: true
            },
            legend: {
                y:'bottom',
                data:data.lengend_data
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                axisLabel: {
                    interval:0,
                    textStyle: {
                        color: '#007020',//坐标值得具体的颜色

                    },
                    formatter:function(value){
                        return value.split("").join("\n")
                    }
                },
                data: data.x_data
            },
            yAxis: [
                {
                    type: 'value',
                    max:20,
                    axisLine: {
                        lineStyle: {
                            color: '#B097F3'
                        }
                    },
                },
                {
                    type: 'value',
                    axisLine: {
                        lineStyle: {
                            color: '#528FEF'
                        }
                    },
                },
            ],
            series: data.series.map((e,index)=>({
                ...e,
                type:'line',
                yAxisIndex: index,
                symbol: 'circle',
                symbolSize: 10,
                stack: (index+1).toString(),
                itemStyle : {
                    normal : {
                        color:colors[index] || colors[0],
                        lineStyle:{
                            color:colors[index] || colors[0]
                        }
                    }
                },
                label: {
                    normal: {
                        show: true,
                        position: 'top',
                        textStyle: {
                            color: colors[index] || colors[0],
                        }
                    },
                },
            }))
        }
    },
    cylinder_type:data=>{
        return {
            title: {
            },
            tooltip : {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '30',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    // boundaryGap : false,
                    inverse: false,
                    axisLabel: {
                        rotate:-45,
                        textStyle: {
                            color: '#007020',//坐标值得具体的颜色
                        }
                    },
                    data:data.x_data
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series:data.series.map(e=>({
                ...e,
                name:'代表人数',
                type:'bar',
                // type:'line',
                stack: '总量',
                areaStyle: {},
                barWidth:'25',
                itemStyle : {
                    normal : {
                        color:'#528FEF',
                    }
                },
                label: {
                    normal: {
                        show: true,
                        position: 'top',
                        textStyle: {
                            color: '#528FEF',
                        }
                    },
                },
            }))
        }
    },
    pie:item=>{
        return {
            title : {
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                x: 'center',
                bottom:'20',
                data:[],
            },
            color:['#ED7070','#41B6A1','#00CE61', '#DD604E','#FBB03B'],
            toolbox: {
                show : true,
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    magicType : {
                        show: true,
                        type: ['pie', 'funnel']
                    },
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            calculable : true,
            series : [
                {
                    name:item.series[0].name,
                    type:'pie',
                    radius : [50, 80],
                    center : ['50%', '50%'],
                    // roseType : 'radius',
                    data:item.series[0].data
                }
            ]
        }
    },
    pie_party:item=>{
        return {
            title : {
            },
            tooltip : {
                trigger: 'item',
                formatter: "{b} :<br/> {c} ({d}%)",
            },
            legend: {
                x: 'left',
                y:'bottom',
                data:item.lengend_data
            },
            color:['#3468CD','#5676A7', '#EF7706','#24AA92','#366092','#6DA50C', '#D44A6C','#289158','#930408'],
            toolbox: {
                show : true,
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    magicType : {
                        show: true,
                        type: ['pie', 'funnel']
                    },
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            calculable : true,
            series : [
                {
                    name:item.series[0].name,
                    type:'pie',
                    radius : [0, 80],
                    center : ['50%', '50%'],
                    label: {
                        normal: {
                            show: true,
                            textStyle : {
                                fontWeight : 300 ,
                                fontSize : 16    //文字的字体大小
                            },
                            formatter:'{d}%'
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    lableLine: {
                        normal: {
                            show: true
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    data:item.series[0].data
                }
            ]
        }
    },
    pie_gender:item=>{
        return {
            title : {
                text: '代表性别统计：：',
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                x: 'center',
                y:'bottom',
                data:item.lengend_data
            },
            color:['#0081A8','#DD604E'],
            toolbox: {
                show : true,
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    magicType : {
                        show: true,
                        type: ['pie', 'funnel']
                    },
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            calculable : true,
            series : [
                {
                    name:item.series[0].name,
                    type:'pie',
                    radius : [50, 80],
                    center : ['50%', '50%'],
                    label: {
                        normal: {
                            show: true,
                            textStyle : {
                                fontWeight : 300 ,
                                fontSize : 16    //文字的字体大小
                            },
                            formatter:'{d}%'
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    lableLine: {
                        normal: {
                            show: true
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    // roseType : 'radius',
                    data:item.series[0].data
                }
            ]
        }
    },
    pie_education:item=>{
        return {
            title : {
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                x: 'center',
                y:'bottom',
                data:item.lengend_data,
            },
            color:['#A485FA','#00CE61','#00B2EE','#F8DA5E','#F28370'],
            toolbox: {
                show : true,
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    magicType : {
                        show: true,
                        type: ['pie', 'funnel']
                    },
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            calculable : true,
            series : [
                {
                    name:item.series[0].name,
                    type:'pie',
                    radius : [50, 80],
                    center : ['50%', '50%'],
                    label: {
                        normal: {
                            show: true,
                            textStyle : {
                                fontWeight : 300 ,
                                fontSize : 16    //文字的字体大小
                            },
                            formatter:'{d}%'
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    lableLine: {
                        normal: {
                            show: true
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    // roseType : 'radius',
                    data:item.series[0].data
                }
            ]
        }
    },
    /**
     * 五水共治-水质信息
     * @param data
     * @return {{yAxis: {type: string}, xAxis: {data: *, type: string, boundaryGap: boolean}, legend: {data: *}, grid: {left: string, bottom: string, right: string, containLabel: boolean}, series: *, tooltip: {trigger: string}, toolbox: {feature: {saveAsImage: {}}}}}
     */
    viewWaterQuality:data=>{
        return {
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: data.legend
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data:data.monthData
            },
            yAxis: {
                type: 'value'
            },
            series: data.seriesData
        }
    }
}