// created by redcomet 2021-11-3

import request from '@/api/request'

const base = '/sms'

export function sendMsg(data) {
  return request({
    url: base + '/sendMsg',
    method: 'post',
    data
  })
}

export function modifyPassBySms(id,data) {
  return request({
    url: base + '/modifyPass/' + id,
    method: 'post',
    data
  })
}


