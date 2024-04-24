<template>
    <div class="dataPage">
        <div class="header">
            <h1>CITY TRAFFIC MANAGEMENT SYSTEM BASED ON BIG DATA</h1>
            <div class="showTime">TIME：{{date}}</div>
        </div>
        <div class="mainbox">
            <div class="column">
                <div class="panel">
                    <h2>
                        CARS Top10
<!--                        <span @click="changeData('2019')">2019</span>-->
<!--                        <span @click="changeData('2020')">2020</span>-->
                    </h2>
                    <Bar1 class="chart" :yData="yData"></Bar1>
                    <div class="panel-footer"></div>
                </div>
                <div class="panel">
                    <h2>CARS OF ONE TIME</h2>
                    <Line1 class="chart"></Line1>
                    <div class="panel-footer"></div>
                </div>
                <div class="panel">
                    <h2>CARS SUM</h2>
                    <Pie1 class="chart"></Pie1>
                    <div class="panel-footer"></div>
                </div>
            </div>
            <div class="column">
                <div class="no">
                    <div class="no-hd">
                        <ul>
                            <li>{{panel1}}</li>
                            <li>{{panel2}}</li>
                        </ul>
                    </div>
                    <div class="no-bd">
                        <ul>
                            <li>Number of roads</li><!--道路数-->
                            <li>Road data</li><!--路况数据-->
                        </ul>
                    </div>
                </div>
                <div class="map">
                    <Map class="chart"></Map>
                    <div class="map1"></div>
                    <div class="map2"></div>
                    <div class="map3"></div>
                </div>
            </div>
            <div class="column">
                <div class="panel">
                    <h2>AVG SPEED【TOP 5】</h2>
                    <Bar2 class="chart"></Bar2>
                    <div class="panel-footer"></div>
                </div>
                <div class="panel">
                    <h2>ALL TIME</h2>
                    <Line2 class="chart"></Line2>
                    <div class="panel-footer"></div>
                </div>
                <div class="panel">
                    <h2>DISTRICT</h2>
                    <Pie2 class="chart"></Pie2>
                    <div class="panel-footer"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Bar1 from '../components/barChart/bar1'
import Bar2 from '../components/barChart/bar2'
import Line1 from '../components/lineChart/line1'
import Line2 from '../components/lineChart/line2'
import Pie1 from '../components/pieChart/pie1'
import Pie2 from '../components/pieChart/pie2'
import Map from '../components/mapChart/map'
import {dash0} from "@/api/chart";

export default {
    name: 'DataPage',
    data () {
        return {
            date: '',
            yData: [300, 400, 350, 800, 1800, 1400, 700],
          panel1: 100,
          panel2: 200
        }
    },
    components: {
        Bar1,
        Bar2,
        Line1,
        Line2,
        Pie1,
        Pie2,
        Map
    },
    mounted() {
        this.currentTime()
      dash0().then(res=>{
        this.panel1 = res.data.data.data1
        this.panel2 = res.data.data.data2
      })
    },
    methods: {
        currentTime() {
            setInterval(this.getDate, 1000);
        },
        getDate() {
            var dt = new Date();
            var year = dt.getFullYear();
            var month = dt.getMonth() + 1;
            var date = dt.getDate();
            var h = dt.getHours();
            var m = dt.getMinutes();
            var s = dt.getSeconds();
            this.date = `${year}年${month}月${date}日-${h}时${m}分${s}秒`
        },
        changeData(year) {
            if (year == '2019') {
                this.yData = [200, 300, 300, 900, 1500, 1200, 600]
            } else {
                this.yData = [300, 400, 350, 800, 1800, 1400, 700]
            }
        }
    },
    // 销毁定时器
    beforeDestroy: function() {
        if (this.getDate) {
            clearInterval(this.getDate); // 在Vue实例销毁前，清除时间定时器
        }
    }
}
</script>

<style lang="less" scoped>
.dataPage {
    min-width: 1024px;
    max-width: 1920px;
    .header {
        position: relative;
        height: 1.25rem;
        background: url(../assets/images/head_bg.png) no-repeat top center;
        background-size: 100% 100%;
        h1 {
            font-size: 0.475rem;
            color: #fff;
            text-align: center;
            line-height: 1rem;
        }
        .showTime {
            position: absolute;
            top: 0;
            right: 0.375rem;
            line-height: 0.9375rem;
            font-size: 0.25rem;
            color: rgba(255, 255, 255, 0.7);
        }
    }
    .mainbox {
        padding: 0.125rem 0.125rem 0;
        display: flex;
        .column {
            flex: 3;
            &:nth-child(2) {
                flex: 5;
                margin: 0 0.125rem 0.1875rem;
                overflow: hidden;
            }
        }
        .panel {
            position: relative;
            height: 3.875rem;
            border: 1px solid rgba(25, 186, 139, 0.17);
            background: url(../assets/images/line.png);
            padding: 0 .1875rem .5rem;
            margin-bottom: .1875rem;
            &::before {
                position: absolute;
                top: 0;
                left: 0;
                width: 10px;
                height: 10px;
                content: '';
                border-top: 2px solid #02a6b5;
                border-left: 2px solid #02a6b5;
            }
            &::after {
                position: absolute;
                top: 0;
                right: 0;
                width: 10px;
                height: 10px;
                content: '';
                border-top: 2px solid #02a6b5;
                border-right: 2px solid #02a6b5;
            }
            .panel-footer {
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                &::before {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 10px;
                    height: 10px;
                    content: '';
                    border-bottom: 2px solid #02a6b5;
                    border-left: 2px solid #02a6b5;
                }
                &::after {
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    width: 10px;
                    height: 10px;
                    content: '';
                    border-bottom: 2px solid #02a6b5;
                    border-right: 2px solid #02a6b5;
                }
            }
        }
        h2 {
            height: 0.6rem;
            line-height: 0.6rem;
            text-align: center;
            color: #fff;
            font-size: 0.25rem;
            font-weight: 400;
            span {
                margin: 0 0.1875rem;
                color: #fff;
                text-decoration: underline;
                cursor: pointer;
            }
        }
        .chart {
            height: 3rem;
        }
        .no {
            padding: .1875rem;
            background: rgba(101, 132, 226, 0.1);
            .no-hd {
                position: relative;
                border: 1px solid rgba(25, 186, 139, 0.17);
                ul {
                    display: flex;
                    li {
                        position: relative;
                        flex: 1;
                        text-align: center;
                        height: 1rem;
                        line-height: 1rem;
                        font-size: 0.875rem;
                        color: #ffeb7b;
                        padding: 0.05rem 0;
                        font-family: electronicFont;
                        font-weight: bold;
                        &:first-child::after {
                            content: "";
                            position: absolute;
                            height: 50%;
                            width: 1px;
                            background: rgba(255, 255, 255, 0.2);
                            right: 0;
                            top: 25%;
                        }
                    }
                }
                &::before {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 30px;
                    height: 10px;
                    content: '';
                    border-top: 2px solid #02a6b5;
                    border-left: 2px solid #02a6b5;
                }
                &::after {
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    width: 30px;
                    height: 10px;
                    content: '';
                    border-bottom: 2px solid #02a6b5;
                    border-right: 2px solid #02a6b5;
                }
            }
            .no-bd ul {
                display: flex;
                li {
                    flex: 1;
                    height: 0.5rem;
                    line-height: 0.5rem;
                    text-align: center;
                    font-size: 0.225rem;
                    color: rgba(255, 255, 255, 0.7);
                    padding-top: 0.125rem;
                }
            }
        }
        .map {
            position: relative;
            height: 10.125rem;
            .chart {
                position: absolute;
                top: 0;
                left: 0;
                z-index: 5;
                height: 10.125rem;
                width: 100%;
            }
            .map1, .map2, .map3 {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 6.475rem;
                height: 6.475rem;
                background: url(../assets/images/map.png) no-repeat;
                background-size: 100% 100%;
                opacity: 0.3;
            }
            .map2 {
                width: 8.0375rem;
                height: 8.0375rem;
                background-image: url(../assets/images/lbx.png);
                opacity: 0.6;
                z-index: 2;
                animation: rotate 15s linear infinite;
            }
            .map3 {
                width: 7.075rem;
                height: 7.075rem;
                background-image: url(../assets/images/jt.png);
                animation: rotate1 15s linear infinite;
            }
        }
        @keyframes rotate {
            from {
                transform: translate(-50%, -50%) rotate(0deg);
            }
            to {
                transform: translate(-50%, -50%) rotate(360deg);
            }
        }
        @keyframes rotate1 {
            from {
                transform: translate(-50%, -50%) rotate(0deg);
            }
            to {
                transform: translate(-50%, -50%) rotate(-360deg);
            }
        }
    }
}
</style>
