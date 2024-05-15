<script setup lang="ts">
import type { IBlogPost } from '../types'
import { computed, defineProps } from 'vue'
import { useRouter } from 'vue-router'
import Button from '../kit/Button.vue'
import BlogDetails from './BlogDetails.vue'
import IconEdit from './icons/IconEdit.vue'
import IconDelete from './icons/IconDelete.vue'
import { useBlogStore } from '../stores/BlogStore'
import { usePostsStore } from '../stores/PostsStore'

const router = useRouter()
const blogStore = useBlogStore()
const postsStore = usePostsStore()

const props = defineProps<{
  post: IBlogPost
}>()
const goToPost = () => {
  router.push({ name: 'view-post', params: { postId: props.post.blogId } })
}

const editPost = computed(() => {
  return postsStore.editPost
})

const deletePostHandler = () => {
  blogStore.deletePost(props.post.blogId)
}
const editPostHandler = () => {
  router.push({ name: 'edit-post', params: { postId: props.post.blogId } })
}
</script>

<template>
  <div class="wrapper">
    <div v-show="editPost" class="icons">
      <div @click.stop="editPostHandler" class="icon">
        <IconEdit class="edit" />
      </div>
      <div @click.stop="deletePostHandler" class="icon">
        <IconDelete class="delete" />
      </div>
    </div>
    <img :src="post.blogCoverPhoto" alt="photo" />
    <div class="info">
      <div>
        <h4>{{ post.blogTitle }}</h4>
        <BlogDetails :date="post.date" />
      </div>
      <Button @click="goToPost" color="red">Read full article</Button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$light-gray-color: #f4f0f8;
$dark-color: #232536;

.wrapper {
  position: relative;
  display: flex;
  gap: 20px;
  height: 250px;
  width: 70vw;
  margin: 0 auto;
  margin-bottom: 40px;
  background-color: $light-gray-color;
  border-radius: 10px;

  &:hover {
    transform: scale(1.05);
    box-shadow:
      0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  .icons {
    display: flex;
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 199;

    .icon {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 35px;
      height: 35px;
      border-radius: 50%;
      background-color: $dark-color;
      transition: 0.5s ease all;

      &:hover {
        transform: scale(1.2);
      }

      &:nth-child(1) {
        margin-right: 8px;
      }

      .edit,
      .delete {
        pointer-events: none;
        height: 15px;
        width: 15px;
      }
    }
  }

  img {
    width: 380px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }
  .info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px 0;

    h4 {
      margin-bottom: 25px;
    }
  }
}
</style>
