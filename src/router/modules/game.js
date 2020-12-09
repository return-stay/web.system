import Layout from '@/layout'

const gameRouter = [
  {
    path: '/game',
    component: Layout,
    redirect: 'search',
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
        path: 'release',
        component: () => import('@/views/games/Release'),
        name: 'GameRelease',
        meta: { title: '发布游戏', noCache: true, icon: 'circle' },
      },
    ]
  },
]

export default gameRouter