import request from '@/api/request'

export function  getDashData(){
  return request({
    url: '/data',
    method: 'post'
  });
}

export function  getGraphData(){
  return request({
    url: '/data/relation.json',
    method: 'get'
  });
}
