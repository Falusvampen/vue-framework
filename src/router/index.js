import { createRouter, createWebHistory } from 'vue-router'
import getComponentsFromViewsFiles from './autoRouter'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: getComponentsFromViewsFiles(),
  scrollBehavior() {
    return { top: 0 }
  }

})

export default router
