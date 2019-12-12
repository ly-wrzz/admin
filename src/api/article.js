import request from '@/utils/request'

export function memberList(query) {
  return request({
    url: 'http://www.gg.com/admin/member/memberlist',
    method: 'POST',
    params: query
  })
}

export function changeWhite(data) {
  return request({
    url: 'http://www.gg.com/admin/member/changeWhite',
    method: 'POST',
    params: data
  })
}

export function whiteList(whiteList) {
  return request({
    url: 'http://www.gg.com/admin/member/whiteList',
    method: 'POST',
    params: whiteList
  })
}

export function fetchList(query) {
  return request({
    url: '/article/list',
    method: 'get',
    params: query
  })
}

export function fetchArticle(id) {
  return request({
    url: '/article/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/article/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/article/create',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/article/update',
    method: 'post',
    data
  })
}
