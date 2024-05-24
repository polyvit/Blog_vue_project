<script setup lang="ts">
import { computed } from 'vue'
import BlogCard from '../components/BlogCard.vue'
import Banner from '../components/Banner.vue'
import Loader from '../components/Loader.vue'
import { useUserStore } from '../stores/UserStore'
import { useBlogStore } from '../stores/BlogStore'
import type { IBlogPost } from '../types'

const blogStore = useBlogStore()
const authUser = computed(() => useUserStore().user)

const blogPostsCards = computed(() => {
  const sortedArray = JSON.parse(JSON.stringify(blogStore.blog.blogPosts))
  sortedArray.sort((a: IBlogPost, b: IBlogPost) => Number(b.date) - Number(a.date))
  return sortedArray.slice(0, 4)
})
</script>

<template>
  <div v-if="blogStore.blog.blogPosts.length" class="home">
    <Banner />
    <div class="blog-card-wrap">
      <div class="container">
        <div class="top">
          <h3>View More Recent Blogs</h3>
          <RouterLink class="link" :to="{ name: 'blogs' }">See all</RouterLink>
        </div>
        <div class="blog-cards">
          <BlogCard :post="post" v-for="(post, index) in blogPostsCards" :key="index" />
        </div>
      </div>
    </div>
  </div>
  <Loader v-else />
</template>

<style lang="scss" scoped>
.blog-card-wrap {
  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 32px;
    h3 {
      font-weight: bold;
      font-size: 24px;
    }
  }
}
</style>
