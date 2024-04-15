import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore, serverTimestamp } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: 'blog-vue-e7fd6',
  storageBucket: 'blog-vue-e7fd6.appspot.com',
  messagingSenderId: '832830323546',
  appId: '1:832830323546:web:2ca76456744201d6335163'
}

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const timestamp = serverTimestamp()
