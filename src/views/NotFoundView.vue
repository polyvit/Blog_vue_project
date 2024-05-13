<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
  <div class="container">
    <h1>This page doesn't exist</h1>
    <button @click="router.push({ name: 'blogs' })">See our blogs</button>
  </div>
</template>

<style lang="scss" scoped>
.container {
  max-width: 700px;
  text-align: center;
  margin: auto;
}
</style>
