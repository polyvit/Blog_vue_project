<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useBlogStore } from '../stores/BlogStore'
import PostLayout from '../components/PostLayout.vue'
import { useRoute } from 'vue-router'
import type { IBlogPost } from '../types'

const {
  blog: { blogPosts }
} = useBlogStore()

const route = useRoute()

const currentBlog = ref<IBlogPost[]>([])
const routeId = ref('')

onMounted(() => {
  routeId.value = route.params.postId as string
  currentBlog.value = blogPosts.filter((post) => {
    return post.blogId === routeId.value
  })
})
</script>

<template>
  <PostLayout v-show="currentBlog[0]" :blog="currentBlog[0]">
    <h4>
      Posted on: {{ new Date(currentBlog[0]?.date).toLocaleString('en-us', { dateStyle: 'long' }) }}
    </h4>
  </PostLayout>
</template>

<style lang="scss" scoped>
h4 {
  font-weight: 400;
  font-size: 14px;
  margin-bottom: 24px;
}
</style>
