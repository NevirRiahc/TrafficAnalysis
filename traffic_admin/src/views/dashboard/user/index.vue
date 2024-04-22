<template>
  <div class="dashboard-editor-container">

    <el-row :gutter="32">
      <el-col  :xs="24" :sm="24" :lg="6">
        <div class="chart-wrapper">
          <h1>总人数</h1>
          <img src="@/assets/man.png"/>
          <h2>{{users}}人</h2>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="6">
        <div class="chart-wrapper">
          <h1>登录数</h1>
          <img src="@/assets/log.png"/>
          <h2>{{logs}}次</h2>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="6">
        <div class="chart-wrapper">
          <h1>电影</h1>
          <img src="@/assets/movie.png"/>
          <h2>{{three}} </h2>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="6">
        <div class="chart-wrapper">
          <h1>评分</h1>
          <img src="@/assets/star.png"/>
          <h2>{{four}} </h2>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="32">
      <el-col  :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <div>职业统计</div>
          <pie-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <div>性别分析</div>
          <bar-chart/>
        </div>
      </el-col>
    </el-row>
    <el-row style="background: #fff;padding: 24px 24px 0;margin-bottom: 32px;">
      <el-col span="24">
        <line-chart :chart-data="lineChartData"/>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import PanelGroup from "../admin/components/PanelGroup"
  import LineChart from "../admin/components/LineChart"
  import PieChart from "../admin/components/PieChart"
  import BarChart from "../admin/components/BarChart"

  import {loginChart, panelGroup} from "@/api/chart";

  const lineChartData = {
    apps:{
      expectedData:[12,35,69,161,217,359,236],
      // actualData:[1,3,6,8,14,17,22],
      xData:['21-4-1', '21-4-30', '21-6-30', '21-8-31', '21-10-31', '21-11-17', 'today']
    }
  }

  export default {
    name: "index",
    components:{
      PanelGroup,
      LineChart,BarChart,PieChart
    },
    data(){
      return{
        lineChartData: lineChartData.apps,
        height: 0,
        users: 0,
        logs: 0,
        three: 0,   //PanelGroup 第三个数字
        four: 0     //第四个数字
      }
    },
    mounted(){
      // panelGroup 面板统计功能
      panelGroup().then(res=>{
        this.users = res.data.users
        this.logs = res.data.logs
        this.three = res.data.three
        this.four = res.data.four
      }).catch(error=>{
        console.log(error)
      })

      // 没有，注释掉
      loginChart().then(res=>{
        console.log('loginChartData',res);
        this.lineChartData = res.data
      }).catch(error=>{
        console.log(error)
      })
    },
    methods:{
      handleSetLineChartData(type){
        this.lineChartData = lineChartData[type]
      }
    }
  }
</script>

<style lang="scss" scoped>
  .dashboard-editor-container{
    padding: 32px;
    background-color: rgb(240, 242, 245);
    position: relative;

    .chart-wrapper {
      background: #fff;
      padding: 16px 16px 0;
      margin-bottom: 32px;
      text-align: center;
    }
  }
</style>
