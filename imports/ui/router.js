import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import UserEdit from './views/UserEdit.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: App
    },
    {
      path: '/user/edit',
      component: UserEdit
    }
  ]
})