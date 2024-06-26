<script setup lang="ts">
import type { IAuthLayoutProps } from '../types'
import AuthLayout from '../components/AuthLayout.vue'
import IconEnvelope from '../components/icons/IconEnvelope.vue'
import IconLock from '../components/icons/IconLock.vue'
import { reactive, ref } from 'vue'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'
import Input from '../kit/Input.vue'
import Button from '../kit/Button.vue'

const router = useRouter()

const data: IAuthLayoutProps = {
  title: 'Login to Our Blog',
  linkTitle: "Don't have an account?",
  route: 'register'
}
const error = ref<boolean | null>(null)
const errorMsg = ref<string>('')
const isFormValid = ref<boolean>(true)

const formData = reactive<{
  email: string
  password: string
}>({
  email: '',
  password: ''
})

// const emailModel = ref('')
const emailData = ref({
  type: 'text',
  placeholder: 'email@email.com',
  label: null,
  errorMessage: null,
  pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
  minLength: 5,
  maxLength: 100
})
// const passwordModel = ref('')
const passwordData = ref({
  type: 'password',
  placeholder: 'passWORD123',
  label: null,
  errorMessage: null,
  pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/,
  minLength: 6,
  maxLength: 15
})

const validateHandler = (isValid: boolean) => {
  isFormValid.value = isValid
}

const login = () => {
  console.log('function')
  if (formData.email !== '' && formData.password !== '') {
    error.value = false
    errorMsg.value = ''
    const auth = getAuth()
    const res = signInWithEmailAndPassword(auth, formData.email, formData.password)
    res
      .then(() => {
        error.value = false
        errorMsg.value = ''
        router.push({ name: 'home' })
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
      <Input v-model="formData.email" :data="emailData" @validate="validateHandler">
        <IconEnvelope />
      </Input>
      <Input v-model="formData.password" :data="passwordData" @validate="validateHandler">
        <IconLock />
      </Input>
      <div v-show="error" class="error input_error">{{ errorMsg }}</div>
    </div>
    <RouterLink class="forgot-password" :to="{ name: 'reset-password' }"
      >Forgot your password?</RouterLink
    >
    <Button @click="login">Sign In</Button>
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

    &_error {
      display: block;
      text-align: left;
      margin-bottom: 10px;
    }

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
.forgot-password {
  margin: 15px 0px;
  color: gray;
  text-decoration: none;
  &:visited {
    color: rgba(128, 128, 128, 0.515);
  }
}
</style>
