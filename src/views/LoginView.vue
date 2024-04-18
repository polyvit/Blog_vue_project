<script setup lang="ts">
import type { IAuthLayoutProps } from '../types'
import AuthLayout from '../components/AuthLayout.vue'
import IconEnvelope from '../components/icons/IconEnvelope.vue'
import IconLock from '../components/icons/IconLock.vue'
import { reactive, ref } from 'vue'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'

const router = useRouter()

const data: IAuthLayoutProps = {
  title: 'Login to Our Blog',
  linkTitle: "Don't have an account?",
  route: 'register'
}
const error = ref<boolean | null>(null)
const errorMsg = ref<string>('')

const formData = reactive<{
  email: string
  password: string
}>({
  email: '',
  password: ''
})

const login = () => {
  if (formData.email !== '' && formData.password !== '') {
    error.value = false
    errorMsg.value = ''
    const auth = getAuth()
    const res = signInWithEmailAndPassword(auth, formData.email, formData.password)
    res
      .then(() => {
        router.push({ name: 'home' })
        error.value = false
        errorMsg.value = ''
        console.log('auth', auth.currentUser?.uid)
      })
      .catch((err) => {
        console.log('err', err)
        error.value = true
        errorMsg.value = err.message
      })
    return
  }
  error.value = true
  errorMsg.value = 'Please fill out all the fields!'
  return
}
</script>

<template>
  <AuthLayout :data="data">
    <div class="inputs">
      <div class="input">
        <input type="text" placeholder="Email" v-model="formData.email" />
        <IconEnvelope class="icon" />
      </div>
      <div class="input">
        <input type="password" placeholder="Password" v-model="formData.password" />
        <IconLock class="icon" />
      </div>
      <div v-show="error" class="error">{{ errorMsg }}</div>
    </div>
    <RouterLink class="forgot-password" :to="{ name: 'reset-password' }"
      >Forgot your password?</RouterLink
    >
    <button @click.prevent="login">Sign In</button>
  </AuthLayout>
</template>

<style lang="scss">
.inputs {
  width: 100%;
  max-width: 350px;

  .input {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 8px;
    input {
      width: 100%;
      border: none;
      background-color: #f2f7f6;
      padding: 4px 4px 4px 30px;
      height: 50px;

      &:focus {
        outline: none;
      }
    }

    .icon {
      width: 12px;
      position: absolute;
      left: 6px;
    }
  }
}
</style>
