<template>
    <div id="line1"></div>
</template>

<script>
import {dash2} from "@/api/chart";

export default {
    data() {
        return {
            option: {
                color: ["#00f2f1", "#ed3f35"],
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    // 如果series 对象有name 值，则 legend可以不用写data
                    textStyle: {
                        color: '#4c9bfd'
                    },
                    right: '10%'
                },
                grid: {
                    top: '20%',
                    left: '0%',
                    right: '0%',
                    bottom: '0%',
                    show: true,
                    borderColor: '#012f4a',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        color: '#4c9bfd' // 文本颜色
                    },
                    axisLine: {
                        show: false // 去除轴线
                    },
                    boundaryGap: false,  // 去除轴内间距
                    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
                },
                yAxis: [
                    {
                        type: 'value',
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            color:'#4c9bfd'
                        },
                        axisLine: {
                            show: false
                        },
                        splitLine: {
                            lineStyle: {
                                color: '#012f4a' // 分割线颜色
                            }
                        }
                    }
                ],
                series: [
                    {
                        name:'flux',//流量
                        data:  [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
                        type: 'line',
                        smooth: true
                    },
                  // {
                  //       name:'新增游客',
                  //       data: [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79],
                  //       type: 'line',
                  //       smooth: true
                  //   }
                ]
            }
        }
    },
    mounted () {
      dash2().then(res=>{
        const ret =res.data.data.data
        this.option.xAxis.data = ret.map(i=>{return i.name })
        this.option.series[0].data = ret.map(i=>{return i.value*1000})
        this.drawChart()
      })

    },
    methods: {
        drawChart () {
            let myChart = this.$echarts.init(document.getElementById('line1'))
            myChart.setOption(this.option)
            window.onresize = myChart.resize
        }
    }
}
</script>
<style scoped>

</style>
