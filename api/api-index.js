// api 为固定组件调用接口，backend为处理复杂数据返回组件需要的数据格式

import request from '@/backend/index.js'

export function login() {
  return request('/login')
}

export function getUserInfo() {
  return request('/getUserInfo')
}

export function getBanners() {
  return request(`/getBanners`)
}

export function getNotices() {
  return request('/getNotices')
}

export function getBriefInfo() {
  return request('/getBriefInfo')
}

export function getNearbyInfo() {
  return request('/getNearbyInfo')
}

export function getStoreMarkers() {
  return request('/getMarkers')
}

export function getEmployeeTasks(id) {
  return request(`/getEmployeeTasks`, {
    data: {
      id
    }
  })
}
