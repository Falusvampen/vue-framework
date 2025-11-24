import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Ingredienser from '../components/Ingredienser.vue'

import getComponentsFromViewsFiles from './autoRouter'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/ingredienser',
      name: 'ingredienser',
      component:Ingredienser,
    }
    
  ]
})

export default router
