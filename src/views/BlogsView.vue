<script setup lang="ts">
import BlogCard from '../components/BlogCard.vue'
import { computed } from 'vue'
import { usePostsStore } from '../stores/PostsStore'
import { onBeforeUnmount } from 'vue'
import { useBlogStore } from '../stores/BlogStore'

const postsStore = usePostsStore()
const blogStore = useBlogStore()
// const sampleBlogCards = computed(() => {
//   return postsStore.sampleBlogCards
// })
const blogPostsCards = computed(() => {
  return blogStore.blog.blogPosts
})

const editPost = computed({
  get() {
    return postsStore.editPost
  },
  set(newValue) {
    postsStore.toggleEditPost(newValue)
  }
})

onBeforeUnmount(() => {
  postsStore.toggleEditPost(false)
})
</script>

<template>
  <div class="blog-card-wrap">
    <div class="blog-cards container">
      <div class="toggle-edit">
        <span>Toggle to edit posts</span>
        <input type="checkbox" v-model="editPost" />
      </div>
      <BlogCard :post="post" v-for="(post, index) in blogPostsCards" :key="index" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.blog-cards {
  position: relative;

  .toggle-edit {
    display: flex;
    align-items: center;
    position: absolute;
    top: -70px;
    right: 0;

    span {
      margin-right: 16px;
    }

    input[type='checkbox'] {
      position: relative;
      border: none;
      -webkit-appearance: none;
      appearance: none;
      background: #fff;
      outline: none;
      width: 80px;
      height: 30px;
      border-radius: 20px;
      box-shadow:
        0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }

    input[type='checkbox']:before {
      content: '';
      position: absolute;
      width: 30px;
      height: 30px;
      border-radius: 20px;
      top: 0;
      left: 0;
      background: #303030;
      transform: scale(1.1);
      transition: 750ms ease all;
      box-shadow:
        0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }

    input:checked[type='checkbox']:before {
      background: #fff;
      left: 52px;
    }
  }
}
</style>
