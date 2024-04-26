import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BlogsView from '../views/BlogsView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ResetPasswordView from '../views/ResetPasswordView.vue'
import ProfileView from '../views/ProfileView.vue'
import CreatePostView from '../views/CreatePostView.vue'
import PostPreview from '../views/PostPreview.vue'
import PostView from '../views/PostView.vue'
import EditView from '../views/EditView.vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Home',
        requiresAuth: false
      }
    },
    {
      path: '/blogs',
      name: 'blogs',
      component: BlogsView,
      meta: {
        title: 'Blogs',
        requiresAuth: false
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        title: 'Login',
        requiresAuth: false
      }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: {
        title: 'Registration',
        requiresAuth: false
      }
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      component: ResetPasswordView,
      meta: {
        title: 'Reset Password',
        requiresAuth: false
      }
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      meta: {
        title: 'Profile',
        requiresAuth: true
      }
    },
    {
      path: '/create-post',
      name: 'create-post',
      component: CreatePostView,
      meta: {
        title: 'Create Post',
        requiresAuth: true
      }
    },
    {
      path: '/preview',
      name: 'preview',
      component: PostPreview,
      meta: {
        title: 'Post Preview',
        requiresAuth: true
      }
    },
    {
      path: '/view-post/:postId',
      name: 'view-post',
      component: PostView,
      meta: {
        title: 'Post',
        requiresAuth: false
      }
    },
    {
      path: '/edit-post/:postId',
      name: 'edit-post',
      component: EditView,
      meta: {
        title: 'Edit Post',
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, _, next) => {
  document.title = `${to.meta.title} | MyBlog`
  next()
})

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        resolve(user)
      } else {
        reject('Undefined')
      }
    })
  })
}

router.beforeEach(async (to, _, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    await getCurrentUser()
      .then(() => next())
      .catch(() => next('/login'))
  } else {
    next()
  }
})

export default router
