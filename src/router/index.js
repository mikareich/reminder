import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      icon: 'home',
      requiresAuth: true
    }
  },
  {
    path: '/new',
    name: 'New Note',
    component: () => import('@/views/New.vue'),
    meta: {
      icon: 'edit',
      requiresAuth: true
    }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('@/views/Settings'),
    meta: {
      icon: 'settings',
      requiresAuth: true
    }
  },
  {
    path: '/signIn',
    name: 'signIn',
    component: () => import('@/views/SignIn'),
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/signUp',
    name: 'signUp',
    component: () => import('@/views/SignUp.vue'),
    meta: {
      requiresAuth: false
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
