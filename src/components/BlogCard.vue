<script setup lang="ts">
import { computed, defineProps } from 'vue'
import type { IBlogPost } from '../types'
import IconArrowRight from '../components/icons/IconArrorRight.vue'
import IconEdit from './icons/IconEdit.vue'
import IconDelete from './icons/IconDelete.vue'
import BlogDetails from './BlogDetails.vue'
import { usePostsStore } from '../stores/PostsStore'
import { useBlogStore } from '../stores/BlogStore'
import { useRouter } from 'vue-router'

const postsStore = usePostsStore()
const blogStore = useBlogStore()

const router = useRouter()

const props = defineProps<{
  post: IBlogPost
}>()

const editPost = computed(() => {
  return postsStore.editPost
})

const deletePostHandler = () => {
  blogStore.deletePost(props.post.blogId)
}
const editPostHandler = () => {
  router.push({ name: 'edit-post', params: { postId: props.post.blogId } })
}
const goToPost = () => {
  router.push({ name: 'view-post', params: { postId: props.post.blogId } })
}
</script>

<template>
  <div class="blog-card" @click="goToPost">
    <div v-show="editPost" class="icons">
      <div @click.stop="editPostHandler" class="icon">
        <IconEdit class="edit" />
      </div>
      <div @click.stop="deletePostHandler" class="icon">
        <IconDelete class="delete" />
      </div>
    </div>
    <div class="img_container"><img :src="post.blogCoverPhoto" alt="photo" /></div>
    <div class="info">
      <h4>{{ post.blogTitle }}</h4>
      <BlogDetails
        :date="post.date"
        :initials="post.authorInitials"
        :firstName="post.authorFirstName"
        :lastName="post.authorLastName"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
$light-gray-color: #f4f0f8;
$dark-color: #232536;

.blog-card {
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  border-radius: 13px;
  background-color: $light-gray-color;
  min-height: 400px;
  transition: 0.5s ease all;

  &:hover {
    transform: rotateZ(-1deg) scale(1.01);
    box-shadow:
      0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  .icons {
    display: flex;
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 99;

    .icon {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 35px;
      height: 35px;
      border-radius: 50%;
      background-color: #fff;
      transition: 0.5s ease all;

      &:hover {
        // background-color: #303030;
        transform: scale(1.2);
        border: 0.6px solid #303030;

        // .edit,
        // .delete {
        //   svg {
        //     path {
        //       fill: #fff;
        //     }
        //   }
        // }
      }

      &:nth-child(1) {
        margin-right: 8px;
      }

      .edit,
      .delete {
        pointer-events: none;
        height: 15px;
        width: auto;
      }
    }
  }

  .img_container {
    z-index: 1;
    display: flex;
    padding-top: 10px;
    justify-content: center;
    img {
      display: block;
      border-radius: 8px;
      width: 90%;
      min-height: 200px;
      object-fit: cover;
    }
  }

  .info {
    display: flex;
    flex-direction: column;
    height: 100%;
    z-index: 3;
    padding: 32px 16px;
    color: #000;

    h4 {
      padding-bottom: 8px;
      font-size: 20px;
      font-weight: 500;
      flex-grow: 1;
    }

    h6 {
      font-weight: 400;
      font-size: 12px;
      padding-bottom: 10px;
    }

    // .details {
    //   display: flex;
    //   gap: 11px;
    //   > div:first-child {
    //     cursor: pointer;
    //     display: flex;
    //     align-items: center;
    //     justify-content: center;
    //     width: 40px;
    //     height: 40px;
    //     border-radius: 50%;
    //     color: #fff;
    //     background-color: $dark-color;
    //     span {
    //       pointer-events: none;
    //     }
    //   }
    //   > div:last-child {
    //     display: flex;
    //     flex-direction: column;
    //     > span:first-child {
    //       font-size: 16px;
    //       font-weight: 500;
    //     }
    //     > span:last-child {
    //       font-size: 13px;
    //     }
    //   }
    // }

    .link {
      display: inline-flex;
      align-items: center;
      margin-top: auto;
      font-weight: 500;
      padding-top: 20px;
      font-size: 12px;
      padding-bottom: 4px;
      transition: 0.5s ease-in all;

      &:hover {
        color: rgba(48, 48, 48, 0.8);
      }

      .arrow {
        width: 10px;
      }
    }
  }
}
</style>
