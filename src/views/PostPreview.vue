<script setup lang="ts">
import { computed } from 'vue'
import { useBlogStore } from '../stores/BlogStore'

const blogStore = useBlogStore()

const blog = computed(() => {
  return blogStore.blog
})
</script>

<template>
  <div class="post-view">
    <div class="container quillWrapper">
      <h2>{{ blog.blogTitle }}</h2>
      <img :src="blog.blogPhotoFileURL" alt="cover-photo" />
      <div class="post-content ql-editor" v-html="blog.blogHTML"></div>
    </div>
  </div>
</template>

<style lang="scss">
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
