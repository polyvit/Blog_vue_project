<script setup lang="ts">
import type { IAuthLayoutProps } from '../types'
import AuthLayout from '../components/AuthLayout.vue'
import IconEnvelope from '../components/icons/IconEnvelope.vue'
import IconLock from '../components/icons/IconLock.vue'
import IconUserLight from '../components/icons/IconUserLight.vue'
import { reactive, ref } from 'vue'

const data: IAuthLayoutProps = {
  title: 'Create Your Blog Account',
  linkTitle: 'Already have an account?',
  route: 'login'
}

const formData = reactive<{
  firstName: string
  lastName: string
  username: string
  email: string
  password: string
}>({
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  password: ''
})
const error = ref<boolean | null>(null)
const errorMsg = ref<string>('')

const register = async () => {
  if (
    formData.email !== '' &&
    formData.password !== '' &&
    formData.firstName !== '' &&
    formData.lastName !== '' &&
    formData.username !== ''
  ) {
    error.value = false
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
        <input type="text" placeholder="First Name" v-model="formData.firstName" />
        <IconUserLight class="icon" />
      </div>
      <div class="input">
        <input type="text" placeholder="Last Name" v-model="formData.lastName" />
        <IconUserLight class="icon" />
      </div>
      <div class="input">
        <input type="text" placeholder="Username" v-model="formData.username" />
        <IconUserLight class="icon" />
      </div>
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
    <button @click.prevent="register">Sign Up</button>
  </AuthLayout>
</template>

<style lang="scss" scoped></style>
