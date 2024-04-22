import request from '@/api/request'

const base = '/category'

export function getNews(data){
  return request({
    url: base + '/recommendNews',
    method: 'post',
    data
  })
}

export function news(username){
  return request({
    url: base + '/fontsearch/' + username,
    method: 'get',
  })
}

export function remove(id){
  return request({
    url: base + '/delete/' + id,
    method: 'get',
  })
}

export function add(data){
  return request({
    url: base + '/add' ,
    method: 'post',
    data
  })
}
