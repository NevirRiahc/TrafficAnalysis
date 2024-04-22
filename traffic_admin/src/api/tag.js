import request from '@/utils/request'
import {getToken} from "@/utils/auth";

const base = '/movietag/'

export function list(page, limit=10, search=''){
  return request({
    url: base + '',
    method: 'get',
    params: {page: page, limit: limit, search: search}
  })
}

export function add(data){
  return request({
    url: base,
    method: 'post',
    data
  })
}

export function remove(data){
  return request({
    url: base + data.id+ '/',
    method: 'delete',
    headers:{'token': getToken()},
    data
  })
}

/* 修改信息，修改密码 */
export function modify(data) {
  const _id = data.review_id
  console.log(data)
  //
  return request({
    url: base + _id + '/',
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
