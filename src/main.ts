import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { getAuth, onAuthStateChanged } from 'firebase/auth'

const auth = getAuth()
onAuthStateChanged(auth, () => {
  const app = createApp(App)
  const pinia = createPinia()
  app.use(pinia)
  app.use(router)
  app.mount('#app')
})
