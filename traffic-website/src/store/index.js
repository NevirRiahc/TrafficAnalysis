import Vue from 'vue'
import Vuex from 'vuex'
import {login,register} from "../api/user";
import getters from "./getters";
import {setLogin, getId, getLogin, getRealname, getUsername, removeLogin, getPhone, getRole} from "../utils/auth";

Vue.use(Vuex)

const state = {
  id: getId(),
  username: getUsername(),
  isLogin : getLogin(),
  realname: getRealname(),
  phone: getPhone(),
  role: getRole(),
}

const mutations = {
  SET_ID: (state, id) => {
    state.id = id
  },
  SET_LOGIN: (state, isLogin) => {
    state.isLogin = isLogin
  },
  SET_NAME: (state, name) => {
    state.realname = name
  },
  SET_USERNAME: (state, username) => {
    state.username = username
  },
  SET_MSG: (state, count) => {
    state.msg = count
  },
  SET_PHONE: (state, phone) => {
    state.phone = phone
  },
  SET_ROLE: (state, role) => {
    state.role = role
  }
}

const actions = {
  login({commit}, data) {
    return new Promise((resolve, reject) => {
      login(data).then(res => {
        if(res.data != null){
          const {data} = res.data
          console.log(data)
          if(res.data.code == 0){
            commit('SET_LOGIN', 1)
            commit('SET_USERNAME', data.user.username)
            commit('SET_ID', data.user.id)
            commit('SET_NAME', data.user.realname)
            commit('SET_PHONE', data.user.phone)
            commit('SET_ROLE', data.user.roles)
            setLogin(data)
            resolve("登录成功")
            getMsg(data.user.username).then(res=>{
              commit('SET_MSG', res.data.data.total)
            }).catch(err=>console.log(err))
          }
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  logout({commit}) {
    return new Promise((resolve, reject) => {
      commit('SET_LOGIN', 0)
      commit('SET_ID', -1)
      removeLogin()
      resolve()
    })
  },
  register({commit}, data) {
    return new Promise((resolve, reject) => {
      register(data).then(res => {
        if(res.data != null){
          const {data} = res.data
          console.log(data)
          if(res.data.code == 0){
            // commit('SET_LOGIN', 1)
            // commit('SET_USERNAME', data.username)
            // commit('SET_NAME', data.realname)
            // setLogin(data)
            resolve("注册成功,请登录")
          }
        }
      }).catch(error => {
        reject(error)
      })
    })
  },

}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
  modules:{

  }
})
