<script setup lang="ts">
import type { IBlog, IBlogPost } from '../types'
import { defineProps, watch } from 'vue'

const props = defineProps<{
  blog: IBlog & IBlogPost
}>()
</script>

<template>
  <div class="post-view">
    <div class="container quillWrapper">
      <h2>{{ blog?.blogTitle }}</h2>
      <slot></slot>
      <img :src="blog?.blogPhotoFileURL ?? blog?.blogCoverPhoto" alt="cover-photo" />
      <div class="post-content ql-editor" v-html="blog?.blogHTML"></div>
    </div>
  </div>
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
    font-weight: 300;
    font-size: 32px;
  }

  img {
    width: 100%;
    margin-bottom: 32px;
  }
}
</style>
