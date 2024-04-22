import request from '@/api/request'

const base = '/road/'

export function list(page=1, limit=10, keyword=''){
  return request({
    url: base + 'list2/',
    method: 'get',
    params: {'page':page, 'limit': limit, 'search': keyword}
  })
}

export function getRecommend(data, username){
  return request({
    url: base + '/recommend/',
    method: 'post',
    data,
    params: {'username':username}
  })
}

export function add(data){
  return request({
    url: base ,
    method: 'post',
    data,
  })
}

export function get(id){
  return request({
    url: base + '/' + id + '/',
    method: 'get',
  })
}
