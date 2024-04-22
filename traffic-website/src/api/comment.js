import request from '@/api/request'

const base = '/comment'

export function list(page=1, limit=15, search='', uid=''){
  return request({
    url: base + '/' ,
    method: 'get',
    params:{page:page, limit:limit, search: search, uid: uid }
  })
}

export function remove(id){
  return request({
    url: base + '/' + id + '/',
    method: 'delete',
  })
}

export function add(data){
  return request({
    url: base + '/' ,
    method: 'post',
    data
  })
}
