import echarts from "echarts"
export default {
    default:data=>{
        return {
            legend: {
                type:"scroll",
                data: ['2019年','2018年',],
                textStyle:{
                    color:"rgba(139, 168, 200, 1)",
                    fontSize:12
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                },
                formatter(data){
                    return data.map(e=>`${e.seriesName}${e.name}会议：${e.data}场`).join('<br>');
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['1月', '2月', '3月', '4月', '5月', '6月'],
                axisLabel:{
                    color:"rgba(255, 255, 255, 1)",
                    fontSize:14
                },
                axisLine:{
                    lineStyle:{
                        color:"#fff"
                    }
                }
            },
            yAxis: {
                type: 'value',
                name:"单位",
                nameTextStyle:{
                    color:"rgba(255, 255, 255, 1)",
                    fontSize:12
                },
                axisLabel:{
                    color:"rgba(255, 255, 255, 1)",
                    fontSize:14
                },
                axisLine:{
                    lineStyle:{
                        color:"#fff"
                    }
                },
                splitLine: {
                    lineStyle:{
                        color:"rgba(46, 57, 69, 1)"
                    }
                }
            },
            series: [
                {
                    name:"2019年",
                    data: [5, 8, 15, 5, 10, 20],
                    type: 'line',
                    itemStyle:{
                      color:"rgba(78, 63, 160, 1)"
                    },
                    lineStyle:{
                      color:"rgba(78, 63, 160, 1)"
                    },
                    areaStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: 'rgba(78, 63, 160, 1)' // 0% 处的颜色
                            }, {
                                offset: 0.99, color: 'rgba(33, 35, 72, 1)' // 100% 处的颜色
                            }, {
                                offset: 1, color: 'rgba(216, 216, 216, 1)' // 100% 处的颜色
                            }],
                            global: false // 缺省为 false
                        }
                    }
                },
                {
                    name:"2018年",
                    data: [5, 8, 15, 5, 10, 20].reverse(),
                    type: 'line',
                    itemStyle:{
                        color:"rgba(86, 222, 231, 1)"
                    },
                    lineStyle:{
                        color:"rgba(86, 222, 231, 1)",
                        type:"dashed"
                    },

                }
            ]
        }
    },
    statisticsA:data=>{
        return {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                },
                formatter(data){
                    return data.map(e=>`${e.seriesName}${e.name}会议：${e.data}场`).join('<br>');
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['海曙', '北仑', '镇海', '慈溪', '鄞州', '江北'],
                axisLabel:{
                    color:"rgba(255, 255, 255, 1)",
                    fontSize:14
                },
                axisLine:{
                    lineStyle:{
                        color:"#fff"
                    }
                }
            },
            yAxis: {
                type: 'value',
                nameTextStyle:{
                    color:"rgba(255, 255, 255, 1)",
                    fontSize:12
                },
                axisLabel:{
                    color:"rgba(255, 255, 255, 1)",
                    fontSize:14
                },
                axisLine:{
                    lineStyle:{
                        color:"#fff"
                    }
                },
                splitLine: {
                    lineStyle:{
                        color:"rgba(46, 57, 69, 1)"
                    }
                }
            },
            series: [
                {
                    name:"2019年",
                    data: [5, 8, 15, 5, 10, 20],
                    type: 'line',
                    itemStyle:{
                      color:"rgba(13, 145, 171, 1)"
                    },
                    lineStyle:{
                      color:"rgba(13, 145, 171, 1)"
                    },
                    areaStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: 'rgba(13, 145, 171, 1)' // 0% 处的颜色
                            }, {
                                offset: 0.99, color: 'rgba(13, 105, 123, 0.04)' // 100% 处的颜色
                            }, {
                                offset: 1, color: 'rgba(216, 216, 216, 1)' // 100% 处的颜色
                            }],
                            global: false // 缺省为 false
                        }
                    }
                },
                {
                    name:"2018年",
                    data: [5, 8, 15, 5, 10, 20].reverse(),
                    type: 'line',
                    itemStyle:{
                        color:"rgba(149, 228, 25, 1)"
                    },
                    lineStyle:{
                        color:"rgba(149, 228, 25, 1)",
                        type:"dashed"
                    },

                }
            ]
        }
    },
    official:data=>{
        return {
            legend: {
                type:"scroll",
                data: ['办件','论阅件',],
                textStyle:{
                    color:"rgba(139, 168, 200, 1)",
                    fontSize:12
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'none',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                },
                formatter(data){
                    return data.map(e=>`${e.seriesName}${e.name}会议：${e.data}场`).join('<br>');
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['', '1月', '2月', '3月', '4月', '5月', '6月', ''],
                axisLabel:{
                    color:"rgba(255, 255, 255, 1)",
                    fontSize:14
                },
                axisLine:{
                    lineStyle:{
                        color:"#fff"
                    }
                }
            },
            yAxis: {
                type: 'value',
                name:"单位",
                nameTextStyle:{
                    color:"rgba(255, 255, 255, 1)",
                    fontSize:12
                },
                axisLabel:{
                    color:"rgba(255, 255, 255, 1)",
                    fontSize:14
                },
                axisLine:{
                    lineStyle:{
                        color:"#fff"
                    }
                },
                splitLine: {
                    show:false
                }
            },
            series: [
                {
                    name:"办件",
                    data: [0, 5, 8, 15, 5, 10, 20, 0],
                    type: 'bar',
                    barWidth:16,
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                {offset: 0, color: 'rgba(119, 75, 227, 1)'},
                                {offset: 1, color: 'rgba(88, 212, 227, 1)'},
                            ]
                        )
                    },
                    emphasis: {
                        itemStyle: {
                            color:"#57DFE7"
                        }
                    },
                },
                {
                    name:"论阅件",
                    data: [0, 5, 8, 15, 5, 10, 20, 0].reverse(),
                    type: 'bar',
                    barWidth:16,
                    itemStyle: {
                        color: "rgba(116, 88, 227, 1)"
                    },
                    emphasis: {
                        itemStyle: {
                            color:"#57DFE7"
                        }
                    },
                }
            ]
        }
    },
    pie:data=>{
        return  {
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            legend: {
                orient: 'vertical',
                right: "25%",
                top: "25%",
                data: ['常委会：50场', '主任会：45场', '座谈会：38场', '正常会议：20场', '全国会议：1场','人代会：1场'],
                textStyle:{
                    color:"#ffffff",
                    fontSize:16
                }
            },
            color:[
                '#3625A2',
                '#44BED9',
                '#4469B1',
                '#96AC16',
                '#58A322',
                '#1AA951',
            ],
            width:"50%",
            series: [
                {
                    name: '本届会议',
                    type: 'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: [
                        {value: 335, name: '常委会：50场',emphasis:{label:{color:"#fff", fontSize:18}}},
                        {value: 310, name: '主任会：45场',emphasis:{label:{color:"#fff", fontSize:18}}},
                        {value: 234, name: '座谈会：38场',emphasis:{label:{color:"#fff", fontSize:18}}},
                        {value: 135, name: '正常会议：20场',emphasis:{label:{color:"#fff", fontSize:18}}},
                        {value: 1548, name: '全国会议：1场',emphasis:{label:{color:"#fff", fontSize:18}}},
                        {value: 1548, name: '人代会：1场',emphasis:{label:{color:"#fff", fontSize:18}}}
                    ]
                }
            ]
        };
    },
    officialEcharts:data=>{
        return {
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['', '1月', '2月', '3月', '4月', '5月', '6月', ''],
                axisLabel:{
                    color:"rgba(255, 255, 255, 1)",
                    fontSize:14
                },
                axisLine:{
                    lineStyle:{
                        color:"#fff"
                    }
                }
            },
            yAxis: {
                type: 'value',
                name:"单位",
                nameTextStyle:{
                    color:"rgba(255, 255, 255, 1)",
                    fontSize:12
                },
                axisLabel:{
                    color:"rgba(255, 255, 255, 1)",
                    fontSize:14
                },
                axisLine:{
                    lineStyle:{
                        color:"#fff"
                    }
                },
                splitLine: {
                    show:false
                }
            },
            series: [
                {
                    name:"办件",
                    data: [
                        {value:0,label:{show:false,position:"top",backgroundColor:"#00326f",color:"#fff",padding:[5,10]}},
                        {value:5,label:{show:true,position:"top",backgroundColor:"#00326f",color:"#fff",padding:[5,10]}},
                        {value:5,label:{show:true,position:"top",backgroundColor:"#00326f",color:"#fff",padding:[5,10]}},
                        {value:5,label:{show:true,position:"top",backgroundColor:"#00326f",color:"#fff",padding:[5,10]}},
                        {value:5,label:{show:true,position:"top",backgroundColor:"#00326f",color:"#fff",padding:[5,10]}},
                        {value:5,label:{show:true,position:"top",backgroundColor:"#00326f",color:"#fff",padding:[5,10]}},
                        {value:5,label:{show:true,position:"top",backgroundColor:"#00326f",color:"#fff",padding:[5,10]}},
                        {value:0,label:{show:false,position:"top",backgroundColor:"#00326f",color:"#fff",padding:[5,10]}},
                    ],
                    type: 'bar',
                    barWidth:16,
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                {offset: 0, color: 'rgb(0,243,251)'},
                                {offset: 1, color: 'rgb(1,80,167)'},
                            ]
                        )
                    },
                    emphasis: {
                        itemStyle: {
                            color:"#57DFE7"
                        }
                    },
                }
            ]
        }
    },
    MeetingFileEcharts:data=>{
        let yAxisData = ['宁波', '海曙', '鄞州', '江北', '北仑', '镇海'];
        return {
            color:['#57DFE9','#E95757','#8451FF'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                data: ['下载', '转发', '分享',],
                textStyle:{
                    color:"#8BA8C8",
                    fontSize:12
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                axisLabel:{
                    show:false
                },
                splitLine:{
                    show:false
                }
            },
            yAxis: {
                type: 'category',
                data: yAxisData,
                axisLabel:{
                    show:true,
                    color:"#ffffff",
                    formatter(name,index){
                        return `NO.${yAxisData.length-index} ${name}`;
                    }
                },
                minInterval:50,
            },
            series: [
                {
                    name: '下载',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        show: true,
                        position: 'insideRight',
                    },
                    data: [320, 302, 301, 334, 390, 330]
                },
                {
                    name: '转发',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        show: true,
                        position: 'insideRight',
                    },
                    data: [120, 132, 101, 134, 90, 230]
                },
                {
                    name: '分享',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        show: true,
                        position: 'insideRight',
                    },
                    data: [220, 182, 191, 234, 290, 300]
                },
            ]
        };
    }
}