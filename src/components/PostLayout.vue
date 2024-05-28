<script setup lang="ts">
import type { IBlog, IBlogPost } from '../types'
import { useRoute, useRouter } from 'vue-router'
import { computed, defineProps } from 'vue'
import Loader from './Loader.vue'
import Button from '../kit/Button.vue'

const route = useRoute()
const router = useRouter()

const preview = computed(() => {
  return route.name == 'view-post'
})

const comeBack = () => {
  router.go(-1)
}

defineProps<{
  blog: Partial<IBlogPost & IBlog>
}>()
</script>

<template>
  <div class="post-view" v-if="blog">
    <div class="container quillWrapper">
      <img :src="blog?.blogPhotoFileURL ?? blog?.blogCoverPhoto" alt="cover-photo" />
      <h2>{{ blog?.blogTitle }}</h2>
      <slot></slot>
      <div class="post-content ql-editor" v-html="blog?.blogHTML"></div>
      <Button v-show="!preview" @click="comeBack">Come back</Button>
    </div>
  </div>
  <Loader v-else />
</template>

<style lang="scss" scoped>
.post-view {
  min-height: 100%;

  .container {
    max-width: 1000px;
    padding: 60px 25px;
  }

  .ql-editor {
    padding: 0;
  }

  h2 {
    margin-bottom: 16px;
    font-weight: bold;
    font-size: 32px;
  }

  img {
    width: 100%;
    margin-bottom: 32px;
  }
}
</style>
