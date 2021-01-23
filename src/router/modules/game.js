import Layout from '@/layout'

const gameRouter = [
  {
    path: '/game',
    component: Layout,
    redirect: '/game/search',
    hidden: false,
    meta: { title: '游戏商品', icon: 'game-cd' },
    children: [
      {
        path: 'search',
        component: () => import('@/views/games/Search'),
        name: 'GameSearch',
        meta: { title: '查询', noCache: true, icon: 'circle' },
      },
      {
        path: 'detail/:id',
        component: () => import('@/views/games/GameDetail'),
        name: 'GameDetail',
        hidden: true,
        meta: { title: '游戏详情', noCache: true, icon: 'circle' },
      },
      {
        path: 'release',
        component: () => import('@/views/games/Release'),
        name: 'GameRelease',
        meta: { title: '发布游戏', noCache: true, icon: 'circle' },
      },
      {
        path: 'inventory',
        component: () => import('@/views/games/GameInventory'),
        name: 'GameInventory',
        meta: { title: '游戏盘库存', noCache: true, icon: 'circle' }
      },
      {
        path: 'inventory/add',
        component: () => import('@/views/games/GameInventory/AddGameInventory'),
        name: 'AddGameInventory',
        hidden: true,
        meta: { title: '游戏盘库存', noCache: true, icon: 'circle' }
      },
      {
        path: 'pricing/manage',
        component: () => import('@/views/games/PricingManage'),
        name: 'PricingManage',
        meta: { title: '定价调整', noCache: true, icon: 'circle' }
      },
      {
        path: 'pricing/adjustment',
        component: () => import('@/views/games/PricingManage/PricingAdjustment'),
        name: 'PricingAdjustment',
        hidden: true,
        meta: { title: '定价调整', noCache: true, icon: 'circle' }
      },
      {
        path: 'trophy/manage',
        component: () => import('@/views/games/TrophyManage'),
        name: 'TrophyManage',
        meta: { title: '奖杯管理', noCache: true, icon: 'circle' }
      },
      {
        path: 'trophy/add',
        component: () => import('@/views/games/TrophyManage/AddTrophyManage'),
        name: 'AddTrophyManage',
        hidden: true,
        meta: { title: '奖杯管理', noCache: true, icon: 'circle' }
      },
      {
        path: 'company',
        component: () => import('@/views/games/Company'),
        name: 'DevelopmentCompany',
        meta: { title: '开发公司', noCache: true, icon: 'circle' }
      },
      {
        path: 'company/add',
        component: () => import('@/views/games/Company/AddCompany'),
        name: 'AddCompany',
        hidden: true,
        meta: { title: '开发公司', noCache: true, icon: 'circle' }
      },
      {
        path: 'series',
        component: () => import('@/views/games/Series'),
        name: 'Series',
        meta: { title: '游戏系列管理', noCache: true, icon: 'circle' }
      },
      {
        path: 'series/add',
        component: () => import('@/views/games/Series/AddSeries'),
        name: 'AddSeries',
        hidden: true,
        meta: { title: '游戏系列管理', noCache: true, icon: 'circle' }
      },
      {
        path: 'define',
        component: () => import('@/views/games/Define'),
        name: 'Define',
        meta: { title: '内容分类', noCache: true, icon: 'circle' }
      },
      {
        path: 'define/add',
        component: () => import('@/views/games/Define/AddDefine'),
        name: 'AddDefine',
        hidden: true,
        meta: { title: '内容分类', noCache: true, icon: 'circle' }
      },
    ]
  },
]

export default gameRouter