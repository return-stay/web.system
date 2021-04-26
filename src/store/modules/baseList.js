// 静态的一些base列表

import {getAjax, postAjax} from '@/utils/ajax'

import {
  GameMiniLst,
  BaseDeliveryCompanyLst,
  BaseChannelLst,
  BaseTradeStatusLst,
  BaseSortLst,
  BaseAreaLst,
  BaseLanguageLst,
  BasePlatformLst,
  BaseDefinesortLst,
  BaseGroupLst,
  BaseGameCompanyLst,
  BaseTrophyLevelLst,
  BaseContentTypeList,
  BaseContentLocationList,
  BaseCheckStatusLst,
  BaseTrophyLst,
  BaseTopicLst,
  BaseDiscStateLst,
} from '@/api/api'

const state = {
  gameMiniList: [], //游戏mini列表
  platformList: [], //平台列表
  deliveryCompanyList: [], //快递公司
  channelList: [], //下拉渠道列表
  tradeStatusList: [], //订单状态
  sortList: [], //游戏类型
  areaList: [], // 版本
  languageList: [],//语言列表
  definesortList: [],// 内容分类
  groupList: [], //获取系列列表
  gameCompanyList: [], //获取游戏公司列表
  trophyLevelList: [], //奖杯获取难易度
  contentTypeList: [], //图片位类型
  contentLocationList: [], //图片位位置
  checkStatusList: [], //
  trophyList: [], //
  topicList: [], //专题
  discStateList: [], //盘校验状态
}

const mutations = {
  SET_GAMEMINILIST: (state, list) => {
    state.gameMiniList = list
  },
  SET_PLATFORMLST: (state, list) => {
    state.platformList = list
  },
  SET_DELIVERYCOMPANYLIST: (state, list) => {
    state.deliveryCompanyList = list
  },
  SET_CHANNELLIST: (state, list) => {
    state.channelList = list
  },
  SET_TRADESTATUSLIST: (state, list) => {
    state.tradeStatusList = list
  },
  SET_SORTLIST: (state, list) => {
    state.sortList = list
  },
  SET_AREALIST: (state, list) => {
    state.areaList = list
  },
  SET_LANGUAGELIST: (state, list) => {
    state.languageList = list
  },
  SET_DEFINESORTLIST: (state, list) => {
    state.definesortList = list
  },
  SET_GROUPLIST: (state, list) => {
    state.groupList = list
  },
  SET_GAMECOMPANYLIST: (state, list) => {
    state.gameCompanyList = list
  },
  SET_TROPHYLEVELLIST: (state, list) => {
    state.trophyLevelList = list
  },
  SET_CONTENTTYPELIST: (state, list) => {
    state.contentTypeList = list
  },
  SET_CONTENTLOCATIONLIST: (state, list) => {
    state.contentLocationList = list
  },
  SET_CHECKSTATUSLIST: (state, list) => {
    state.checkStatusList = list
  },
  SET_TROPHYLIST: (state, list) => {
    state.trophyList = list
  },
  SET_TOPICLIST: (state, list) => {
    state.topicList = list
  },
  SET_DISCSTATELIST: (state, list) => {
    state.discStateList = list
  },
}

const actions = {
  // 获取游戏mini列表
  getminilist({commit}, data) {
    return new Promise((reject) => {
      postAjax({
        url: GameMiniLst,
        data,
      }).then(res=> {
        console.log(res)
        commit('SET_GAMEMINILIST', res.data)
        reject(res)
      })
    })
  },
  // 获取静态列表
  getBaseList({commit}, params) {
    return new Promise((resolve, reject) => {
      let request = null
      if(params.method === 'post') {
        request = postAjax({
          url: params.url,
          data: params.data,
        })
      }else {
        request = getAjax({
          url: params.url,
          data: params.data,
        })
      }
      request.then(res=> {
        if(res.code === 1) {
          const resdata = res.data || []
          switch(params.url) {
            case GameMiniLst:
              commit('SET_GAMEMINILIST', resdata)
              break;
            case BasePlatformLst:
              commit('SET_PLATFORMLST', resdata)
              break;
            case BaseDeliveryCompanyLst:
              commit('SET_DELIVERYCOMPANYLIST', resdata)
              break;
            case BaseChannelLst:
              commit('SET_CHANNELLIST', resdata)
              break;
            case BaseTradeStatusLst:
              commit('SET_TRADESTATUSLIST', resdata)
              break;
            case BaseSortLst:
              commit('SET_SORTLIST', resdata)
              break;
            case BaseAreaLst:
              commit('SET_AREALIST', resdata)
              break;
            case BaseLanguageLst:
              commit('SET_LANGUAGELIST', resdata)
              break;
            case BaseDefinesortLst:
              commit('SET_DEFINESORTLIST', resdata)
              break;
            case BaseGroupLst:
              commit('SET_GROUPLIST', resdata)
              break;
            case BaseGameCompanyLst:
              commit('SET_GAMECOMPANYLIST', resdata)
              break;
            case BaseTrophyLevelLst:
              commit('SET_TROPHYLEVELLIST', resdata)
              break;
            case BaseContentTypeList:
              commit('SET_CONTENTTYPELIST', resdata)
              break;
            case BaseContentLocationList:
              commit('SET_CONTENTLOCATIONLIST', resdata)
              break;
            case BaseCheckStatusLst:
              commit('SET_CHECKSTATUSLIST', resdata)
              break;
            case BaseTrophyLst:
              commit('SET_TROPHYLIST', resdata)
              break;
            case BaseTopicLst:
              commit('SET_TOPICLIST', resdata)
              break;
            case BaseDiscStateLst:
              commit('SET_DISCSTATELIST', resdata)
              break;
            default:
          }
          resolve(res)
        }else {
          reject(res)
        }
      }).catch(err=> {
        reject(err)
      })
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
