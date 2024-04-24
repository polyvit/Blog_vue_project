<script setup lang="ts">
import { computed } from 'vue'
import { useBlogStore } from '../stores/BlogStore'
import PostLayout from '../components/PostLayout.vue'

const blogStore = useBlogStore()

const blog = computed(() => {
  return blogStore.blog
})
</script>

<template>
  <PostLayout :blog="blog"></PostLayout>
</template>
