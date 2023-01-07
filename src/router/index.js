import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'
import Student from '../components/Student.vue'

const routes = [
  {
    path: '/',
    component: Login
  },
  {
    path: '/student/:login',
    component: Student
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
