import request from '@/api/request'

const base = '/chart'

export function test(){
  return request({
    url: base + '/panel',
    method: 'get',
  })
}
