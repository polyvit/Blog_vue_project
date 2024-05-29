<script setup lang="ts">
import BlogListItem from '../components/BlogListItem.vue'
import Loader from '../components/Loader.vue'
import Notification from '../components/Notification.vue'
import { computed, onMounted, ref } from 'vue'
import { usePostsStore } from '../stores/PostsStore'
import { onBeforeUnmount } from 'vue'
import { useBlogStore } from '../stores/BlogStore'
import { useUserStore } from '../stores/UserStore'

const postsStore = usePostsStore()
const blogStore = useBlogStore()
const authUser = computed(() => useUserStore().user)
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

onMounted(() => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
})

onBeforeUnmount(() => {
  postsStore.toggleEditPost(false)
})

const showPopup = ref<boolean>(false)
const postToDelete = ref<undefined | string>(undefined)

const deletePostHandler = () => {
  if (postToDelete.value) {
    blogStore.deletePost(postToDelete.value)
    showPopup.value = !showPopup.value
  }
}

const toggleShowPopup = (id: any) => {
  if (id) {
    postToDelete.value = id
  }
  showPopup.value = !showPopup.value
}
</script>

<template>
  <Notification v-if="showPopup" @close-modal="toggleShowPopup" @clickBtn="deletePostHandler" />
  <div class="blog-card-wrap">
    <div class="top">
      <h3>All posts</h3>
      <div v-if="authUser" class="toggle-edit">
        <span>Toggle to edit posts</span>
        <input type="checkbox" v-model="editPost" />
      </div>
    </div>
    <template v-if="blogStore.blog.blogPosts.length">
      <BlogListItem
        :post="post"
        v-for="(post, index) in blogPostsCards"
        :key="index"
        @delete="toggleShowPopup"
      />
    </template>
    <Loader v-else />
  </div>
</template>

<style lang="scss" scoped>
$dark-color: #232536;
$dark-light-color: #474961;

.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  padding-bottom: 32px;
  border-bottom: 1px solid #6d6e76;

  h3 {
    font-weight: bold;
    font-size: 24px;
  }

  .toggle-edit {
    display: flex;
    align-items: center;

    span {
      margin-right: 16px;
      cursor: pointer;
    }

    input[type='checkbox'] {
      cursor: pointer;
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
      background: $dark-light-color;
      transform: scale(1.1);
      transition: 750ms ease all;
      box-shadow:
        0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }

    input:checked[type='checkbox']:before {
      background: $dark-color;
      left: 52px;
    }
  }
}
</style>
