import request from '@/api/request'

const base = '/game/'

export function list(page=1, limit=10, keyword='', type=''){
  return request({
    url: base,
    method: 'get',
    params: {'page':page, 'limit': limit, 'search': keyword, 'type': type}
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

export function getRecommend2(data, username){
  return request({
    url: base + '/recommend2/',
    method: 'post',
    data,
    params: {'username':username}
  })
}

export function get(id){
  return request({
    url: base + '/' + id + '/',
    method: 'get',
  })
}
