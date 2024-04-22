import request from '@/api/request'

const base = '/vis2'

/*spark 统计*/
export function dash1() {
  return request({
    url: base + '/dash1',
    method: 'get',
  })
}

export function dash2() {
  return request({
    url: base + '/dash2',
    method: 'get'
  })
}

export function yuce(city="北京市") {
  return request({
    url: '/vis2/yuce',
    method: 'get',
    params: {'city': city}
  })
}

export function dash3() {
  return request({
    url: base + '/dash3',
    method: 'get'
  })
}

export function dash31() {
  return request({
    url: base + '/dash31',
    method: 'get'
  })
}
export function dashMap() {
  return request({
    url: base + '/dashMap',
    method: 'get'
  })
}
export function dash0() {
  return request({
    url: base + '/dash0',
    method: 'get'
  })
}

export function dash4() {
  return request({
    url: base + '/dash4',
    method: 'get'
  })
}

export function dash5() {
  return request({
    url: base + '/dash5',
    method: 'get'
  })
}

export function dash6() {
  return request({
    url: base + '/dash6',
    method: 'get'
  })
}

export function getWordcloud() {
  return request({
    url: base + '/wordcloud/',
    method: 'get'
  })
}

export function provinces() {
  return request({
    url: base + '/provinces',
    method: 'get'
  })
}
/* 登录流量 */
export function logins() {
  return request({
    url: base + '/logins',
    method: 'get',
  })
}

export function hotmap2() {
  return request({
    url:  '/vis2/hotmap2',
    method: 'get'
  })
}

export function top5songs() {
  return request({
    url: base + '/top5songs',
    method: 'get'
  })
}

export function hotPlaceData() {
  return request({
    url: '/baidu/hotplace',
    method: 'get'
  })
}

export function dash20(city="北京市") {
  return request({
    url: base + '/dash20',
    method: 'get',
    params: {'city': city}

  })
}

export function dash21(city="北京市") {
  return request({
    url: base + '/dash21',
    method: 'get',
    params: {'city': city}

  })
}

export function dash22(city="北京市") {
  return request({
    url: base + '/dash22',
    method: 'get',
    params: {'city': city}

  })
}

export function dash23(city="北京市") {
  return request({
    url: base + '/dash23',
    method: 'get',
    params: {'city': city}

  })
}

export function getRadar() {
  return request({
    url: base + '/getRadar',
    method: 'get',
  })
}
