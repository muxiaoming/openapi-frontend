export default [
  //每次新加页面都要新加路由
  { path: '/', name: '主页', icon: 'smile', component: './Index' },
  //可以接收一个动态参数,跳到对应的接口页面
  //hideInMenu: true 不需要放到菜单(侧边栏)中
  { path: '/interface_info/:id', name: '查看接口', icon: 'smile', component: './InterfaceInfo', hideInMenu: true },
  {
    path: '/user',
    layout: false,
    routes: [{ name: '登录', path: '/user/login', component: './User/Login' }],
  },
  // { path: '/welcome', name: '欢迎', icon: 'smile', component: './Index' },
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      //{ path: '/admin', redirect: '/admin/sub-page' },
      //{ path: '/admin/sub-page', name: '二级管理页', component: './Admin' },
      {
        name: '接口管理',
        icon: 'table',
        path: '/admin/interface_info',
        component: './Admin/InterfaceInfo',
      },
      {
        name: '接口分析',
        icon: 'analysis',
        path: '/admin/interface_analysis',
        component: './Admin/InterfaceAnalysis',
      },
    ],
  },
  //{ path: '/welcome', redirect: '/' },
  { path: '*', layout: false, component: './404' },
];
