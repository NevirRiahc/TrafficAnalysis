<template>
  <!-- 头部整体盒子 -->
  <div id="header" class="container-fuild">
    <!-- 头部顶部 -->
    <div class="header-top container-fuild hidden-xs">
      <div class="container">
        <div class="server pull-left">
          <span class="glyphicon glyphicon-earphone"></span>400-888-888
          <span class="glyphicon glyphicon-envelope"></span> EXPERT
          <span class="glyphicon glyphicon-time"></span>7x24 SERVICE
          <!--          <span class="glyphicon glyphicon-heart" style="color: red"></span>-->
          <!--          <span class="glyphicon glyphicon-bookmark" @click="handleClick" style="color: red"></span>-->
        </div>
        <div class="shejiao pull-right">
          <div>
            <span v-if="isLogin == 1">welcome {{ username }}
<!--               <span data-toggle="modal" @click="showMsg" data-target="#MessageModal"-->
<!--                     class="label label-warning">{{ msg }}条消息</span>-->
              <button @click="logout" type="button" class="btn btn-success">LOGOUT </button>
              <button data-toggle="modal" data-target="#PassModal" type="button" class="btn btn-info">USER CENTER</button>
            </span>

            <button v-if="isLogin != 1" type="button" class="btn btn-primary"
                    data-toggle="modal" data-target="#LoginModal">LOGIN
            </button>
            <button v-if="isLogin != 1" type="button" class="btn btn-default"
                    data-toggle="modal" data-target="#RegisterModal">REGISTER
            </button>
          </div>
          <!--          <span class="glyphicon glyphicon-hand-right"></span>赶快联系我们吧！-->
          <!--          <span class="glyphicon glyphicon-hand-left"></span>-->
        </div>
      </div>
    </div>
    <!-- 电脑导航 -->
    <div class="header-nav container hidden-xs">
      <!-- 导航logo -->
      <div class="header-nav-logo">
        <!--        <img src="@/assets/img/logo_black.png">-->
      </div>
      <!-- 导航内容 -->
      <ul class="header-nav-wrapper">
        <li
            v-for="(item,index) in navList"
            :key="index"
            :class="index==navIndex?'active':''"
            @click="navClick(index,item.name)"
        >
          <router-link :to="item.path">
            {{ item.name }}
            <span v-if="item.children.length>0" class="glyphicon glyphicon-menu-down"></span>
            <i class="underline"></i>
          </router-link>
          <dl v-if="item.children.length>0">
            <dt v-for="(i,n) in item.children" :key="n">
              <router-link :to="i.path">{{ i.name }}</router-link>
            </dt>
          </dl>
        </li>
      </ul>
    </div>
    <!-- 手机导航 -->
    <div class="header-nav-m container-fuild visible-xs">
      <div class="header-nav-m-logo">
        <img class="center-block" src="@/assets/img/logo_black.png" alt="logo">
      </div>
      <!-- 导航栏 -->
      <div class="header-nav-m-menu text-center">
        {{ menuName }}
        <div
            class="header-nav-m-menu-wrapper"
            data-toggle="collapse"
            data-target="#menu"
            @click="menuClick"
        >
          <span :class="menuClass"></span>
        </div>
        <!-- 导航内容 -->
        <ul id="menu" class="header-nav-m-wrapper collapse">
          <li
              v-for="(item,index) in navList"
              :key="index"
              :class="index==navIndex?'active':''"
              @click="navClick(index,item.name)"
              data-toggle="collapse"
              data-target="#menu"
          >
            <router-link :to="item.path" >
              {{ item.name }}
              <i class="underline"></i>
            </router-link>
          </li>
        </ul>
      </div>
    </div>

    <div class="modal fade" id="LoginModal" ref="LoginModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
         aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title" id="myModalLabel">登录</h4>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="exampleInputEmail1">用户名</label>
                <input v-model="loginForm.username" type="text" class="form-control" id="exampleInputEmail1"
                       placeholder="用户名">
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">密码</label>
                <input v-model="loginForm.password" type="password" class="form-control" id="exampleInputPassword1"
                       placeholder="密码">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
            <button @click="login()" type="button" class="btn btn-primary" data-dismiss="modal">提交</button>
          </div>
        </div><!-- /.modal-content -->
      </div><!-- /.modal -->
    </div>

    <div class="modal fade" id="RegisterModal" ref="LoginModal" tabindex="-1" role="dialog"
         aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title">注册</h4>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="exampleInputEmail1">用户名</label>
                <input v-model="registerForm.username" type="text" class="form-control" placeholder="用户名">
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">真实姓名</label>
                <input v-model="registerForm.realname" type="text" class="form-control" placeholder="用户名">
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">密码</label>
                <input v-model="registerForm.password" type="password" class="form-control" placeholder="密码">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
            <button @click="register()" type="button" class="btn btn-primary" data-dismiss="modal">提交</button>
          </div>
        </div><!-- /.modal-content -->
      </div><!-- /.modal -->
    </div>

    <div class="modal fade" id="MessageModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
         aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title">消息</h4>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="exampleInputEmail1">作者</label>
                <input v-model="msgForm.id" type="hidden" class="form-control">
                <input v-model="msgForm.sid" type="text" class="form-control">
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">内容</label>
                <textarea v-model="msgForm.content" class="form-control" rows="3"></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
            <button @click="next()" type="button" class="btn btn-primary">下一条</button>
          </div>
        </div><!-- /.modal-content -->
      </div><!-- /.modal -->
    </div>

    <div class="modal fade" id="PassModal" ref="PassModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
         aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title">修改密码</h4>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="exampleInputPassword1">ID</label>
                <input v-model="passForm.id" type="text" disabled class="form-control" placeholder="ID">
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">手机号</label>

                <div class="input-group">
                  <input v-model="passForm.phone" type="text" class="form-control" placeholder="手机号">
                  <div class="input-group-btn d-inline">
                    <button @click="sendSms" type="button" :disabled="isDisabled" class="btn btn-success col-3"
                            style="display: inline"> {{ buttonName }}
                    </button>
                  </div>
                </div>

              </div>
              <div class="form-group ">
                <label for="exampleInputPassword1">验证码</label>
                <input v-model="passForm.code" type="text" class="form-control" placeholder="验证码">
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">新密码</label>
                <input v-model="passForm.note" type="password" class="form-control" placeholder="新密码">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
            <button @click="modify()" type="button" class="btn btn-primary" data-dismiss="modal">提交</button>
          </div>
        </div><!-- /.modal-content -->
      </div><!-- /.modal -->
    </div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
import { mapActions } from "vuex";

// import {getMsg, read} from "../api/msg";
import {modifyPassBySms, sendMsg} from "../api/sms";
import Swal from 'sweetalert2'

export default {
  name: "Header",
  data() {
    return {
      passForm:{
        id: this.$store.state.id,
        oldPass:"",
        newPass:"",
        rePass:""
      },
      isDisabled: false,
      buttonName: "短信验证码",
      time: 60,
      loginShow: true,
      loginForm: {
        username: "",
        password: ""
      },
      registerForm: {
        username: "",
        password: "",
        realname: ""
      },
      msgForm: {
        id: 0,
        sid: "",
        content: ""
      },
      navIndex: sessionStorage.getItem('navIndex') ? sessionStorage.getItem('navIndex') : 0,
      menuName: "HOME",
      menuClass: "glyphicon glyphicon-menu-down",
      navList: [
        {
          name: "HOME",
          path: "/",
          children: [],
        },
        {
          name: "ROAD INFO",
          path: "/infos",
          children: [],
        },
        {
          name: "TRAFFIC FLOW",
          path: "/roads",
          children: [],
        },
        {
          name: "PREDICT",
          path: "/predict",
          children: [],
        },
        {
          name: "STATUS",
          path: "/status",
          children: [],
        },
      ]
    };
  },
  computed: {
    ...mapGetters(['isLogin', 'id', 'username', 'realname', 'msg', 'getNum', 'phone','role'])
  },
  watch:{
    id: function (val){
      console.log('watch user:', val)
    }
  },
  methods: {
    login() {
      this.$store.dispatch('login', this.loginForm).then((res) => {
        alert(res)
      }).catch(error => alert(error))
    },
    logout() {
      this.$store.dispatch('logout').then(() => {
      })
    },
    register() {
      this.$store.dispatch('register', this.registerForm).then((res) => {
        alert(res)
      })
    },

    // showMsg() {
    //   getMsg(this.username).then(res => {
    //     this.msgForm.id = res.data.data.records[0].id    /*隐藏域*/
    //     this.msgForm.sid = res.data.data.records[0].sid
    //     this.msgForm.content = res.data.data.records[0].content
    //     // console.log(res.data.data.records.id)
    //   })
    // },
    // next() {
    //   read(this.msgForm.id)
    //   getMsg(this.username).then(res => {
    //     this.$store.dispatch('msgCount', res.data.data.total).then()
    //     if (res.data.data.total <= 0) {
    //       alert('已经没有消息了')
    //       return
    //     }
    //     this.msgForm.id = res.data.data.records[0].id    /*隐藏域*/
    //     this.msgForm.sid = res.data.data.records[0].sid
    //     this.msgForm.content = res.data.data.records[0].content
    //   })
    // },
    sendSms(){
      sendMsg(this.passForm).then(res=>{
        alert(res.data.message);

        let me = this;
        me.isDisabled = true;
        let interval = window.setInterval(function () {
          me.buttonName = me.time + '后重新发送';
          --me.time;
          if (me.time < 0) {
            me.buttonName = "重新发送";
            me.time = 10;
            me.isDisabled = false;
            window.clearInterval(interval);
          }
        }, 1000);
      })
    },
    modify(){
      modifyPassBySms(this.id,this.passForm).then(res=>{
        alert(res.data.message);
      })
    },

    navClick(index, name) {
      this.navIndex = index;
      sessionStorage.setItem('navIndex', index)
      this.menuName = name;
    },
    menuClick() {
      if (this.menuClass == "glyphicon glyphicon-menu-down") {
        this.menuClass = "glyphicon glyphicon-menu-up";
      } else {
        this.menuClass = "glyphicon glyphicon-menu-down";
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      console.log('uid=', this.id, ',role=', this.role)
      this.passForm.phone = this.phone
      if(this.role == 'normal'){
        this.navList = [ {
          name: "HOME",
          path: "/",
          children: [],
        },
          {
            name: "ROAD INFO",
            path: "/infos",
            children: [],
          },
          {
            name: "TRAFFIC FLOW",
            path: "/roads",
            children: [],

          },
          {
            name: "STATUS",
            path: "/status",
            children: [],
          },]
      }
    })
  }
};
</script>
<style scoped>
/* 顶部 */
#header {
  background: #f4f4f4;
  transition: all ease 0.6s;
}

#header .header-top {
  height: 50px;
  color: #fff;
  font-size: 12px;
  line-height: 50px;
  background: #474747;
}

/* 顶部的图标 */
#header .header-top span {
  margin: 0 8px;
}

/* 导航栏 */
#header .header-nav {
  height: 110px;
}

/* 导航栏logo */
#header .header-nav .header-nav-logo {
  width: 100px;
  height: 100%;
  float: left;
  position: relative;
}

/* 导航栏logo图片 */
#header .header-nav .header-nav-logo img {
  width: 95px;
  height: 45px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}

/* 导航栏 导航容器 */
#header .header-nav-fixed .header-nav-wrapper {
  line-height: 50px;
}

#header .header-nav .header-nav-wrapper {
  line-height: 110px;
  float: right;
  margin: 0;
  max-width: 800px;
}

/* 导航栏 每个导航 */
#header .header-nav .header-nav-wrapper > li {
  float: left;
  margin: 0 15px;
  position: relative;
}

/* 导航栏 每个导航下面的 a 链接 */
#header .header-nav .header-nav-wrapper > li > a {
  color: #000;
  font-size: 15px;
  font-weight: bold;
  padding: 15px 0;
  position: relative;
}

/* 导航栏 每个导航下面的 a 链接的下划线 */
#header .header-nav .header-nav-wrapper > li > a > i {
  display: block;
  position: absolute;
  bottom: -2px;
  left: 50%;
  width: 0;
  height: 2px;
  opacity: 0;
  transition: all 0.6s ease;
  background-color: #1e73be;
}

/* 导航栏 每个导航下面的 a 链接的右侧小三角 */
#header .header-nav .header-nav-wrapper > li > a > span {
  font-size: 12px;
  transition: transform ease 0.5s;
}

/* 导航栏 每个导航下面的 a 链接 鼠标滑上去的样式 */
#header .header-nav .header-nav-wrapper > li > a:hover {
  color: #1e73be;
  text-decoration: none;
}

/* 导航栏 每个导航下面的 a 链接 鼠标滑上去下划线的样式 */
#header .header-nav .header-nav-wrapper > li > a:hover .underline {
  opacity: 1;
  width: 100%;
  left: 0;
}

/* 导航栏 每个导航下面的 a 链接 鼠标滑上去三角标的样式 */
#header .header-nav .header-nav-wrapper > li > a:hover span {
  transform: rotate(180deg);
}

/* 导航栏 每个导航下面的 a 链接 鼠标点击后的样式 */
#header .header-nav .header-nav-wrapper > li.active > a {
  color: #1e73be;
  text-decoration: none;
  border-bottom: 2px solid #1e73be;
}

/* 导航栏 每个导航下面的二级导航容器 */
#header .header-nav .header-nav-wrapper > li > dl {
  display: none;
  position: absolute;
  width: 168px;
  top: 80%;
  left: 0;
  z-index: 999999;
  box-shadow: 0 0 3px 1px #ccc;
  background: #fff;
}

/* 导航栏 每个导航下面的二级导航容器的每个导航 */
#header .header-nav .header-nav-wrapper > li > dl > dt {
  width: 100%;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

/* 导航栏 每个导航下面的二级导航容器的每个导航 当鼠标滑上时的样式*/
#header .header-nav .header-nav-wrapper > li > dl > dt > a:hover {
  text-decoration: none;
}

/* 导航栏 滑上一级导航显示二级导航 */
#header .header-nav .header-nav-wrapper > li:hover dl {
  display: block;
}

#header .header-nav .header-nav-wrapper > li > dl > dt:hover {
  cursor: pointer;
  background: #ccc;
}

@media screen and (max-width: 997px) {
  #header .header-nav-m {
    position: relative;
  }

  /* 导航栏logo容器 */
  #header .header-nav-m .header-nav-m-logo {
    height: 80px;
    position: relative;
  }

  /* 导航栏logo图片 */
  #header .header-nav-m .header-nav-m-logo img {
    width: 95px;
    height: 45px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }

  /* 导航栏  菜单容器 */
  #header .header-nav-m .header-nav-m-menu {
    color: #fff;
    height: 50px;
    font-size: 20px;
    line-height: 50px;
    background: #474747;
    position: relative;
  }

  /* 导航栏 菜单图标 */
  #header .header-nav-m .header-nav-m-menu-wrapper {
    position: absolute;
    top: 50%;
    right: 20px;
    margin-top: -20px;
    width: 50px;
    height: 40px;
    color: #fff;
    z-index: 999999;
    font-size: 12px;
  }

  /* 导航栏 */
  #header .header-nav-m .header-nav-m-wrapper {
    position: absolute;
    top: 50px;
    left: 0;
    width: 100%;
    background: #474747;
    z-index: 9999999;
  }

  /* 导航栏 每个导航 */
  #header .header-nav-m .header-nav-m-wrapper > li {
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #ccc;
  }

  /* 导航栏 每个导航下面的 a 链接 */
  #header .header-nav-m .header-nav-m-wrapper > li > a {
    color: #fff;
    font-size: 15px;
    font-weight: bold;
    padding: 15px 0;
    position: relative;
  }

  /* 导航栏 每个导航下面的 a 链接的右侧小三角 */
  #header .header-nav .header-nav-wrapper > li > a > span {
    font-size: 10px;
  }
}
</style>
