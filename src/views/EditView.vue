<script setup lang="ts">
import { onBeforeRouteLeave, useRoute } from 'vue-router'
import { useBlogStore } from '../stores/BlogStore'
import { onMounted, ref } from 'vue'
import CreatePostView from './CreatePostView.vue'
import type { IBlogPost } from '../types'

const {
  blog: { blogPosts },
  setBlogState,
  resetData,
  getPostsFromDb
} = useBlogStore()

const route = useRoute()

const currentBlog = ref<IBlogPost[]>([])
const routeId = ref('')

onMounted(async () => {
  routeId.value = route.params.postId as string
  await getPostsFromDb()
  if (!Boolean(route.query.afterPreview)) {
    currentBlog.value = blogPosts.filter((post) => {
      return post.blogId === routeId.value
    })
    setBlogState(currentBlog.value[0])
  }
})

onBeforeRouteLeave((to, _, next) => {
  if (to.name !== 'preview') resetData()
  next()
})
</script>

<template>
  <CreatePostView editing :routeId="routeId" />
</template>
