<template>
  <div>
    <div id="JobChance">
      <div class="banner container-fuild text-center">ROAD STATUS</div>
      <div class="container">
        <div class="JobChance-container wow pulse">
          <h2>ROAD STATUS</h2>
          <div class="">
            <div class="form-inline">
<!--              <select class="form-control" id="inlineFormCustomSelectPref" v-model="nature">-->
<!--                <option selected value="">全部</option>-->
<!--                <option value="公办">公办</option>-->
<!--              </select>-->

              <input v-model="keyword" style="width: 400px;" class="form-control"
                     @keyup="getKey($event)" @keydown.down="changeDown()" @keydown.up="changeUp()">

              <button type="button" class="btn btn-info" @click="search">SEARCH</button>
              <button type="button" class="btn btn-primary" v-show="this.role!='normal'"
                      data-toggle="modal" data-target="#AddModal"> ADD</button>
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
              <th>行驶长度</th>
              <th>行驶速度</th>
              <th>时间片（5分钟一次）</th>
              <th>街道ID</th>
              <th>总时间</th>
              <th>状态</th>
<!--              <th>流量</th>-->
              <th>采集时间</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,index) in tableDatas">
              <td>{{item.id}}</td>
              <td>{{item.lm}}</td>
              <td>{{item.golen}}</td>
              <td>{{item.speed}}</td>
              <td>{{item.period}}</td>
              <td>{{item.blockid}}</td>
              <td>{{item.gotime}}</td>
              <td><span class="badge badge-info">{{stautsFormat(item.exponent)}}</span></td>
<!--              <td>{{item.exponent}}</td>-->
              <td>{{item.time1}}</td>
            </tr>
            </tbody>
          </table>
          <pagination :totalPage="parentTotalPage" :currentPage="parentCurrentPage"
                      :changeCallback="parentCallback"></pagination>

        </div>
      </div>
    </div>
<!--    模态框-->
        <div class="modal fade" id="AddModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="myModalLabel">新增</h4>
              </div>
              <div class="modal-body">
                <form>
                  <div class="form-group">
                    <label>道路编号</label>
                    <input v-model="newsForm.blockid" type="number" class="form-control">
                  </div>
                  <div class="form-group">
                    <label>时间</label>
                    <vue-datepicker-local style="display: block" v-model="newsForm.time1" />
                  </div>
                  <div class="form-group">
                    <label>路况指数(交通指数0-2为畅通，2-4为基本畅通，4-6为缓行，6-8为较拥堵，8-10为拥堵)</label>
                    <input v-model="newsForm.exponent" type="number" class="form-control"
                           format="YYYY-MM-DD HH:mm:ss" placeholder="路况指数">
                  </div>
                  <div class="form-group">
                    <label>流量</label>
                    <input v-model="newsForm.flow" type="number" class="form-control"  placeholder="流量">
                  </div>
                  <div class="form-group">
                    <label>车速</label>
                    <input v-model="newsForm.speed" type="number" class="form-control"  rows="3" placeholder="车速"></input>
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button  @click="add()" type="button" class="btn btn-primary" data-dismiss="modal">提交</button>
              </div>
            </div><!-- /.modal-content -->
          </div><!-- /.modal -->
        </div>


  </div>
</template>
<script>
  import {WOW} from 'wowjs'
  import BMap from "BMap";
  import {mapGetters} from 'vuex'
  import {list} from "@/api/info";
  import {list as listRoad, add} from "@/api/road";
  import mixin from '@/mixins/mixins'
  import pagination from '@/components/pagination'
  import VueDatepickerLocal from 'vue-datepicker-local'

  export default {
    name: "MedicineCentre",
    mixins: [mixin],
    components:{pagination, VueDatepickerLocal},
    data() {
      return {
        parentTotalPage: 100, //分页
        parentCurrentPage: 1, //分页
        keyword: '',
        type: '',
        newsForm : {
          time1: new Date()
        },
        tableDatas: [
          {

          }
        ],
        nowIndex: 0,
        myData: [],
      };
    },
    computed: {
      ...mapGetters(['isLogin', 'id', 'username', 'realname', 'msg', 'getNum', 'phone','role'])
    },
    methods: {
      add(){
        this.newsForm.time1 = this.newsForm.time1.toISOString().replace(/T/g, ' ')
          .replace(/\.[\d]{3}Z/, '')
        add(this.newsForm).then(()=>{
          this.loadData(1)
        })
      },
      stautsFormat(ex){
        if(ex<=2)
          return '畅通'
        else if(ex<=4)
          return '基本畅通'
        else if (ex<=6)
          return '缓行'
        else  if(ex<=8)
          return '较为拥堵'
        else
          return '拥堵'
      },
      loadData(page) {
        listRoad(page,15,this.keyword).then(res => {
          this.tableDatas = res.data.data.records
          this.parentTotalPage = res.data.data.pages
          this.parentCurrentPage = 1
        })
      },
      search() {
        listRoad(1,15, this.keyword).then(res => {
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

