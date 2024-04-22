<template>
    <div id="bar2"></div>
</template>

<script>
import {dash4} from "@/api/chart";

export default {
    data() {
        return {
            myColor: ["#1089E7", "#F57474", "#56D0E3", "#F8B448", "#8B78F6"],
            option: {
                grid: {
                    top: "10%",
                    left: "22%",
                    bottom: "10%"
                },
                xAxis: {
                    show: false
                },
                yAxis: [
                    {
                        show: true,
                        data: ["HTML5", "CSS3", "JavaScript", "VUE", "NODE"],
                        inverse: true,
                        axisLine: {
                            show: false
                        },
                        splitLine: {
                            show: false
                        },
                        axisLabel: {
                            color: "#fff"
                        }
                    },
                    {
                        show: false,
                        inverse: true,
                        data: [702, 350, 610, 793, 664],
                        // 不显示y轴的线
                        axisLine: {
                            show: false
                        },
                        // 不显示刻度
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            textStyle: {
                                fontSize: 12,
                                color: "#fff"
                            }
                        }
                    }
                ],
                series: [
                    {
                        name: "条",
                        type: "bar",
                        yAxisIndex: 0,
                        data: [70, 34, 60, 78, 69],
                        // 柱子间的距离
                        barCategoryGap: 50,
                        barWidth: 10,
                        itemStyle: {
                            normal: {
                                barBorderRadius: 20,
                                color: function (params){
                                    var colorList = ["#1089E7", "#F57474", "#56D0E3", "#F8B448", "#8B78F6"];
                                    var num = colorList.length;
                                    return colorList[params.dataIndex % num];
                                }
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                // 图形内显示
                                position: "inside",
                                // 文字的显示格式
                                formatter: "{c} （km/h）"
                            }
                        }
                    }, {
                        name: "框",
                        type: "bar",
                        yAxisIndex: 1,
                        data: [100, 100, 100, 100, 100],
                        // 柱子间的距离
                        barCategoryGap: 50,
                        barWidth: 15,
                        itemStyle: {
                            color: "none",
                            borderColor: "#00c1de",
                            borderWidth: 3,
                            barBorderRadius: 15
                        }
                    }
                ]
            }
        }
    },
    mounted () {
      dash4().then(res=>{
        console.log(res)
        let ret = res.data.data.data.slice(0,5)
        this.option.yAxis[0].data = ret.map(i=>{return i.name})
        this.option.series[0].data = ret.map(i=>{return i.value})
        this.drawChart()
      })


    },
    methods: {
        drawChart () {
            let myChart = this.$echarts.init(document.getElementById('bar2'))
            myChart.setOption(this.option)
            window.onresize = myChart.resize
        }
    }
}
</script>
<style scoped>

</style>
