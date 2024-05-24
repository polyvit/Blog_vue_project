<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useBlogStore } from '../stores/BlogStore'
import PostLayout from '../components/PostLayout.vue'
import BlogDetails from '../components/BlogDetails.vue'
import { useRoute } from 'vue-router'
import type { IBlogPost } from '../types'

const {
  blog: { blogPosts },
  getPostsFromDb
} = useBlogStore()

const route = useRoute()

const currentBlog = ref<IBlogPost[]>([])
const routeId = ref('')

onMounted(async () => {
  routeId.value = route.params.postId as string
  await getPostsFromDb()
  currentBlog.value = blogPosts.filter((post) => {
    return post.blogId === routeId.value
  })
})
</script>

<template>
  <PostLayout v-show="currentBlog[0]" :blog="currentBlog[0]">
    <BlogDetails
      :date="currentBlog[0]?.date"
      :initials="currentBlog[0]?.authorInitials"
      :firstName="currentBlog[0]?.authorFirstName"
      :lastName="currentBlog[0]?.authorLastName"
      class="details"
    />
  </PostLayout>
</template>

<style lang="scss" scoped>
.details {
  margin-bottom: 20px;
}
</style>
