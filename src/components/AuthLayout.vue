<script setup lang="ts">
import { defineProps } from 'vue'
import type { IAuthLayoutProps } from '../types'

defineProps<{
  data: IAuthLayoutProps
}>()
</script>

<template>
  <div class="form-wrap">
    <form>
      <p class="login-register">
        {{ data.linkTitle }}
        <RouterLink class="router-link" :to="{ name: `${data.route}` }">Click here</RouterLink>
      </p>
      <h2>{{ data.title }}</h2>
      <slot name="reset"></slot>
      <slot></slot>
      <div class="angle"></div>
    </form>
    <div class="background"></div>
  </div>
</template>

<style lang="scss" scoped>
.form-wrap {
  overflow: hidden;
  display: flex;
  height: 100vh;
  justify-content: center;
  align-self: center;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 900px) {
    width: 100%;
  }

  .login-register {
    margin-bottom: 32px;

    .router-link {
      color: #000;
    }
  }

  form {
    padding: 0 10px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
    @media (min-width: 900px) {
      padding: 0 50px;
    }

    h2 {
      text-align: center;
      font-size: 32px;
      color: #303030;
      margin-bottom: 40px;
      @media (min-width: 900px) {
        font-size: 40px;
      }
    }

    .angle {
      display: none;
      position: absolute;
      background-color: #fff;
      transform: rotateZ(3deg);
      width: 60px;
      right: -30px;
      height: 101%;
      @media (min-width: 900px) {
        display: initial;
      }
    }
  }

  .background {
    display: none;
    flex: 2;
    background-size: cover;
    background-image: url('../assets/background.png');
    width: 100%;
    height: 100%;
    @media (min-width: 900px) {
      display: initial;
    }
  }
}
</style>
