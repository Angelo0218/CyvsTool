
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { name: '首頁', path: '/', component: () => import('@/pages/Home.vue') },
  { name: '首頁2', path: '/2', component: () => import('@/pages/Home2.0.vue') },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
