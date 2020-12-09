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
