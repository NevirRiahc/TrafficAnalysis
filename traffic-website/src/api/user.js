import request from '@/api/request'

const base = '/user'

export function login(data){
  return request({
    url: base + '/login',
    method: 'post',
    data
  })
}

export function register(data){
  return request({
    url: base + '/register',
    method: 'post',
    data
  })
}

export function idconfirm(data) {
  return request({
    url: base + '/idconfirm',
    method: 'post',
    data
  })
}
