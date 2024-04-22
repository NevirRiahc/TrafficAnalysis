<template>
  <div id="JobChance">
    <div class="banner container-fuild text-center">游戏详情</div>
    <div class="container">
      <div class="JobChance-container wow pulse">
        <h2>{{ this.postForm.name }}</h2>
        <p>基础信息</p>

        <div class="row">
          <div class="col-lg-4">
            <img :src="getImageUrl(this.postForm.icon)" width="100%;"/>
          </div>

          <div class="col-lg-4">
            <ol>
              <ul>ID:     {{ this.postForm.id }}</ul>
              <ul>名称:     {{ this.postForm.name }}</ul>
              <ul>游戏ID:     {{ this.postForm.gameid }}</ul>
              <ul>分类:     {{ this.postForm.type}}</ul>
              <ul>小类:     {{ this.postForm.gametypename}}</ul>
              <ul>下载量:     {{ this.postForm.downloads}}</ul>
              <ul>星级:     {{ this.postForm.starlevel}}</ul>
            </ol>
          </div>
        </div>


<!--        <p>相关信息</p>-->
<!--        <ol>-->
<!--          <ul>类别:     {{ this.postForm.type}}</ul>-->
<!--          <ul>办学性质:     {{ this.postForm.nature}}</ul>-->
<!--          <ul>邮箱地址:     {{ this.postForm.email}}</ul>-->
<!--          <ul>联系电话:     {{ this.postForm.phone}}</ul>-->
<!--          <ul>网址:     <a :href="this.postForm.site">直达</a></ul>-->
<!--        </ol>-->
        <p>论坛信息</p>
        <button type="button" class="btn btn-primary"
                data-toggle="modal" data-target="#AddModal">评论</button>
        <table class="table table-bordered table-striped" style="margin-top: 10px;">
          <thead>
          <tr>
            <th>序号</th>
            <th>评论人</th>
            <th>内容</th>
            <th>时间</th>
            <th>情感分析</th>
            <th>概率</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in comments">
            <td>{{item.id}}</td>
            <td>{{item.username}}</td>
            <td>{{item.content}}</td>
            <td>{{item.create_time}}</td>
            <td>
              <button v-if="item.label=='positive'" class="btn btn-success">
                正面
              </button>
              <button v-if="item.label=='negative'" class="btn btn-warning">负面</button></td>
            <td>{{item.score}}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

<!-- 评论对话框-->
    <div class="modal fade" id="AddModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title" id="myModalLabel"> </h4>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label>发表人</label>
                <input v-model="addForm.username" type="text" class="form-control" disabled>
              </div>
              <div class="form-group">
                <label>游戏</label>
                <input v-model="addForm.oname" type="text" class="form-control" disabled>
              </div>
              <div class="form-group">
                <label>评论标题</label>
                <textarea v-model="addForm.title" type="text" class="form-control"  rows="1" placeholder="评论标题"></textarea>
              </div>
              <div class="form-group">
                <label>评论内容</label>
                <textarea v-model="addForm.content" type="text" class="form-control"  rows="3" placeholder="内容"></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
            <button  @click="add" type="button" class="btn btn-primary" data-dismiss="modal">提交</button>
          </div>
        </div><!-- /.modal-content -->
      </div><!-- /.modal -->
    </div>

  </div>
</template>
<script>
import { WOW } from 'wowjs';
import {get} from "@/api/game";
import {mapGetters} from "vuex";
import {add, list} from "../api/comment";
import mixin from '@/mixins/mixins'
import Swal from "sweetalert2";

export default {
  name: "JobChance",
  mixins: [mixin],
  data() {
    return {
      postForm:{},
      scores:[],
      comments: [{'label':'positive'}],
      addForm: {
        uid: this.$store.state.id,
        username: this.$store.state.username,
        oid : this.$route.params && this.$route.params.id,
      }
    };
  },
  mounted(){
    var wow = new WOW();
    wow.init();
    const id = this.$route.params && this.$route.params.id
    this.fetchData(id)
  },
  methods:{
    fetchData(id) {
      get(id).then(response => {
        this.postForm = response.data.data
        this.addForm.oname = this.postForm.name
        this.addForm.oid = this.postForm.id

        list(1,15,'', this.addForm.uid).then(res=>{
          // console.log(res.data.data.records)
          this.comments = res.data.data.records

        })
        // console.log(response.data)
        // search({'keyword': this.postForm.schoolId} ,1000).then(res1=>{
        //   this.scores = res1.data.data.records
        //   // console.log(this.scores);
        // })
      })
    },
    add(){
      add(this.addForm).then(res=>{
        Swal.fire({'title': '评论成功', 'icon': 'success'})
        const id = this.$route.params && this.$route.params.id
        this.fetchData(id)
      })
    }
  }
};
</script>
<style scoped>
.banner {
  color: #fff;
  font-size: 30px;
  height: 150px;
  line-height: 150px;
  background-image: url("../assets/img/banner_4.png");
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
.JobChance-container h2{
  color: rgb(255, 102, 19);
  font-weight: bolder;
  text-align: center;
}
.JobChance-container p{
font-size: 20px;
  color: rgb(255, 102, 19);
  font-weight: 700;
}
.JobChance-container ol{
    list-style-type: decimal;
    padding-left: 30px;
}
.JobChance-container ol>li{
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

