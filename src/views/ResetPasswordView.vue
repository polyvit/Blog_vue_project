<script setup lang="ts">
import type { IAuthLayoutProps } from '../types'
import AuthLayout from '../components/AuthLayout.vue'
import Modal from '../components/Modal.vue'
import Loader from '../components/Loader.vue'
import IconEnvelope from '../components/icons/IconEnvelope.vue'
import { ref } from 'vue'

const data: IAuthLayoutProps = {
  title: 'Reset Password',
  linkTitle: 'Back to Login',
  route: 'login'
}

const modalMessage = ref<string>('')
const modalActive = ref<boolean>(false)
const email = ref<string>('')
const loading = ref<boolean | null>(null)

const closeModal = () => {
  modalActive.value = !modalActive.value
  email.value = ''
}
</script>

<template>
  <Modal v-if="modalActive" :modalMessage="modalMessage" @close-modal="closeModal" />
  <Loader v-if="loading" />
  <div class="reset-password">
    <AuthLayout :data="data">
      <template v-slot:reset>
        <p>Forgot your password? Enter your email to reset it</p>
      </template>
      <div class="inputs">
        <div class="input">
          <input type="text" placeholder="Email" v-model="email" />
          <IconEnvelope class="icon" />
        </div>
      </div>
      <button>Reset</button>
    </AuthLayout>
  </div>
</template>

<style lang="scss" scoped>
p {
  text-align: center;
  margin-bottom: 32px;
}
</style>
