
const proxyTargetMap = {
  dev: 'http://192.168.0.166:8089/rentstore/manager/api', //本地服务器，开发环境
  gray: 'http://manager2.platinumstar.store/api', //测试服务器，灰度环境
  prod: 'http://manager.platinumstar.store/api', //正式服务器，生产环境
}
const Apitype = process.env.API_TYPE

const baseUrl = proxyTargetMap[Apitype]

let imgBaseUrl = ''
switch(Apitype) {
  case "dev":
    imgBaseUrl = 'http://192.168.0.166:8089'
    break;
  default:
    imgBaseUrl = ''
}

export {
  baseUrl,
  imgBaseUrl,
}