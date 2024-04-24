<script setup lang="ts">
import { reactive, computed } from 'vue'
import BlogPost from '../components/BlogPost.vue'
import BlogCard from '../components/BlogCard.vue'
import Updates from '../components/Updates.vue'
import { useUserStore } from '../stores/UserStore'
import { useBlogStore } from '../stores/BlogStore'

const blogStore = useBlogStore()
const authUser = computed(() => useUserStore().user)

const welcomeScreen = reactive({
  blogTitle: 'Welcome!',
  blogHTML:
    'Weekly blog articles with all things programming including HTML, CSS, JavaScript and more. Register today to never miss a post!',
  welcomeScreen: true,
  blogCoverPhoto: 'coding',
  blogCoverPhotoName: 'coding',
  blogId: '',
  date: new Date()
})
// const sampleBlogPost = reactive([
//   {
//     title: 'This is a filler title',
//     blogHTML: 'This is a filler blog post title',
//     blogCoverPhoto: 'beautiful-stories'
//   },
//   {
//     title: 'This is a filler title',
//     blogHTML: 'This is a filler blog post title',
//     blogCoverPhoto: 'designed-for-everyone'
//   }
// ])
const blogPostsFeed = computed(() => {
  return blogStore.blog.blogPosts.slice(0, 2)
})

const blogPostsCards = computed(() => {
  return blogStore.blog.blogPosts.slice(2, 6)
})
</script>

<template>
  <div class="home">
    <BlogPost v-if="!authUser" :post="welcomeScreen" />
    <BlogPost :post="post" v-for="(post, index) in blogPostsFeed" :key="index" />
    <div class="blog-card-wrap">
      <div class="container">
        <h3>View More Recent Blogs</h3>
        <div class="blog-cards">
          <BlogCard :post="post" v-for="(post, index) in blogPostsCards" :key="index" />
        </div>
      </div>
    </div>
    <Updates v-if="!authUser" />
  </div>
</template>

<style lang="scss" scoped>
.blog-card-wrap {
  h3 {
    font-weight: 300;
    font-size: 28px;
    margin-bottom: 32px;
  }
}
</style>
