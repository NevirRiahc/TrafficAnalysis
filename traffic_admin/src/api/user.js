import request from '@/utils/request'
import {getToken} from "@/utils/auth";

export function login(data) {
  return request({
    // url: '/admin/login',
    url: '/user/login',
    method: 'post',
    data
  })
}

/* 根据token获取信息 */
export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    headers:{'token': token},
    // params: { token }
  })
}

export function search(keyword){
  return request({
    url: '/user/search/' + keyword,
    method: 'get',
  })
}

export function search2(data){
  return request({
    url: '/user/search2',
    method: 'post',
    data
  })
}

export function list(page, limit=10, search=''){
  return request({
    url: '/user/' ,
    method: 'get',
    params: {page: page, limit: limit, search: search}
  })
}

export function add(data){
  data.password = '123456'
  return request({
    url: '/user/',
    method: 'post',
    data
  })
}

export function remove(data){
  return request({
    url: '/user/' + data.id+ '/',
    method: 'delete',
    headers:{'token': getToken()},
    data
  })
}

/* 修改信息，修改密码 */
export function modify(data) {
  console.log(data)
  //
  return request({
    url: '/user/' + data.id + '/',
    method: 'put',
    headers:{'token': getToken()},
    data
  })
}

// export function logout(data) {
//   return request({
//     url: '/admin/logout',
//     method: 'post',
//     data: {"token":data}
//   })
// }
