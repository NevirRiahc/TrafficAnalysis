import request from '@/api/request'

const base = '/chart'

/* 地图 */
export function search(keyword){
  return request({
    url: base + '/map/search/' + keyword,
    method: 'get',
  })
}


export function refresh(){
  return request({
    url: base + '/map/refresh',
    method: 'post'
  })
}

export function geometryCouties(code) {
  return request({
    url: '/data/geometryCouties/' + code + '.json',
    method: 'get'
  })
}

export function geometryProvince(code) {
  return request({
    url: '/data/geometryProvince/' + code + '.json',
    method: 'get'
  })
}

/* panelGroup */
export function panelGroup() {
  return request({
    url: base + '/panel',
    method: 'get'
  })
}

/* 关系图 */
export function relationGraph() {
  return request({
    url: base + '/graph/relation',
    method: 'get'
  })
}
