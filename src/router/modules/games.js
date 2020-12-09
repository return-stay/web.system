import Layout from '@/layout'

const chartsRouter = [
  // {
  //   path: '/ceshi-table',
  //   component: Layout,
  //   redirect: 'index',
  //   hidden: false,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/ceshi-table/index'),
  //       name: 'CeshiTable',
  //       meta: { title: '测试列表', icon: 'tabulate', noCache: true }
  //     }
  //   ]
  // },
  {
    path: '/tabulateData',
    component: Layout,
    redirect: 'index',
    hidden: false,
    children: [
      {
        path: 'index',
        component: () => import('@/views/tabulate-data/index'),
        name: 'Single',
        meta: { title: '汇总数据', icon: 'tabulate', noCache: true }
      }
    ]
  },
  {
    path: '/wholeData',
    component: Layout,
    redirect: '/wholeData/month',
    hidden: false,
    meta: { title: '整体数据', icon: 'dashboard' },
    children: [
      {
        path: 'month',
        component: () => import('@/views/whole-data/month'),
        name: 'MonthData',
        meta: { title: '本月数据', noCache: true },
      },
      {
        path: 'quarter',
        component: () => import('@/views/whole-data/quarter'),
        name: 'QuarterData',
        meta: { title: '本季度数据', noCache: true },
      },
      {
        path: 'year',
        component: () => import('@/views/whole-data/year'),
        name: 'YearData',
        meta: { title: '本年度数据', noCache: true },
      }
    ]
  },
  {
    path: '/业务汇总',
    meta: { title: '业务汇总' },
    hidden: false,
    disabled: true
  },
  {
    path: '/depositSummary',
    component: Layout,
    hidden: false,
    children: [
      {
        path: 'index',
        component: () => import('@/views/deposit-summary/index'),
        name: 'DepositSummary',
        meta: { title: '押金', icon: 'deposit', noCache: true }
      }
    ]
  },
  {
    path: '/couponSummary',
    component: Layout,
    hidden: false,
    children: [
      {
        path: 'index',
        component: () => import('@/views/coupon-summary/index'),
        // component: () => import('@/views/deposit-summary/index'),
        name: 'CouponSummary',
        meta: { title: '优惠', icon: 'common', noCache: true }
      }
    ]
  },
  {
    path: '/vipSummary',
    component: Layout,
    hidden: false,
    children: [
      {
        path: 'index',
        component: () => import('@/views/vip-summary/index'),
        // component: () => import('@/views/deposit-summary/index'),
        name: 'VipSummary',
        meta: { title: '会员卡', icon: 'vip', noCache: true }
      }
    ]
  },
  {
    path: '/danxiang',
    meta: { title: '单项统计' },
    disabled: true
  },
  {
    path: '/gameSummary',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/game-summary/GameList'),
        name: 'GameList',
        meta: { title: '游戏汇总', icon: 'game', noCache: true },
      },
      {
        path: 'wii',
        component: () => import('@/views/game-summary/index'),
        name: 'GameSummary',
        meta: { title: '游戏盘汇总', icon: 'game', noCache: true },
        hidden: true,
      },
      {
        path: 'aSingleGame/:id',
        component: () => import('@/views/game-summary/ASingleGame'),
        name: 'ASingleGame',
        meta: { title: '游戏盘', icon: 'game', noCache: true},
        hidden: true,
      },
      {
        path: 'singleGame/:id',
        component: () => import('@/views/game-summary/SingleGame'),
        name: 'SingleGame',
        meta: { title: '游戏', icon: 'game', noCache: true},
        hidden: true,
      }
    ]
  },
  {
    path: '/userSummary',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/user-summary/index'),
        name: 'UserSummary',
        meta: { title: '用户汇总', icon: 'user', noCache: true }
      }
    ]
  },
  {
    path: '/incomeSummary',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/income-summary/index'),
        name: 'IncomeSummary',
        meta: { title: '收入汇总', icon: 'income', noCache: true }
      }
    ]
  },
  // {
  //   path: '/trench',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/trench-list/index'),
  //       name: 'IncomeSummary',
  //       meta: { title: '渠道列表', icon: 'trench', noCache: true }
  //     }
  //   ]
  // }
  {
    path: '/page-top',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/page-top/index'),
        name: 'PageTop',
        meta: { title: '访问界面汇总', icon: 'interface', noCache: true },
      }
    ]
  },
  {
    path: '/interfaceSummary',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/interface-summary/index'),
        name: 'InterfaceSummary',
        meta: { title: '访问界面汇总', icon: 'interface', noCache: true },
      }
    ]
  },
]

export default chartsRouter
