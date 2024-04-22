<template>
  <div>
    <div id="JobChance">
      <div class="banner container-fuild text-center">ROAD INFO</div>
      <div class="container">
        <div class="JobChance-container wow pulse">
          <h2>ROAD INFO</h2>
          <div class="">
            <div class="form-inline">
<!--              <select class="form-control" id="inlineFormCustomSelectPref" v-model="nature">-->
<!--                <option selected value="">全部</option>-->
<!--                <option value="公办">公办</option>-->
<!--              </select>-->

              <input v-model="keyword" style="width: 400px;" class="form-control"
                     @keyup="getKey($event)" @keydown.down="changeDown()" @keydown.up="changeUp()">

              <button type="button" class="btn btn-info" @click="search">SEARCH</button>
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
          <table class="table table-striped">
            <thead>
            <tr>
              <th>ID</th>
              <th>路名</th>
              <th>区属</th>
              <th>类型</th>
              <th>等级</th>
              <th>长度</th>
              <th>路段面积</th>
              <th>人行道面积</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,index) in tableDatas">
              <td>{{item.id}}</td>
              <td>{{item.lm}}</td>
              <td><span class="badge badge-info">{{item.qs}}</span></td>
              <td>{{item.lx}}</td>
              <td>{{item.dj}}</td>
              <td>{{item.cd}}</td>
              <td>{{item.rdmj}}</td>
              <td>{{item.rxdmj}}</td>
            </tr>
            </tbody>
          </table>
          <pagination :totalPage="parentTotalPage" :currentPage="parentCurrentPage"
                      :changeCallback="parentCallback"></pagination>

        </div>
      </div>
    </div>

  </div>
</template>
<script>
  import {WOW} from 'wowjs'
  import BMap from "BMap";
  import {mapGetters} from 'vuex'
  import {list} from "@/api/info";
  import mixin from '@/mixins/mixins'
  import pagination from '@/components/pagination'

  export default {
    name: "MedicineCentre",
    mixins: [mixin],
    components:{pagination},
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
      };
    },
    computed: {
      ...mapGetters(['isLogin', 'username']),
    },
    methods: {
      loadData(page) {
        list(page,15,this.keyword).then(res => {
          console.log(res)
          this.tableDatas = res.data.data.records
          this.parentTotalPage = res.data.data.pages
          this.parentCurrentPage = 1
        })
      },
      search() {
        list(1,15, this.keyword).then(res => {
          // console.log(res)
          this.tableDatas = res.data.data.records
          this.parentTotalPage = res.data.data.pages
          this.parentCurrentPage = 1
          this.myData = []
        })
      },
      show(id){
        this.$router.push("/detail/"+id)
      },
      parentCallback( cPage ) {
        // this.msg = '数据。 当前页码 :'  + cPage;
        // this.loadData(cPage)
        this.loadData(cPage)
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
        list(1,15, this.keyword).then(res => {
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

        if (this.isLogin != 1) {
          alert('请先登录')
        } else {
          this.loadData(1)
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

