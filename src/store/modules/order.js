import request from '@/utils/request'
// import otherRequest from '@/utils/otherRequest'
import {order, RentstoreStatsTest} from '@/api/api'
const state = {
  
}

const mutations = {
}

const actions = {
  // 获取首页统计折线图数据
  getHomeData({commit}, data) {
    return request({
      url: order,
      method: 'get',
      params: data,
    })
  },

  getRentstoreStatsTest({commit}, data) {
    return request({
      url: RentstoreStatsTest,
      method: 'get',
      params: data,
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
