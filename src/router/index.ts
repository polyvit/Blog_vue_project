import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BlogsView from '@/views/BlogsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Home'
      }
    },
    {
      path: '/blogs',
      name: 'blogs',
      component: BlogsView,
      meta: {
        title: 'Blogs'
      }
    }
  ]
})

router.beforeEach((to, _, next) => {
  document.title = `${to.meta.title} | MyBlog`
  next()
})

export default router
