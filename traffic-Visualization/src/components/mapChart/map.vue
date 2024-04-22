<template>
    <div id="map" ref="myChart"></div>
</template>

<script>
import '../../../node_modules/echarts/map/js/china.js'
import echarts from "echarts";
import {dashMap} from "@/api/chart";
import axios from "axios";

export default {
    data() {
        return {
            option: {}
        }
    },
    mounted () {
      dashMap().then(res=>{
        const ret = res.data.data.data

        axios.create({
          baseURL: '/',
          timeout: 50000,
          // headers : {"Access-Control-Allow-Origin":"*"}
        }).get('/shenzhen.json').then(res=>{
          console.log(res)
          this.initData(res.data, ret)
        })

        // service.get('https://ironbeetle.cn/shenzhen.json').then(res=>{
        //   console.log(res)
        //   this.initData(res.data, ret)
        // })
      })
    },
    methods: {
        initData(data, mData) {
          echarts.registerMap('sz', data);

          this.option= {
            // backgroundColor: '#093a88',
            tooltip: {
              trigger: 'item',
              formatter: '{b}'
            },
            geo: [
              {
                map: 'sz',
                zoom: 1.015,
                // top: '25%',
                // bottom: '15%',
                roam: false,
                itemStyle: {
                  normal: {
                    areaColor: '#093c8b',
                    // borderColor: '#ccc',
                    // borderWidth: 10,
                    shadowColor: '#e0dfb8',
                    shadowOffsetX: 0,
                    shadowOffsetY: 5
                  },
                },
                silent: true,
              },
              {
                map: 'sz',
                roam: false,
                itemStyle: {
                  normal: {
                    shadowColor: '#093c8b',
                    shadowOffsetX: -4,
                    shadowOffsetY: 4
                  },
                }
              }
            ],
            visualMap: {
              min: 0,
              max: 1000,
              left: 16,
              bottom: 11,
              showLabel: !0,
              textStyle: {
                color: 'rgba(255,255,255,0.7)'
              },
              // 图例
              pieces: [
                {
                  gt: 3,
                  label: '非常拥堵',
                  color: '#DD2C00',
                },
                {
                  gte: 2,
                  lte: 3,
                  label: '较为拥堵',
                  color: 'rgba(255,193,7,0.86)',
                },
                {
                  gte: 1,
                  lt: 2,
                  label: '一般',
                  color: '#f6fd35',
                },
                {
                  gt: 0,
                  lt: 1,
                  label: '畅通',
                  color: 'rgba(44,255,2,0.7)'
                },
              ],
              show: !0,
            },
            series: [
              {
                type: 'map',
                mapType: 'sz', // 自定义扩展图表类型
                label: { show: false },
                geoIndex: 1,
                itemStyle: {
                  areaColor: 'rgba(0,0,0,0)',
                  // areaColor: 'transparent',
                  // shadowColor: '#093c8b',
                  // shadowOffsetX: -3,
                  // shadowOffsetY: 3
                },

              },
              {
                type: 'map',
                mapType: 'sz', // 自定义扩展图表类型
                label: { show: true },
                geoIndex: 2,
                itemStyle: {
                  areaColor: '#98d4ff',
                },
                // data:[
                //   {'name':'龙华区','value':100}
                // ]
                data:mData,
              },
            ]
          }

          let myChart = this.$echarts.init(document.getElementById('map'))
          myChart.setOption(this.option)
          window.onresize = myChart.resize
        }
    }
}
</script>
<style scoped>

</style>
