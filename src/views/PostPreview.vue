<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useBlogStore } from '../stores/BlogStore'
import PostLayout from '../components/PostLayout.vue'
import { useRouter } from 'vue-router'

const blogStore = useBlogStore()
const router = useRouter()

const blog = computed(() => {
  return blogStore.blog
})

onMounted(() => {
  if (!blog.value.blogTitle.length) {
    router.push({ name: 'blogs' })
  }
})
</script>

<template>
  <PostLayout :blog="blog"></PostLayout>
</template>
