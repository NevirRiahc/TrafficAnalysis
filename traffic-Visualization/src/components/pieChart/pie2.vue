<template>
    <div id="pie2"></div>
</template>

<script>

 import {dash6} from "@/api/chart";

 export default {
    data() {
        return {
            option: {
                color: ['#006cff', '#60cda0', '#ed8884', '#ff9f7f', '#0096ff', '#9fe6b8', '#32c5e9', '#1d9dff'],
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                legend: {
                    top: "90%",
                    itemWidth: 10,
                    itemHeight: 10,
                    textStyle: {
                        color: "rgba(255,255,255,.5)",
                        fontSize: "12"
                    }
                },
                series: [
                    {
                        name: '面积模式',
                        type: 'pie',
                        radius: ["10%", "70%"],
                        center: ['50%', '45%'],
                        roseType: 'area',
                        label: {
                            fontSize: 10
                        },
                        // 引导线调整
                        labelLine: {
                            // 链接扇形图线长
                            length: 6,
                            // 连接文字线长
                            length2: 8
                        },
                        data: [
                            { value: 20, name: '云南' },
                            { value: 26, name: '北京' },
                            { value: 24, name: '山东' },
                            { value: 25, name: '河北' },
                            { value: 20, name: '江苏' },
                            { value: 25, name: '浙江' },
                            { value: 30, name: '四川' },
                            { value: 42, name: '湖北' }
                        ]
                    }
                ]
            }
        }
    },
    mounted () {
      dash6().then(res=>{
        const ret = res.data.data.data
        this.option.series[0].data = ret
        this.drawChart()
      })

    },
    methods: {
        drawChart () {
            let myChart = this.$echarts.init(document.getElementById('pie2'))
            myChart.setOption(this.option)
            window.onresize = myChart.resize
        }
    }
}
</script>
<style scoped>

</style>
