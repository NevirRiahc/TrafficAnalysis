import request from '@/api/request'

const base = '/info/'

export function list(page=1, limit=10, keyword='', type=''){
  return request({
    url: base,
    method: 'get',
    params: {'page':page, 'limit': limit, 'search': keyword, 'type': type}
  })
}

export function list2(page=1, limit=10, keyword='', type=''){
  return request({
    url: base + 'list2',
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

export function predict(lm){
  return request({
    url: '/vis2/predict',
    method: 'get',
    params:{ 'lm': lm}
  })
}
