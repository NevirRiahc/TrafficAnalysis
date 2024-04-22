/**
 * 拓展功能
 * 1. 身份实名认证
 * created by redcomet 2022-01-04
 */
import request from '@/api/request'

const base = '/baidu'

/* 身份实名认证 */
export function recogizePlant(data) {
  return request({
    url: base + '/recogizePlant',
    method: 'post',
    data
  })
}


