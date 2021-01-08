const baseApi = process.env.VUE_APP_BASE_API, //
    RentstoreStatsTest = '/rentstore/stats/test.c',
    SummaryInfoDat = '/summary/info.dat', //概况

    SwitchListDat = '/switch/list.dat', //获取开关列表 
    SwitchInfoSet = '/switch/info.set', //控制开关 参数 id, is_on

    TradeListDat = '/trade/list.dat', // 订单列表 tid 订单 cstime,cetime 创建开始、结束时间 pstime,petime 支付开始、结束时间 st状态 dcid物流方式 ch渠道 page页数
    TradeInfoDat = '/trade/info.dat', //订单详情
    TradeCloseSet = '/trade/close.set', // 关闭订单 id=交易ID
    TradeDeliverySet = '/trade/delivery.set', // 交易订单发货 id=交易订单ID&did=快递公司ID&epsno=快递单号
    DiscOrderDiscSet = '/disc/order/disc.set', //盘订单选盘  id=盘订单ID&did=盘ID


    ChannelListDat = '/channel/list.dat', //渠道列表

    DiscFreeLst = '/disc/free.lst', //可租借游戏盘列表
    DiscOrderListDat = '/disc/order/list.dat', //游戏盘订单列表
    DiscOrderPhotoSet = '/disc/order/photo.set',//订单上传照片 oid:orderId & field:文件 文件：图地址
    DiscOrderPhotoLst = '/disc/order/photo.lst', //照片列表 oid

    BaseDeliveryCompanyLst = '/base/delivery/company.lst', //快递公司
    BaseChannelLst = '/base/channel.lst', // 下拉渠道列表
    BaseTradeStatusLst = '/base/trade/status.lst', // 订单状态


    UserListDat = '/user/list.dat',
    UserInfoDat = '/user/info.dat',


    UserTradeLst = '/user/trade.lst', //历史订单
    UserFeeLst = '/user/fee.lst', //账号记录

    GameCompanyInf = '/game/company.inf', //游戏公司详情 id
    GameCompanyLst = '/game/company.lst', //游戏公司列表 key=搜索内容
    GameCompanyGameSet = '/game/company/game.set', //游戏公司详情更新/新建  id=可选&org=原名&v=显示名&i=介绍&logo=图


    order = 'demo';
export {
  baseApi,
  RentstoreStatsTest,
  SummaryInfoDat,
  SwitchListDat,
  SwitchInfoSet,
  TradeListDat,
  ChannelListDat,
  TradeCloseSet,
  TradeInfoDat,
  TradeDeliverySet,

  DiscOrderDiscSet,
  DiscFreeLst,
  DiscOrderPhotoSet,
  DiscOrderPhotoLst,
  DiscOrderListDat,

  BaseDeliveryCompanyLst,
  BaseChannelLst,
  BaseTradeStatusLst,

  UserListDat,
  UserInfoDat,

  UserTradeLst,
  UserFeeLst,

  GameCompanyInf,
  GameCompanyLst,
  GameCompanyGameSet,


  order,
}