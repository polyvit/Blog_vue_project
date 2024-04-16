<script setup lang="ts">
import { reactive } from 'vue'
import BlogPost from '../components/BlogPost.vue'

const welcomeScreen = reactive({
  title: 'Welcome!',
  blogPost:
    'Weekly blog articles with all things programming including HTML, CSS, JavaScript and more. Register today to never miss a post!',
  welcomeScreen: true,
  photo: 'coding'
})
const sampleBlogPost = reactive([
  {
    title: 'This is a filler title',
    blogHTML: 'This is a filler blog post title',
    blogCoverPhoto: 'beautiful-stories'
  },
  {
    title: 'This is a filler title',
    blogHTML: 'This is a filler blog post title',
    blogCoverPhoto: 'designed-for-everyone'
  }
])

const sampleBlogCards = reactive([
  {
    blogTitle: 'Blog Card #1',
    blogCoverPhoto: 'stock-1',
    blogDate: 'May 1, 2021'
  },
  {
    blogTitle: 'Blog Card #2',
    blogCoverPhoto: 'stock-2',
    blogDate: 'May 1, 2021'
  },
  {
    blogTitle: 'Blog Card #3',
    blogCoverPhoto: 'stock-3',
    blogDate: 'May 1, 2021'
  },
  {
    blogTitle: 'Blog Card #4',
    blogCoverPhoto: 'stock-4',
    blogDate: 'May 1, 2021'
  }
])
</script>

<template>
  <div class="home">
    <BlogPost :post="welcomeScreen" />
    <BlogPost :post="post" v-for="(post, index) in sampleBlogPost" :key="index" />
  </div>
</template>
