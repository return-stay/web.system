import Layout from '@/layout'

const orderRouter = [
  {
    path: '/order',
    component: Layout,
    redirect: '/order/search',
    hidden: false,
    meta: { title: '订单管理', icon: 'order' },
    children: [
      {
        path: 'search',
        component: () => import('@/views/order/Search'),
        name: 'Search',
        meta: { title: '查询', noCache: true },
      },
      {
        path: 'shipments',
        component: () => import('@/views/order/Shipments'),
        name: 'Shipments',
        meta: { title: '发货', noCache: true },
      },
      {
        path: 'qualityTesting',
        component: () => import('@/views/order/QualityTesting'),
        name: 'QualityTesting',
        meta: { title: '归还质检', noCache: true },
      },
      {
        path: 'afterSale',
        component: () => import('@/views/order/AfterSale'),
        name: 'AfterSale',
        meta: { title: '售后', noCache: true },
      },
      {
        path: 'detail/:id',
        component: () => import('@/views/order/Detail'),
        name: 'OrderDetail',
        hidden: true,
        meta: { title: '订单详情', noCache: true },
      }
    ]
  },
  {
    path: '/clients',
    component: Layout,
    redirect: 'search',
    hidden: false,
    meta: { title: '客户', icon: 'order' },
    children: [
      {
        path: 'search',
        component: () => import('@/views/clients/Search'),
        name: 'ClientsSearch',
        meta: { title: '查询', noCache: true },
      },
      {
        path: 'openCardRecords',
        component: () => import('@/views/clients/OpenCardRecords'),
        name: 'OpenCardRecords',
        meta: { title: '开卡记录', noCache: true },
      },
      {
        path: 'detail/:id',
        component: () => import('@/views/clients/Detail'),
        name: 'ClientsDetail',
        hidden: true,
        meta: { title: '客户详情', noCache: true },
      },
    ]
  },
]

export default orderRouter