import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/home/Home.vue'),
    meta: { title: '味觉餐厅 - 首页' }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/auth/Login.vue'),
    meta: { title: '味觉餐厅 - 登录' }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/auth/Register.vue'),
    meta: { title: '味觉餐厅 - 注册' }
  },
  {
    path: '/reservation',
    name: 'Reservation',
    component: () => import('../views/reservation/Reservation.vue'),
    meta: { title: '味觉餐厅 - 预约', requiresAuth: true }
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: () => import('../views/auth/ForgotPassword.vue'),
    meta: { title: '味觉餐厅 - 忘记密码' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫，用于保护需要登录的页面
router.beforeEach((to, from, next) => {
  // 更新页面标题
  document.title = to.meta.title || '味觉餐厅预约系统'
  
  // 检查是否需要登录
  const isAuthenticated = localStorage.getItem('user') !== null
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    // 如果需要登录但用户未登录，重定向到登录页
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router