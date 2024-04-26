<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useBlogStore } from '../stores/BlogStore'
import { onMounted, ref, watch } from 'vue'
import CreatePostView from './CreatePostView.vue'
import type { IBlogPost } from '../types'

const {
  blog: { blogPosts },
  setBlogState
} = useBlogStore()

const route = useRoute()

const currentBlog = ref<IBlogPost[]>([])
const routeId = ref('')

onMounted(() => {
  routeId.value = route.params.postId as string
  currentBlog.value = blogPosts.filter((post) => {
    return post.blogId === routeId.value
  })
  setBlogState(currentBlog.value[0])
})
</script>

<template>
  <CreatePostView editing :routeId="routeId" />
</template>
