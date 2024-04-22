<template>
    <div id="pie1"></div>
</template>

<script>
import {dash3} from "@/api/chart";

export default {
    data() {
        return {
            option: {
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b}: {c} ({d}%)'
                },
                legend: {
                    // 距离底部为0%
                    bottom: "0%",
                    // 小图标的宽度和高度
                    itemWidth: 10,
                    itemHeight: 10,
                    data: ["0岁以下", "20-29岁", "30-39岁", "40-49岁", "50岁以上"],
                    // 修改图例组件的文字为 12px
                    textStyle: {
                        color: "rgba(255,255,255,.5)",
                        fontSize: "12"
                    }
                },
                series: [
                    {
                        name: '累计流量',
                        type: 'pie',
                        center: ["50%", "35%"],
                        radius: ['40%', '60%'],
                        avoidLabelOverlap: false,
                        label: {
                            show: false,
                            position: 'center'
                        },
                        labelLine: {
                            show: false
                        },
                        data: [
                            { value: 18, name: "0岁以下" },
                            { value: 42, name: "20-29岁" },
                            { value: 21, name: "30-39岁" },
                            { value: 27, name: "40-49岁" },
                            { value: 14, name: "50岁以上" }
                        ]
                    }
                ]
            }
        }
    },
    mounted () {
      dash3().then(res=>{
        const ret = res.data.data.data.slice(0,10)
        this.option.series[0].data = ret.map(i=>{
          return {
            name: i.name,
            value: i.value*1000
          }
        })
        this.option.legend.data = ret.map(i=>{return i.name})
        this.drawChart()
      })

    },
    methods: {
        drawChart () {
            let myChart = this.$echarts.init(document.getElementById('pie1'))
            myChart.setOption(this.option)
            window.onresize = myChart.resize
        }
    }
}
</script>
<style scoped>

</style>
