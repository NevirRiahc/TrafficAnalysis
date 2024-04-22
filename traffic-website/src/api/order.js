import request from '@/api/request'

const base = '/order/'

export function list(page=1, limit=10, keyword='', uid=''){
  return request({
    url: base,
    method: 'get',
    params: {'page':page, 'limit': limit, 'search': keyword, 'uid': uid}
  })
}

export function add(data){
  return request({
    url: base + 'add/',
    method: 'post',
    data
  })
}

export function remove(id){
  return request({
    url: base  + id + '/',
    method: 'delete',
  })
}

export function get(id){
  return request({
    url: base + '/' + id + '/',
    method: 'get',
  })
}

export function pay(orderid){
  return request({
    url:   base  +orderid+ '/pay' ,
    method: 'post'
  })
}
