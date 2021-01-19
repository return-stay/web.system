const baseApi = process.env.VUE_APP_BASE_API, //
    IMG_URL = process.env.VUE_APP_IMG_URL,
    RentstoreStatsTest = '/rentstore/stats/test.c',
    SummaryInfoDat = '/summary/info.dat', //概况

    SwitchListDat = '/switch/list.dat', //获取开关列表 
    SwitchInfoSet = '/switch/info.set', //控制开关 参数 id, is_on

    GameListDat = '/game/list.dat', //游戏列表
    GameMiniLst = '/game/mini.lst', //游戏列表
    GameInfoDat = '/game/info.dat', //游戏详情
    GameInfoSet = '/game/info.set', //添加游戏
    GameCoverSet = '/game/cover.set', //游戏封面
    GameScreenshotSet = '/game/screenshot.set', //上传截图  id=&screenshot=FILE
    GameScreenshotDel = '/game/screenshot.del', //删除游戏截图 id=&ssid=screenshotID

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
    BaseSortLst = '/base/sort.lst', //
    BaseAreaLst = '/base/area.lst',
    BaseLanguageLst = '/base/language.lst',
    BasePlatformLst = '/base/platform.lst',
    BaseDefinesortLst = '/base/definesort.lst',
    BaseGroupLst = '/base/group.lst', //获取系列列表
    BaseGameCompanyLst = '/base/game/company.lst', //获取游戏公司列表



    UserListDat = '/user/list.dat', //用户列表 
    UserInfoDat = '/user/info.dat', //用户详情


    UserTradeLst = '/user/trade.lst', //历史订单
    UserFeeLst = '/user/fee.lst', //账号记录

    GameCompanyInf = '/game/company.inf', //游戏公司详情 id
    GameCompanyLst = '/game/company.lst', //游戏公司列表 key=搜索内容
    GameCompanySet = '/game/company.set ', //游戏公司详情更新/新建  id=可选&org=原名&v=显示名&i=介绍&logo=图

    GameGroupLst = '/game/group.lst', //key=搜索内容
    GameGroupinf = '/game/group.inf', //id=
    GameGroupSet = '/game/group.set', //id=&nm=名字&i=简介&isa=是否启用

    order = 'demo';
export {
  baseApi,
  IMG_URL,
  RentstoreStatsTest,
  SummaryInfoDat,
  SwitchListDat,
  SwitchInfoSet,

  GameListDat,
  GameMiniLst,
  GameInfoDat,
  GameInfoSet,
  GameCoverSet,
  GameScreenshotSet,
  GameScreenshotDel,


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
  BaseSortLst,
  BaseAreaLst,
  BaseLanguageLst,
  BasePlatformLst,
  BaseDefinesortLst,
  BaseGroupLst,
  BaseGameCompanyLst,

  UserListDat,
  UserInfoDat,

  UserTradeLst,
  UserFeeLst,

  GameCompanyInf,
  GameCompanyLst,
  GameCompanySet,
  GameGroupLst,
  GameGroupinf,
  GameGroupSet,

  order,
}