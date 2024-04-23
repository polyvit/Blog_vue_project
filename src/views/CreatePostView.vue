<script setup lang="ts">
//@ts-ignore
import { VueEditor, Quill } from 'vue3-editor'
//@ts-ignore
window.Quill = Quill
//@ts-ignore
import ImageResize from 'quill-image-resize-module--fix-imports-error'
import { computed, reactive, ref } from 'vue'
import Loader from '../components/Loader.vue'
import PhotoPreview from '../components/PhotoPreview.vue'
import { useBlogStore } from '../stores/BlogStore'
import { useUserStore } from '../stores/UserStore'

const editorSettings = reactive({
  editorSettings: {
    modules: {
      imageResize: {}
    }
  }
})
Quill.register('modules/imageResize', ImageResize)

const blogStore = useBlogStore()
const userStore = useUserStore()

const file = ref(null)
const blogPhoto = ref<HTMLInputElement | null>(null)

const blogTitle = computed({
  get() {
    return blogStore.blog.blogTitle
  },
  set(newValue) {
    blogStore.blog.blogTitle = newValue
  }
})
const blogHTML = computed({
  get() {
    return blogStore.blog.blogHTML
  },
  set(newValue) {
    blogStore.blog.blogHTML = newValue
  }
})
const blogCoverPhotoName = computed(() => {
  return blogStore.blog.blogPhotoName
})
const profileId = computed(() => {
  return userStore.profile.profileId
})

const uploadFileHandler = () => {
  if (blogPhoto.value && blogPhoto.value.files) {
    blogStore.uploadFile(blogPhoto.value.files[0])
  }
}
const togglePhotoPreview = () => {
  blogStore.blog.blogPhotoPreview = !blogStore.blog.blogPhotoPreview
}
</script>

<template>
  <div class="create-post">
    <PhotoPreview v-show="blogStore.blog.blogPhotoPreview" @close-modal="togglePhotoPreview" />
    <Loader v-show="false" />
    <div class="container">
      <div class="err-message">
        <p><span>Error:</span>ErrorMsg</p>
      </div>
      <div class="blog-info">
        <input type="text" placeholder="Enter Blog Title" v-model="blogTitle" />
        <div class="upload-file">
          <label for="blog-photo">Upload Cover Photo</label>
          <input
            @change="uploadFileHandler"
            ref="blogPhoto"
            type="file"
            id="blog-photo"
            accept=".png, .jpg, .jpeg"
          />
          <button
            @click="togglePhotoPreview"
            class="preview"
            :class="{ 'button-inactive': !blogStore.blog.blogPhotoFileURL }"
          >
            Preview Photo
          </button>
          <span>File Chosen: {{ blogCoverPhotoName }}</span>
        </div>
      </div>
      <div class="editor">
        <VueEditor v-model="blogHTML" :editorOptions="editorSettings" useCustomImageHandler />
      </div>
      <div class="actions">
        <button>Publish</button>
        <RouterLink to="#" class="router-button">Post Preview</RouterLink>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.create-post {
  position: relative;
  height: 100%;

  button {
    margin-top: 0;
  }

  .router-button {
    text-decoration: none;
    color: #fff;
  }

  label,
  button,
  .router-button {
    transition: 0.5s ease-in-out all;
    align-self: center;
    font-size: 14px;
    cursor: pointer;
    border-radius: 20px;
    padding: 12px 24px;
    color: #fff;
    background-color: #303030;
    text-decoration: none;

    &:hover {
      background-color: rgba(48, 48, 48, 0.7);
    }
  }

  .container {
    position: relative;
    height: 100%;
    padding: 10px 25px 60px;
  }

  .invisible {
    opacity: 0 !important;
  }

  .err-message {
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    color: #fff;
    margin-bottom: 10px;
    background-color: #303030;
    opacity: 1;
    transition: 0.5s ease all;

    p {
      font-size: 14px;
    }

    span {
      font-weight: 600;
    }
  }

  .blog-info {
    display: flex;
    margin-bottom: 32px;

    input:nth-child(1) {
      min-width: 300px;
    }

    input {
      transition: 0.5s ease-in-out all;
      padding: 10px 4px;
      border: none;
      border-bottom: 1px solid #303030;

      &:focus {
        outline: none;
        box-shadow: 0 1px 0 0 #303030;
      }
    }

    .upload-file {
      flex: 1;
      margin-left: 16px;
      position: relative;
      display: flex;

      input {
        display: none;
      }

      .preview {
        margin-left: 16px;
        text-transform: initial;
      }

      span {
        font-size: 12px;
        margin-left: 16px;
        align-self: center;
      }
    }
  }

  .editor {
    height: 60vh;
    display: flex;
    flex-direction: column;

    .quillWrapper {
      position: relative;
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .ql-container {
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow: scroll;
    }

    .ql-editor {
      padding: 20px 16px 30px;
    }
  }

  .blog-actions {
    margin-top: 32px;

    button {
      margin-right: 16px;
    }
  }
}
</style>
