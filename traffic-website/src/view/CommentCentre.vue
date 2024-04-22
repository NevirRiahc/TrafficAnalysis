<template>
  <div>
    <div id="JobChance">
      <div class="banner container-fuild text-center">评论管理</div>
      <div class="container">
        <div class="JobChance-container wow pulse">
          <h2>评论管理</h2>
          <table class="table table-striped">
            <thead>
            <tr>
              <th>ID</th>
              <th>标题</th>
              <th>内容</th>
              <th>操作</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,index) in tableDatas">
              <td>{{item.id}}</td>
              <td>{{item.title}}</td>
              <td>{{item.content}}</td>
              <td>
                <button type="button" class="btn btn-danger" @click="remove(item.id)">删除</button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!-- 模态对话框 -->
<!--    <div class="modal fade" id="AddModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">-->
<!--      <div class="modal-dialog">-->
<!--        <div class="modal-content">-->
<!--          <div class="modal-header">-->
<!--            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>-->
<!--            <h4 class="modal-title" id="myModalLabel">新增</h4>-->
<!--          </div>-->
<!--          <div class="modal-body">-->
<!--            <form>-->
<!--              <div class="form-group">-->
<!--                <label>用户名</label>-->
<!--                <input v-model="newsForm.author" type="text" class="form-control" disabled>-->
<!--              </div>-->
<!--              <div class="form-group">-->
<!--                <label>标题</label>-->
<!--                <input v-model="newsForm.title" type="text" class="form-control"  placeholder="标题">-->
<!--              </div>-->
<!--              <div class="form-group">-->
<!--                <label>内容</label>-->
<!--                <textarea v-model="newsForm.content" type="text" class="form-control"  rows="3" placeholder="内容"></textarea>-->
<!--              </div>-->
<!--              <div class="form-group">-->
<!--                <label>类型</label>-->
<!--                <select class="form-control">-->
<!--                  <option value="1">中医常识</option>-->
<!--                  <option value="2">游戏常识</option>-->
<!--                  <option value="3">游戏方剂</option>-->
<!--                  <option value="4">游戏文化</option>-->
<!--                </select>-->
<!--              </div>-->
<!--            </form>-->
<!--          </div>-->
<!--          <div class="modal-footer">-->
<!--            <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>-->
<!--            <button  @click="add()" type="button" class="btn btn-primary" data-dismiss="modal">提交</button>-->
<!--          </div>-->
<!--        </div>&lt;!&ndash; /.modal-content &ndash;&gt;-->
<!--      </div>&lt;!&ndash; /.modal &ndash;&gt;-->
<!--    </div>-->

  </div>
</template>
<script>
  import {WOW} from 'wowjs'
  import BMap from "BMap";
  import {mapGetters} from 'vuex'
  import {remove, list, add} from "../api/comment";
  import Swal from "sweetalert2";

  export default {
    name: "CommentCentre",
    data() {
      return {
        tableDatas: [
          {
            id: '序号',
            title: '新闻标题',
            content: '新闻内容',
            // status: '1'
          }
        ],
        // form:{
        //   title: '',
        //   content: '',
        //   author: this.$store.state.username,
        //   type: 1
        // }
      };
    },
    computed: {
      ...mapGetters(['isLogin', 'username', 'uid']),

      statusFormat() {
        return function (status) {
          return status ? "审核通过" : "待审核"
        }
      }
    },
    methods: {
      remove(id) {
        remove(id).then(res => {
          // console.log(res)
          Swal.fire({'title': res.data.message, 'icon': 'success'})
          this.loadData()
        })
      },
      add() {
        add(this.newsForm).then(res => {
          alert(res.data.message)
          this.loadData()
        })
      },
      loadData(){
        list(1,15, '', this.uid).then(res => {
          // console.log(res)
          this.tableDatas = res.data.data.records
        })
      }
    },
    mounted() {
      //先判断登录，然后去后台获取表格展示的信息
      this.$nextTick(() => {
        if (this.isLogin != 1) {
          alert('请先登录')
        } else {
          this.loadData()
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
    background-image: url("../assets/img/banner_2.png");
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
</style>

