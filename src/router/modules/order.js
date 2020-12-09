import Layout from '@/layout'

const orderRouter = [
  {
    path: '/order',
    component: Layout,
    redirect: '/order/search',
    hidden: false,
    meta: { title: '订单管理', icon: 'order-list' },
    children: [
      {
        path: 'search',
        component: () => import('@/views/order/Search'),
        name: 'Search',
        meta: { title: '查询', noCache: true, icon: 'circle' },
      },
      {
        path: 'shipments',
        component: () => import('@/views/order/Shipments'),
        name: 'Shipments',
        meta: { title: '发货', noCache: true, icon: 'circle' },
      },
      {
        path: 'qualityTesting',
        component: () => import('@/views/order/QualityTesting'),
        name: 'QualityTesting',
        meta: { title: '归还质检', noCache: true, icon: 'circle' },
      },
      {
        path: 'afterSale',
        component: () => import('@/views/order/AfterSale'),
        name: 'AfterSale',
        meta: { title: '售后', noCache: true, icon: 'circle' },
      },
      {
        path: 'detail/:id',
        component: () => import('@/views/order/Detail'),
        name: 'OrderDetail',
        hidden: true,
        meta: { title: '订单详情', noCache: true, icon: 'circle' },
      }
    ]
  },
  {
    path: '/clients',
    component: Layout,
    redirect: 'search',
    hidden: false,
    meta: { title: '客户', icon: 'user' },
    children: [
      {
        path: 'search',
        component: () => import('@/views/clients/Search'),
        name: 'ClientsSearch',
        meta: { title: '查询', noCache: true, icon: 'circle' },
      },
      {
        path: 'openCardRecords',
        component: () => import('@/views/clients/OpenCardRecords'),
        name: 'OpenCardRecords',
        meta: { title: '开卡记录', noCache: true, icon: 'circle' },
      },
      {
        path: 'detail/:id',
        component: () => import('@/views/clients/Detail'),
        name: 'ClientsDetail',
        hidden: true,
        meta: { title: '客户详情', noCache: true, icon: 'circle' },
      },
    ]
  },
]

export default orderRouter