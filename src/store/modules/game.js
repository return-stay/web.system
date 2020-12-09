import request from '@/utils/request'
import otherRequest from '@/utils/otherRequest'
import { 
  UserSummaryList, 
  TotalDataList, 
  OverallDataList,
  UserSummaryInfo, 
  GameSummaryList, 
  GameOrderList,
  GameSummaryInfo,
  IncomeSummaryList,
  IncomeSummaryTodayInfo,
  ChannelListDat,
  IndentSummaryList,
  IndentTodayInfo,
  DepositSummaryList,
  DepositSummaryInfo,
  ComboSummaryList,
  ComboSummaryInfo,
  VipSummaryList,
  VipSummaryInfo,
  PageSummaryList,
 } from '@/api/api'
const state = {
  listUser: [],
}

const mutations = {
  GET_LIST_USER: (state, list) => {
    state.listUser = list
  }
}

const actions = {
  // user login
  getUserSummaryList({ commit }, data) {
    const { s_time, e_time, ch_id } = data
    return request({
      url: UserSummaryList,
      method: 'get',
      params: { s_time, e_time, ch_id },
    })
  },
  // 获取首页统计折线图数据
  getHomeData({commit}, data) {
    return request({
      url: TotalDataList,
      method: 'get',
      params: data,
    })
  },
  // 整体数据
  getOverallDataList({commit}, data) {
    return request({
      url: OverallDataList,
      method: 'get',
      params: data
    })
  },
  // 入口排行
  getSortPageList({commit}, data) {
    return request({
      url: data.url,
      method: data.method || 'get',
      params: data.params,
    })
  },
  
  // 获取用户汇总概要
  getSummaryInfo({ commit }, data) {
    const { s_time, e_time, ch_id } = data
    return request({
      url: UserSummaryInfo,
      method: 'get',
      params: { s_time, e_time, ch_id }
    })
  },
  // 获取游戏列表
  getGameDataList({commit}, data) {
    return request({
      url: GameSummaryList,
      method: 'get',
      params: data,
    })
  },

  // 获取游戏盘列表
  getGameOrderList({commit}, data) {
    return request({
      url: GameOrderList,
      method: 'get',
      params: data,
    })
  },
  // 游戏统计汇总
  getGameDetailInfo({commit}, data) {
    return request({
      url: GameSummaryInfo,
      method: 'get',
      params: data,
    })
  },

  // 获取收入  /income/summary.list
  getIncomeSummaryList({ commit }, data) {
    return request({
      url: IncomeSummaryList,
      method: 'get',
      params: data
    })
  },

  // 获取实时收入
  getTodayInfo({ commit }, data) {
    return request({
      url: IncomeSummaryTodayInfo,
      method: 'get',
      params: data
    })
  },

  // 获取渠道列表
  getChannelList() {
    return otherRequest({
      url: ChannelListDat,
      method: 'get',
    })
  },
  // 获取业务汇总订单列表
  getOrderList({commit}, data) {
    return request({
      url: IndentSummaryList,
      method: 'get',
      params: data,
    })
  },
  // 获取业务汇总订单头部汇总
  getOrderTopInfo ({commit}, data) {
    return request({
      url: IndentTodayInfo,
      method: 'get',
      params: data,
    })
  },
  // 获取业务汇总押金列表
  getDepositSummaryList({commit}, data) {
    return request({
      url: DepositSummaryList,
      method: 'get',
      params: data,
    })
  },
  // 获取业务汇总押金头部汇总
  getDepositSummaryInfo({commit}, data) {
    return request({
      url: DepositSummaryInfo,
      method: 'get',
      params: data,
    })
  },
  // 获取优惠列表
  getComboSummaryList({commit}, data) {
    return request({
      url: ComboSummaryList,
      method: 'get',
      params: data,
    })
  },

  // 获取优惠当日数据
  getComboSummaryInfo({commit}, data) {
    return request({
      url: ComboSummaryInfo,
      method: 'get',
      params: data
    })
  },
  // 获取会员列表
  getVipSummaryList({commit}, data) {
    return request({
      url: VipSummaryList,
      method: 'get',
      params: data,
    })
  },
  // 获取会员详情
  getVipSummaryInfo({commit}, data) {
    return request({
      url: VipSummaryInfo,
      method: 'get',
      params: data
    })
  },
  // 访问页面
  getPageList({commit}, data) {
    return request({
      url: PageSummaryList,
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
