<script setup lang="ts">
import { useRouter } from 'vue-router'
import Button from '../kit/Button.vue'
const router = useRouter()
</script>

<template>
  <div class="container">
    <h1>This page doesn't exist</h1>
    <Button @click="router.push({ name: 'blogs' })">See our blogs</Button>
  </div>
</template>

<style lang="scss" scoped>
.container {
  max-width: 700px;
  text-align: center;
  margin: auto;

  h1 {
    margin-bottom: 20px;
  }
}
</style>
