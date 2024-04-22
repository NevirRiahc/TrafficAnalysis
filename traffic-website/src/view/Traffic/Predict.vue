<template>
  <div>
    <div id="JobChance">
      <div class="banner container-fuild text-center">TRAFFIC FLOW PREDICT</div>
      <div class="container">
        <div class="JobChance-container wow pulse">
          <h2>TRAFFIC FLOW PREDICT</h2>
          <div class="">
            <div class="form-inline">
<!--              <select class="form-control" id="inlineFormCustomSelectPref" v-model="nature">-->
<!--                <option selected value="">全部</option>-->
<!--                <option value="公办">公办</option>-->
<!--              </select>-->

              <input v-model="keyword" style="width: 400px;" class="form-control"
                     @keyup="getKey($event)" @keydown.down="changeDown()" @keydown.up="changeUp()">

              <button type="button" class="btn btn-info" @click="search">PREDICT</button>
            </div>

            <div style="z-index: 999; position: absolute;">
              <ul class="list-unstyled ulstyle" v-show="myData.length!=0" style="width: 400px">
                <li v-for="(item, index) in myData" :class="{gray:index==nowIndex,listyle:true}"
                    @mouseover="mouseOver(index)"
                    @click="search()">{{ item }}
                </li>
              </ul>
            </div>

          </div>
          <div>
            <line-chart1 :cdata="lines"/>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
  import {WOW} from 'wowjs'
  import BMap from "BMap";
  import {mapGetters} from 'vuex'
  import {predict, list2} from "@/api/info";
  import mixin from '@/mixins/mixins'
  import pagination from '@/components/pagination'
  import LineChart1 from "@/components/LineChart1";

  export default {
    name: "MedicineCentre",
    mixins: [mixin],
    components:{pagination, LineChart1},
    data() {
      return {
        parentTotalPage: 100, //分页
        parentCurrentPage: 1, //分页
        keyword: '',
        type: '',
        tableDatas: [
          {

          }
        ],
        nowIndex: 0,
        myData: [],
        lines: [],
      };
    },
    computed: {
      ...mapGetters(['isLogin', 'username']),
    },
    methods: {
      search() {
        console.log(this.keyword)
        predict(this.keyword).then(res => {
          // console.log(res)
          this.lines= res.data.data
          this.myData = []
        })
      },

      getKey(event) {
        // console.log(event)
        // console.log('搜索的关键词:', txt)
        if (event.keyCode == 38 || event.keyCode == 40) {
          return;
        }

        if (event.KeyCode == 13) {
          console.log('回车...')
          // 搜索
          this.search()
        }
        list2(1,15, this.keyword).then(res => {
          // console.log(res.data.data.records)
          this.myData = res.data.data.records.map(i => {
            return i.lm
          })
        })
        // 去后端搜索
        // this.myData = ['123','456','789']
      },
      changeDown() {
        this.nowIndex++
        if (this.nowIndex == this.myData.length) {
          this.nowIndex = 0;
          this.keyword = this.myData[0];
        } else {
          this.keyword = this.myData[this.nowIndex];
        }
      },
      changeUp() {
        this.nowIndex--
        if (this.nowIndex == -1) {
          this.nowIndex = this.myData.length - 1;
          this.keyword = this.myData[this.nowIndex];
        } else {
          this.keyword = this.myData[this.nowIndex];
        }
      },
      mouseOver(n) {
        // console.log('mouseOver:', n)
        this.nowIndex = n
        this.keyword = this.myData[this.nowIndex]
      }
    },
    mounted() {
      //先判断登录，然后去后台获取表格展示的信息
      this.$nextTick(() => {
        console.log('uid:' + this.uid)
        console.log('phone:' + this.phone)
        this.lines = [{name:'1',value:'100'}]
        if (this.isLogin != 1) {
          alert('请先登录')
        } else {

        }
      })
    }
  };
</script>
<style scoped>
  .banner {
    color: #fff;
    font-size: 30px;
    height: 150px;
    line-height: 150px;
    background-image: url("../../assets/img/banner_2.png");
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: scroll;
    background-position: center center;
  }

  .JobChance-container {
    margin: 100px;
    padding: 30px;
    transition: all ease 0.5s;
    border: 1px dashed salmon;
  }

  .JobChance-container h2 {
    color: rgb(255, 102, 19);
    font-weight: bolder;
    text-align: center;
  }

  .JobChance-container p {
    font-size: 20px;
    color: rgb(255, 102, 19);
    font-weight: 700;
  }

  .JobChance-container ol {
    list-style-type: decimal;
    padding-left: 30px;
  }

  .JobChance-container ol > li {
    font-size: 14px;
    line-height: 2.7rem;
  }

  @media screen and (max-width: 997px) {
    .JobChance-container {
      margin: 20px 0;
      padding: 20px;
      border: 1px dashed salmon;
    }
  }

  .icon {
    width: 75px;
    height: 75px;
  }

  .gray {
    background-color: #eee;
  }

  .listyle {
    font-size: 16px;
    line-height: 35px;
    padding-left: 16px;
  }

  .ulstyle {
    border: 1px solid #ccc;
    border-top: none;
    background-color: #d0e9c6;
  }
</style>

