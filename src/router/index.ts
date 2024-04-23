import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BlogsView from '../views/BlogsView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ResetPasswordView from '../views/ResetPasswordView.vue'
import ProfileView from '../views/ProfileView.vue'
import CreatePostView from '../views/CreatePostView.vue'
import PostPreview from '../views/PostPreview.vue'

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
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        title: 'Login'
      }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: {
        title: 'Registration'
      }
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      component: ResetPasswordView,
      meta: {
        title: 'Reset Password'
      }
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      meta: {
        title: 'Profile'
      }
    },
    {
      path: '/create-post',
      name: 'create-post',
      component: CreatePostView,
      meta: {
        title: 'Create Post'
      }
    },
    {
      path: '/preview',
      name: 'preview',
      component: PostPreview,
      meta: {
        title: 'Post Preview'
      }
    }
  ]
})

router.beforeEach((to, _, next) => {
  document.title = `${to.meta.title} | MyBlog`
  next()
})

export default router
