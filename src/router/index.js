
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { name: '首頁', path: '/', component: () => import('@/pages/Home.vue') },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
