<template>
    <div id="bar1"></div>
</template>

<script>

import {dash1} from "@/api/chart";

export default {
    props: ['yData'],
    data() {
        return {
            myChart: {},
            option: {
                color: ['#2f89cf'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    left: "0%",
                    top: "10px",
                    right: "0%",
                    bottom: "4%",
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        data: ["旅游", "教育", "游戏", "医疗", "电商", "社交", "金融"],
                        axisTick: {
                            alignWithLabel: true
                        },
                        axisLabel: {
                            color: "rgba(255,255,255,.6)",
                            fontSize: "5",
                          rotate: "40",
                        },
                        axisLine: {
                            show: false
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        axisLabel: {
                            color: "rgba(255,255,255,.6)",
                            fontSize: "12"
                        },
                        axisLine: {
                            lineStyle: {
                                color: "rgba(255,255,255,.1)"
                            }
                        },
                        // 分割线样式
                        splitLine: {
                            lineStyle: {
                                color: "rgba(255,255,255,.1)"
                            }
                        }
                    }
                ],
                series: [
                    {
                        name: '直接访问',
                        data: this.yData,
                        type: 'bar',
                        // 修改柱子宽度
                        barWidth: '30%',
                        itemStyle: {
                            // 修改柱子圆角
                            barBorderRadius: 5
                        }
                    }
                ]
            }
        }
    },
    watch: {
        yData: {
            handler (newValue, oldValue) {
                if (newValue != oldValue) {
                    this.option.series[0].data = newValue
                    this.myChart.setOption(this.option)
                }
            }
        }
    },
    mounted () {
      dash1().then(res=>{
        const ret = res.data.data.data.slice(0,10)
        this.option.xAxis[0].data = ret.map(i=>{return i.name})
        this.option.series[0].data = ret.map(i=>{return i.value*1000})
        this.myChart = this.$echarts.init(document.getElementById('bar1'))
        this.drawChart()
      })

    },
    methods: {
        drawChart () {
            this.myChart.setOption(this.option)
            window.onresize = this.myChart.resize
        }
    }
}
</script>
<style scoped>

</style>
