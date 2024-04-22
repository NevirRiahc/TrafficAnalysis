<template>
<!--  堆叠折线图-->
  <div style="width: 100%;">
    <v-chart autoresize :theme="theme" :loading="loading" :option="chartOption" style="height: 400px"></v-chart>
  </div>
</template>

<script>
export default {
  props:{
    theme: {
      type: String,
      default: () => '',
    },
    title: {
      type: String,
      default: () => '',
    },
    width: {
      type: String,
      default: () => 'width: 100%',
    },
    cdata: {
      type: Object,
      default: () => ({})
    }
  },
  watch: {
    cdata: {
      handler (){
        console.log(this.cdata)
        this.categories = this.cdata.x
        this.arr = this.cdata.v

        this.chartOption = this.buildChartOption();
        this.loading = false
      },
      deep: true,
      immediate: false
    }
  },
  data() {
    return {
      loading: true,
      chartOption: {},
      arr : [120, 132, 101, 134, 90, 230, 210],
      currentIndex: -1
    };
  },
  async mounted() {

  },
  methods:{
    buildChartOption() {
      const option = {
        title: {
          left: 'center',
          text: this.title
        },
        tooltip: {
          trigger: 'axis',
          backgroundColor: '#FFF'
        },
        legend: {
          top: '7%',
          data: ['价格']
        },
        grid: {
          left: '3%',
          right: '4%',
          top: '15%',
          bottom: '3%',
          containLabel: true
        },
        textStyle: {
          fontSize: 12,
          color: '#FFFFFF',
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.categories,
          axisLabel: {
            interval:0,
            rotate: 30
          },
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '数量',
            type: 'line',
            stack: 'Total',
            data: this.arr,
          }
        ]
      }

      return option
    },
    switchMarkPotin(){
      let dataLen = this.arr.length;
      this.currentIndex = (this.currentIndex + 1) % dataLen;
      this.chartOption.series[0].markPoint.data =  [
          { name: '周最低', value: this.arr[this.currentIndex], xAxis: this.currentIndex, yAxis: this.arr[this.currentIndex] }
      ]
    }
  }
};
</script>
