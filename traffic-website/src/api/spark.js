import request from '@/api/request'

const base = '/spark/'

export function getUserCF(uid){
  return request({
    url: base + '/usercf/',
    method: 'get',
    params: {'uid':uid}
  })
}

export function getItemCF(uid){
  return request({
    url: base + '/itemcf/',
    method: 'get',
    params: {'uid':uid}
  })
}
