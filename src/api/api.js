const baseApi = process.env.VUE_APP_BASE_API, //
    IMG_URL = process.env.VUE_APP_IMG_URL,
    RentstoreStatsTest = '/rentstore/stats/test.c',
    SummaryInfoDat = '/summary/info.dat', //概况

    SwitchListDat = '/switch/list.dat', //获取开关列表 
    SwitchInfoSet = '/switch/info.set', //控制开关 参数 id, is_on

    GameListDat = '/game/list.dat', //游戏列表
    GameOffset = '/game/off.set', //游戏下架
    GameOnset = '/game/on.set', //游戏上架
    GameMiniLst = '/game/mini.lst', //游戏列表
    GameInfoDat = '/game/info.dat', //游戏详情
    GameInfoSet = '/game/info.set', //添加游戏
    GameCoverSet = '/game/cover.set', //游戏封面  id=&cover=FILE
    GameScreenshotSet = '/game/screenshot.set', //上传截图  id=&screenshot=FILE
    GameScreenshotDel = '/game/screenshot.del', //删除游戏截图 id=&ssid=screenshotID
    GameDefineSortInf = '/game/define/sort.inf',
    GameDefineSortSet = '/game/define/sort.set',
    GameDefineSortLst = '/game/define/sort.lst', // 游戏内容分类列表
    GameDefineSortGamesSet = '/game/define/sort/games.set', ///id=游戏ID&gms=id1,id2,id3 内容分类id
    GameDefineOnSet = '/game/define/sort/on.set', //游戏内容分类
    GameDefineOffSet = '/game/define/sort/off.set',
    GameDefinesortsSet = '/game/definesorts.set',//id=gameID&dss=id1,id2,id3
    GameTrophyLst = '/game/trophy.lst',//游戏奖杯列表
    GameTrophySet = '/game/trophy.set', //更新奖杯
    GameTrophyOnSet = '/game/trophy/on.set', //奖杯开启
    GameTrophyOffSet = '/game/trophy/off.set', //奖杯关闭
    
    GameTrophyInf = '/game/trophy.inf',//奖杯详情
    GameTrophyNewSet = '/game/trophy/new.set', //新建奖杯
    GamePriceSet = '/game/price.set', //定价
    GamePriceInf = '/game/price.inf', //定价详情
    GamePriceLst = '/game/price.lst', //定价列表
    GameCompanyInf = '/game/company.inf', //游戏公司详情 id
    GameCompanyLst = '/game/company.lst', //游戏公司列表 key=搜索内容
    GameCompanySet = '/game/company.set ', //游戏公司详情更新/新建  id=可选&org=原名&v=显示名&i=介绍&logo=图
    GameCompanyOnset = '/game/company/on.set', //公司开关
    GameCompanyOffset = '/game/company/off.set', //公司开关
    GameGroupLst = '/game/group.lst', //key=搜索内容
    GameGroupinf = '/game/group.inf', //id=
    GameGroupSet = '/game/group.set', //id=&nm=名字&i=简介&isa=是否启用
    GameGroupOnSet = '/game/group/on.set', //开启
    GameGroupOffSet = '/game/group/off.set', //关闭

    TradeListDat = '/trade/list.dat', // 订单列表 tid 订单 cstime,cetime 创建开始、结束时间 pstime,petime 支付开始、结束时间 st状态 dcid物流方式 ch渠道 page页数
    TradeInfoDat = '/trade/info.dat', //订单详情
    TradeCloseSet = '/trade/close.set', // 关闭订单 id=交易ID
    TradeDeliverySet = '/trade/delivery.set', // 交易订单发货 id=交易订单ID&did=快递公司ID&epsno=快递单号
    DiscOrderDiscSet = '/disc/order/disc.set', //盘订单选盘  id=盘订单ID&did=盘ID

    ChannelListDat = '/channel/list.dat', //渠道列表
    ChannelInfoDat = '/channel/info.dat', //渠道详情
    ChannelInfoSet = '/channel/info.set', //添加渠道
    ChannelOnSet = '/channel/on.set', //添加开启
    ChannelOffSet = '/channel/off.set', //添加关闭


    ContentInfoLst = '/content/list.dat',//图片位管理
    ContentInfoDat= '/content/info.dat',//图片位详情
    ContentOffSet = '/content/off.set', //图片位关
    ContentOnSet = '/content/on.set', //图片位开
    ContentInfoSet = '/content/info.set',//添加图片位

    DiscFreeLst = '/disc/free.lst', //可租借游戏盘列表
    DiscOrderListDat = '/disc/order/list.dat', //游戏盘订单列表
    DiscOrderPhotoSet = '/disc/order/photo.set',//订单上传照片 oid:orderId & field:文件 文件：图地址
    DiscOrderPhotoLst = '/disc/order/photo.lst', //照片列表 oid
    DiscListDat = '/disc/list.dat', // 游戏库存列表
    DiscOnSet = '/disc/on.set', // 游戏库存开启
    DiscOffSet = '/disc/off.set', // 游戏库存关闭
    DiscInfoDat = '/disc/info.dat',
    DiscInfoSet = '/disc/info.set', //
    DiscOrderCheckInf = '/disc/order/check.inf', //订单详情 oid=orderID
    DiscOrderCheckSet = '/disc/order/check.set', //订单   oid=orderID&tp=type&rs=readStatus&ms=mediaStatus&cs=coverStatus
    DiscOrderSettlementSet = '/disc/order/settlement.set', //结算接口  id=orderID

    BaseDeliveryCompanyLst = '/base/delivery/company.lst', //快递公司
    BaseChannelLst = '/base/channel.lst', // 下拉渠道列表
    BaseTradeStatusLst = '/base/trade/status.lst', // 订单状态
    BaseSortLst = '/base/sort.lst', // 游戏类型
    BaseAreaLst = '/base/area.lst', // 版本
    BaseLanguageLst = '/base/language.lst', //语言
    BasePlatformLst = '/base/platform.lst', //平台
    BaseDefinesortLst = '/base/definesort.lst',  //内容分类
    BaseGroupLst = '/base/group.lst', //获取系列列表
    BaseGameCompanyLst = '/base/game/company.lst', //获取游戏公司列表
    BaseTrophyLevelLst = '/base/trophy/level.lst', //获取难易度
    BaseContentTypeList = '/base/content/type.lst', //图片位类型
    BaseContentLocationList = '/base/content/location.lst', //图片位
    BaseCheckStatusLst = '/base/check/status.lst', //
    BaseTrophyLst = '/base/trophy.lst',
    BaseTopicLst = '/base/topic.lst',
    BaseDiscStateLst = '/base/disc/state.lst', //状态列表

    TopicListDat = '/topic/list.dat', //游戏专题列表
    TopicInfoDat = '/topic/info.dat', //游戏专题详情
    TopicInfoSet = '/topic/info.set', //添加游戏专题
    TopicOnSet = '/topic/on.set', //专题开关
    TopicOffSet = '/topic/off.set', //专题开关

    UserVipFeeLst = '/user/vip/fee.lst', //用户
    UserListDat = '/user/list.dat', //用户列表 
    UserInfoDat = '/user/info.dat', //用户详情 id=用户ID
    UserTradeLst = '/user/trade.lst', //历史订单  uid=用户ID
    UserFeeLst = '/user/fee.lst', //账号记录 uid=用户ID

    RefundListDat = '/refund/list.dat', //售后
    RefundInfoDat = '/refund/info.dat', //售后详情

    DeliveryTraceInf = '/delivery/trace.inf', //物流信息 oid=快递订单ID

    order = '/demo';


export {
  baseApi,
  IMG_URL,
  RentstoreStatsTest,
  SummaryInfoDat,
  SwitchListDat,
  SwitchInfoSet,

  GameListDat,
  GameOffset,
  GameOnset,
  GameMiniLst,
  GameInfoDat,
  GameInfoSet,
  GameCoverSet,
  GameScreenshotSet,
  GameScreenshotDel,
  GameDefineSortInf,
  GameDefineSortSet,
  GameDefineSortLst,
  GameDefineSortGamesSet,
  GameDefineOnSet,
  GameDefineOffSet,
  GameDefinesortsSet,
  GameTrophyLst,
  GameTrophySet,
  GameTrophyOnSet,
  GameTrophyOffSet,
  GameTrophyInf,
  GameTrophyNewSet,
  GamePriceSet,
  GamePriceInf,
  GamePriceLst,
  GameCompanyInf,
  GameCompanyLst,
  GameCompanySet,
  GameCompanyOnset,
  GameCompanyOffset,
  GameGroupLst,
  GameGroupinf,
  GameGroupSet,
  GameGroupOnSet,
  GameGroupOffSet,

  TradeListDat,
  ChannelListDat,
  ChannelInfoSet,
  ChannelOnSet,
  ChannelOffSet,
  ChannelInfoDat,
  TradeCloseSet,
  TradeInfoDat,
  TradeDeliverySet,

  DiscOrderDiscSet,
  DiscFreeLst,
  DiscOrderPhotoSet,
  DiscOrderPhotoLst,
  DiscOrderListDat,
  DiscListDat,
  DiscOnSet,
  DiscOffSet,
  DiscInfoDat,
  DiscInfoSet,
  BaseDiscStateLst,
  DiscOrderCheckInf,
  DiscOrderCheckSet,
  DiscOrderSettlementSet,

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

  ContentInfoLst,
  ContentInfoDat,
  ContentOffSet,
  ContentOnSet,
  ContentInfoSet,

  TopicListDat,
  TopicInfoDat,
  TopicInfoSet,
  TopicOnSet,
  TopicOffSet,

  UserVipFeeLst,
  UserListDat,
  UserInfoDat,
  UserTradeLst,
  UserFeeLst,

  RefundListDat,
  RefundInfoDat,
  DeliveryTraceInf,

  order,
}