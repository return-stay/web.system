import Layout from '@/layout'

const operationRouter = [
  {
    path: '/yunying',
    meta: { title: '运营' },
    disabled: true
  },
  {
    path: '/operation/channel',
    component: Layout,
    meta: { title: '管理后台', icon: 'operation-cd' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/operation/Channel'),
        name: 'OperationChannel',
        meta: { title: '渠道管理', noCache: true, icon: 'channel' },
      },
      {
        path: 'add',
        component: () => import('@/views/operation/Channel/AddChannel'),
        name: 'AddChannel',
        hidden: true,
        meta: { title: '添加渠道', noCache: true, icon: 'channel' },
      },
    ]
  },
  {
    path: '/operation/location',
    component: Layout,
    meta: { title: '管理后台', icon: 'operation-cd' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/operation/ImagesLocation'),
        name: 'ImagesLocation',
        meta: { title: '图片位管理', noCache: true, icon: 'imagesLocation' },
      },
      {
        path: 'add',
        component: () => import('@/views/operation/ImagesLocation/AddImagesLocation'),
        name: 'AddImagesLocation',
        hidden: true,
        meta: { title: '添加图片位', noCache: true, icon: 'imagesLocation' },
      },
    ]
  },
  {
    path: '/operation/subject',
    component: Layout,
    meta: { title: '管理后台', icon: 'operation-cd' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/operation/GameSubject'),
        name: 'GameSubject',
        meta: { title: '游戏专题', noCache: true, icon: 'subject' },
      },
      {
        path: 'add',
        component: () => import('@/views/operation/GameSubject/AddGameSubject'),
        name: 'AddGameSubject',
        hidden: true,
        meta: { title: '添加专题', noCache: true, icon: 'subject' },
      },
    ]
  },
  {
    path: '/shezhi',
    meta: { title: '设置' },
    disabled: true
  },
  {
    path: '/setting/activity',
    component: Layout,
    meta: { title: '设置', icon: 'operation-cd' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/settings/Activity'),
        name: 'SettingActivity',
        meta: { title: '全场活动设置', noCache: true, icon: 'activity' },
      },
    ]
  },
  {
    path: '/setting/switch',
    component: Layout,
    meta: { title: '设置', icon: 'operation-cd' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/settings/Switch'),
        name: 'SettingSwitch',
        meta: { title: '控制开关', noCache: true, icon: 'switch' },
      },
    ]
  },
]

export default operationRouter