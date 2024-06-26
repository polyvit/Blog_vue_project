<script setup lang="ts">
import { VueEditor, Quill } from 'vue3-editor'
//@ts-ignore
window.Quill = Quill
//@ts-ignore
// import ImageResize from 'quill-image-resize-module--fix-imports-error'
import QuillResizeImage from 'quill-resize-image'
//@ts-ignore
window.QuillResizeImage = QuillResizeImage
import { computed, reactive, ref, defineProps } from 'vue'
import { getStorage, ref as firebaseRef, uploadBytes, getDownloadURL } from 'firebase/storage'
import { doc, setDoc, collection, updateDoc } from 'firebase/firestore'
import Loader from '../components/Loader.vue'
import PhotoPreview from '../components/PhotoPreview.vue'
import { useBlogStore } from '../stores/BlogStore'
import { useUserStore } from '../stores/UserStore'
import { db } from '../firebase/firebaseInit'
import { useRouter } from 'vue-router'

const editorSettings = reactive({
  editorSettings: {
    modules: {
      // ImageResize: {}
      resize: {
        locale: {}
      }
    }
  }
})

// Quill.register('modules/imageResize', ImageResize)
Quill.register('modules/resize', window.QuillResizeImage)

const props = defineProps<{
  routeId?: string
  editing?: boolean
}>()

const router = useRouter()

const blogStore = useBlogStore()
const userStore = useUserStore()

const inputFile = ref<File | null>(null)
const blogPhoto = ref<HTMLInputElement | null>(null)
const error = ref<boolean | null>(null)
const errorMsg = ref<string>('')
const loading = ref<boolean>(false)

const coverPhoto = computed(() => {
  return inputFile.value ?? blogStore.coverPhotoFile
})
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
const isCoverPhotoNeeded = computed(() => {
  return props.editing ? true : coverPhoto.value
})

const showError = (errorText: string) => {
  error.value = true
  errorMsg.value = errorText
  setTimeout(() => (error.value = false), 3000)
}
const uploadFileHandler = () => {
  if (blogPhoto.value && blogPhoto.value.files) {
    inputFile.value = blogPhoto.value.files[0]
    blogStore.uploadFile(blogPhoto.value.files[0])
  }
}
const togglePhotoPreview = () => {
  blogStore.blog.blogPhotoPreview = !blogStore.blog.blogPhotoPreview
}
const imageAddedHandler = (
  file: File,
  Editor: typeof Quill,
  cursorLocation: number,
  resetUploader: () => void
) => {
  const storage = getStorage()
  const docRef = firebaseRef(storage, `documents/blogPostPhotos/${file.name}`)
  uploadBytes(docRef, file).then(() => {
    getDownloadURL(docRef).then((url) => {
      Editor.insertEmbed(cursorLocation, 'image', url)
      resetUploader()
    })
  })
}
const publishPost = () => {
  if (blogTitle.value.length !== 0 && blogHTML.value.length !== 0) {
    if (coverPhoto.value) {
      loading.value = true
      const storage = getStorage()
      const docRef = firebaseRef(
        storage,
        `documents/blogCoverPhotos/${blogStore.blog.blogPhotoName}`
      )
      uploadBytes(docRef, coverPhoto.value)
        .then(() => {
          getDownloadURL(docRef).then(async (url) => {
            const timestamp = Date.now()
            const database = doc(collection(db, 'posts'))
            await setDoc(database, {
              blogId: database.id,
              blogHTML: blogHTML.value,
              blogCoverPhoto: url,
              blogCoverPhotoName: blogCoverPhotoName.value,
              blogTitle: blogTitle.value,
              profileId: profileId.value,
              authorFirstName: userStore.profile.profileFirstName,
              authorLastName: userStore.profile.profileLastName,
              authorInitials: userStore.profile.profileInitials,
              date: timestamp
            })
            loading.value = false
            await blogStore.getPostsFromDb()
            blogStore.resetData()
            router.push({ name: 'view-post', params: { postId: database.id } })
          })
        })
        .catch(() => (loading.value = false))
      return
    }
    showError("Make sure you've uploaded cover photo")
    return
  }
  showError("The title and main content can't be empty")
}
const editPost = async () => {
  const database = doc(collection(db, 'posts'), props.routeId)
  if (blogTitle.value.length !== 0 && blogHTML.value.length !== 0) {
    if (coverPhoto.value) {
      loading.value = true
      const storage = getStorage()
      const docRef = firebaseRef(
        storage,
        `documents/blogCoverPhotos/${blogStore.blog.blogPhotoName}`
      )
      uploadBytes(docRef, coverPhoto.value)
        .then(() => {
          getDownloadURL(docRef).then(async (url) => {
            await updateDoc(database, {
              blogHTML: blogHTML.value,
              blogCoverPhoto: url,
              blogCoverPhotoName: blogCoverPhotoName.value,
              blogTitle: blogTitle.value
            })
            await blogStore.updatePost(props.routeId as string)
            loading.value = false
            router.push({ name: 'view-post', params: { postId: database.id } })
          })
        })
        .catch(() => (loading.value = false))
      return
    }
    loading.value = true
    await updateDoc(database, {
      blogHTML: blogHTML.value,
      blogTitle: blogTitle.value
    })
    await blogStore.updatePost(props.routeId as string)
    loading.value = false
    blogStore.resetData()
    router.push({ name: 'view-post', params: { postId: database.id } })
    return
  }
  showError("The title and main content can't be empty")
  return
}
</script>

<template>
  <div class="create-post">
    <PhotoPreview
      v-show="blogStore.blog.blogPhotoPreview && coverPhoto"
      @close-modal="togglePhotoPreview"
    />
    <Loader v-show="loading" />
    <div class="container">
      <div class="err-message" v-show="error">
        <p><span>Error:</span>{{ errorMsg }}</p>
      </div>
      <div class="blog-info">
        <input type="text" placeholder="Enter Blog Title" v-model="blogTitle" />
        <div class="upload-file">
          <label v-if="props.editing" for="blog-photo">Update Cover Photo</label>
          <label v-else for="blog-photo">Upload Cover Photo</label>
          <input
            @change="uploadFileHandler"
            ref="blogPhoto"
            type="file"
            id="blog-photo"
            accept=".png, .jpg, .jpeg"
          />
          <button
            v-show="coverPhoto"
            @click="togglePhotoPreview"
            class="preview"
            :class="{ 'button-inactive': !blogStore.blog.blogPhotoFileURL || !coverPhoto }"
          >
            Preview Photo
          </button>
          <span v-show="blogStore.blog.blogPhotoFileURL && coverPhoto"
            >File Chosen: {{ blogCoverPhotoName }}</span
          >
        </div>
      </div>
      <div class="editor">
        <VueEditor
          v-model="blogHTML"
          :editorOptions="editorSettings"
          useCustomImageHandler
          @image-added="imageAddedHandler"
        />
      </div>
      <div class="actions">
        <button v-if="editing" @click="editPost">Edit</button>
        <button v-else @click="publishPost">Publish</button>
        <RouterLink
          v-if="isCoverPhotoNeeded && blogTitle.length"
          :to="{
            name: 'preview',
            query: {
              mode: `${props.editing ? 'edit' : 'create'}`,
              ...(props.routeId && { routeId: `${props.routeId}` })
            }
          }"
          class="router-button"
          >Post Preview</RouterLink
        >
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
    background-color: #232536;
    text-decoration: none;

    @media (max-width: 913px) {
      padding: 12px 18px;
      font-size: 12px;
    }

    @media (max-width: 598px) {
      font-size: 10px;
    }

    &:hover {
      background-color: #474961;
    }
  }

  .container {
    position: relative;
    height: 100%;
    padding: 50px;
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
    flex-wrap: wrap;
    gap: 16px;
    @media (max-width: 390px) {
      flex-direction: column;
    }

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
      position: relative;
      display: flex;

      @media (max-width: 500px) {
        flex-wrap: wrap;
        gap: 8px;
      }

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
    height: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;

    .quillWrapper {
      position: relative;
      display: flex;
      flex-direction: column;
    }

    .ql-container {
      display: flex;
      flex-direction: column;
      overflow: scroll;
    }

    .ql-editor {
      padding: 20px 16px 30px;
    }
  }

  .actions {
    @media (max-width: 380px) {
      display: flex;
      flex-direction: column;
    }
    button {
      margin-right: 16px;
    }
  }
}
</style>
