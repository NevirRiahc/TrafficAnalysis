import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/'
    }, {
      path: '/',
      name: 'PageView',
      component: resolve => require(['@/view/PageView'], resolve),
      children: [
        {
          path: '/',
          redirect: '/home'
        }, {
          path: '/home',
          name: 'home',
          component: resolve => require(['@/view/HomePage'], resolve),
          meta: {
            title: '首页'
          }
        }
        ,
        {
          path: '/infos',
          name: 'infos',
          component: resolve => require(['@/view/Traffic/InfoList'], resolve),
          meta: {title: '道路信息'}
        },
        {
          path: '/roads',
          name: 'roads',
          component: resolve => require(['@/view/Traffic/RoadList'], resolve),
          meta: {title: '流量查询'}
        },
        {
          path: '/status',
          name: 'status',
          component: resolve => require(['@/view/Traffic/StatusList'], resolve),
          meta: {title: '路况查询'}
        },
        {
          path: '/predict',
          name: 'predict',
          component: resolve => require(['@/view/Traffic/Predict'], resolve),
          meta: {
            title: '流量预测'
          }
        },
      ]
    }
  ]
})
