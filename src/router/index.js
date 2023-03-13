import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AddTask from '../views/AddTask.vue'
import EditTask from '../views/EditTask.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/tasks',
    redirect: '/'
  },
  {
    path: '/task/add',
    name: 'add-task',
    component: AddTask
  },
  {
    path: '/task/:id/edit',
    name: 'edit-task',
    component: EditTask,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
