import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TodoPage from '../views/TodoPage.vue'
import WeatherPage from '../views/WeatherPage.vue'
import UserInfo from '../views/UserInfo.vue'
import store from '../store/index' 

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/DashboardPage',
    name: 'DashboardPage',
    component: () => import('../views/DashboardPage.vue')
  },
  {
    path: '/TodoPage',
    name: 'TodoPage',
    component: TodoPage
  },
  {
    path: '/WeatherPage',
    name: 'WeatherPage',
    component: WeatherPage
  },
  {
    path: '/UserInfo',
    name: 'UserInfo',
    component: UserInfo
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path !== '/' && (!store.state.firstName || !store.state.lastName)) {
    next('/')
  } else {
    next()
  }
})

export default router
