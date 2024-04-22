<template>
    <div id="line2"></div>
</template>

<script>
import {dash5} from "@/api/chart";
import echarts from 'echarts'

export default {
    data() {
        return {
            option: {
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    top: "0%",
                    textStyle: {
                        color: "rgba(255,255,255,.5)",
                        fontSize: "12"
                    }
                },
                grid: {
                    top: '20%',
                    left: '0%',
                    right: '0%',
                    bottom: '0%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        textStyle: {
                          color: "rgba(255,255,255,.6)",
                          fontSize: 5,
                        },
                      rotate: "40",
                    },
                    axisLine: {
                        lineStyle: {
                            color: "rgba(255,255,255,.2)"
                        }
                    },
                    boundaryGap: false,  // 去除轴内间距
                    data: [ "01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","26","28","29","30"]
                },
                yAxis: [
                    {
                        type: 'value',
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            textStyle: {
                                color: "rgba(255,255,255,.6)",
                                fontSize: 12
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                color: "rgba(255,255,255,.1)"
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                color: "rgba(255,255,255,.1)"
                            }
                        }
                    }
                ],
                series: [
                    {
                        name:'行程时间(s)',
                        data: [30, 40, 30, 40,30, 40, 30,60,20, 40, 30, 40, 30, 40,30, 40, 30,60,20, 40, 30, 40, 30, 40,30, 40, 20,60,50, 40],
                        type: 'line',
                        smooth: true,
                        lineStyle: {
                            color: "#0184d5",
                            width: 2
                        },
                        // 填充区域
                        areaStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1,
                            [
                                {
                                    offset: 0,
                                    color: "rgba(1, 132, 213, 0.4)"   // 渐变色的起始颜色
                                },
                                {
                                    offset: 0.8,
                                    color: "rgba(1, 132, 213, 0.1)"   // 渐变线的结束颜色
                                }
                            ],
                            false),
                            shadowColor: "rgba(0, 0, 0, 0.1)"
                        },
                        // 设置拐点 小圆点
                        symbol: "circle",
                        // 拐点大小
                        symbolSize: 8,
                        // 设置拐点颜色以及边框
                        itemStyle: {
                            color: "#0184d5",
                            borderColor: "rgba(221, 220, 107, .1)",
                            borderWidth: 12
                        },
                        // 开始不显示拐点， 鼠标经过显示
                        showSymbol: false
                    },
                  // {
                  //       name: "转发量",
                  //       type: "line",
                  //       data: [50, 10, 20, 40,30, 40, 80,60,20, 40, 30, 40,20, 40,30, 40, 30, 20,20, 40, 80, 70, 30, 40, 30, 20, 20, 50, 50, 20],
                  //       smooth: true,
                  //       lineStyle: {
                  //           normal: {
                  //               color: "#00d887",
                  //               width: 2
                  //           }
                  //       },
                  //       areaStyle: {
                  //           normal: {
                  //               color: new echarts.graphic.LinearGradient(0, 0, 0,
                  //               1,
                  //               [
                  //                   {
                  //                   offset: 0,
                  //                   color: "rgba(0, 216, 135, 0.4)"
                  //                   },
                  //                   {
                  //                   offset: 0.8,
                  //                   color: "rgba(0, 216, 135, 0.1)"
                  //                   }
                  //               ],
                  //               false
                  //               ),
                  //               shadowColor: "rgba(0, 0, 0, 0.1)"
                  //           }
                  //       },
                  //       // 设置拐点 小圆点
                  //       symbol: "circle",
                  //       // 拐点大小
                  //       symbolSize: 5,
                  //       // 设置拐点颜色以及边框
                  //       itemStyle: {
                  //           color: "#00d887",
                  //           borderColor: "rgba(221, 220, 107, .1)",
                  //           borderWidth: 12
                  //       },
                  //       // 开始不显示拐点， 鼠标经过显示
                  //       showSymbol: false,
                  //   }
                ]
            }
        }
    },
    mounted () {
      dash5().then(res=>{
        const ret = res.data.data.data.slice(0,12)
        this.option.xAxis.data  = ret.map(i=>{return i.name})
        this.option.series[0].data = ret.map(i=>{return i.value})
        this.drawChart()
      })

    },
    methods: {
        drawChart () {
            let myChart = this.$echarts.init(document.getElementById('line2'))
            myChart.setOption(this.option)
            window.onresize = myChart.resize
        }
    }
}
</script>
<style scoped>

</style>
