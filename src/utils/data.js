
import { getAjax, postAjax } from "@/utils/ajax"
import store from '@/store'
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

const postSearchList = (url) => {
  return postAjax({
    url
  })
}

// 通过传的接口，获取相关列表
const getList = (url) => {
  return new Promise((reject) => {
    getAjax({
      url: url
    }).then(res=> {
      let list = res.data || []
      reject(list)
    })
  })
}

const postList = async (url) => {
  let req = await postSearchList(url)
  let list =  req.data.list ||req.data || []
  return list
}


const getStoreList = (url) => {
  return new Promise((resolve) => {
    switch(url) {
      case GameMiniLst:
        let gameMiniList = store.getters.gameMiniList
        if(gameMiniList && gameMiniList.length> 0) {
          resolve(gameMiniList)
        }else {
          store.dispatch('baseList/getBaseList', {url: GameMiniLst, method: 'post'}).then(res=> {
            resolve(res.data)
          })
        }
        break;
      case BasePlatformLst:
        let platformList = store.getters.platformList
        if(platformList && platformList.length>0) {
          resolve(platformList)
        }else {
          store.dispatch('baseList/getBaseList', {url: BasePlatformLst}).then(res=> {
            resolve(res.data)
          })
        }
        break;
      case BaseDeliveryCompanyLst:
        let deliveryCompanyList = store.getters.deliveryCompanyList
        if(deliveryCompanyList && deliveryCompanyList.length>0) {
          resolve(deliveryCompanyList)
        }else {
          store.dispatch('baseList/getBaseList', {url: BaseDeliveryCompanyLst}).then(res=> {
            resolve(res.data)
          })
        }
        break;
      case BaseChannelLst:
        let channelList = store.getters.channelList
        if(channelList && channelList.length> 0) {
          resolve(channelList)
        }else {
          store.dispatch('baseList/getBaseList', {url: BaseChannelLst}).then(res=> {
            resolve(res.data)
          })
        }
        break;
      case BaseTradeStatusLst:
        let tradeStatusList = store.getters.tradeStatusList
        if(tradeStatusList&&tradeStatusList.length>0) {
          resolve(tradeStatusList)
        }else {
          store.dispatch('baseList/getBaseList', {url: BaseTradeStatusLst}).then(res=> {
            resolve(res.data)
          })
        }
        break;
      case BaseSortLst:
        let sortList = store.getters.sortList
        if(sortList && sortList.length>0) {
          resolve(sortList)
        }else {
          store.dispatch('baseList/getBaseList', {url: BaseSortLst}).then(res=> {
            resolve(res.data)
          })
        }
        break;
      case BaseAreaLst:
        let areaList = store.getters.areaList
        if(areaList && areaList.length>0) {
          resolve(areaList)
        }else {
          store.dispatch('baseList/getBaseList', {url: BaseAreaLst}).then(res=> {
            resolve(res.data)
          })
        }
        break;
      case BaseLanguageLst:
        let languageList = store.getters.languageList
        if(languageList && languageList.length>0) {
          resolve(languageList)
        }else {
          store.dispatch('baseList/getBaseList', {url: BaseLanguageLst}).then(res=> {
            resolve(res.data)
          })
        }
        break;
      case BaseDefinesortLst:
        let definesortList = store.getters.definesortList
        if(definesortList && definesortList.length>0) {
          resolve(definesortList)
        }else {
          store.dispatch('baseList/getBaseList', {url: BaseDefinesortLst}).then(res=> {
            resolve(res.data)
          })
        }
        break;
      case BaseGroupLst:
        let groupList = store.getters.groupList
        if(groupList && groupList.length>0) {
          resolve(groupList)
        }else {
          store.dispatch('baseList/getBaseList', {url: BaseGroupLst}).then(res=> {
            resolve(res.data)
          })
        }
        break;
      case BaseGameCompanyLst:
        let gameCompanyList = store.getters.gameCompanyList
        if(gameCompanyList && gameCompanyList.length>0) {
          resolve(gameCompanyList)
        }else {
          store.dispatch('baseList/getBaseList', {url: BaseGameCompanyLst}).then(res=> {
            resolve(res.data)
          })
        }
        break;
      case BaseTrophyLevelLst:
        let trophyLevelList = store.getters.trophyLevelList
        if(trophyLevelList && trophyLevelList.length>0) {
          resolve(trophyLevelList)
        }else {
          store.dispatch('baseList/getBaseList', {url: BaseTrophyLevelLst}).then(res=> {
            resolve(res.data)
          })
        }
        break;
      case BaseContentTypeList:
        let contentTypeList = store.getters.contentTypeList
        if(contentTypeList && contentTypeList.length>0) {
          resolve(contentTypeList)
        }else {
          store.dispatch('baseList/getBaseList', {url: BaseContentTypeList}).then(res=> {
            resolve(res.data)
          })
        }
        break;
      case BaseContentLocationList:
        let contentLocationList = store.getters.contentLocationList
        if(contentLocationList && contentLocationList.length>0) {
          resolve(contentLocationList)
        }else {
          store.dispatch('baseList/getBaseList', {url: BaseContentLocationList}).then(res=> {
            resolve(res.data)
          })
        }
        break;
      case BaseCheckStatusLst:
        let checkStatusList = store.getters.checkStatusList
        if(checkStatusList && checkStatusList.length>0) {
          resolve(checkStatusList)
        }else {
          store.dispatch('baseList/getBaseList', {url: BaseCheckStatusLst}).then(res=> {
            resolve(res.data)
          })
        }
        break;
      case BaseTrophyLst:
        let trophyList = store.getters.trophyList
        if(trophyList && trophyList.length>0) {
          resolve(trophyList)
        }else {
          store.dispatch('baseList/getBaseList', {url: BaseTrophyLst}).then(res=> {
            resolve(res.data)
          })
        }
        break;
      case BaseTopicLst:
        let topicList = store.getters.topicList
        if(topicList && topicList.length>0) {
          resolve(topicList)
        }else {
          store.dispatch('baseList/getBaseList', {url: BaseTopicLst}).then(res=> {
            resolve(res.data)
          })
        }
        break;
      case BaseDiscStateLst:
        let discStateList = store.getters.discStateList
        if(discStateList && discStateList.length>0) {
          resolve(discStateList)
        }else {
          store.dispatch('baseList/getBaseList', {url: BaseDiscStateLst}).then(res=> {
            resolve(res.data)
          })
        }
        break;
      default:
        console.log('default')
    }
  })
}
export {
  getList,
  postList,
  getStoreList,
}