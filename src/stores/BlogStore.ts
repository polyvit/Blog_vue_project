import type { IBlog } from '../types'
import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'

export const useBlogStore = defineStore('blogStore', () => {
  const blog = reactive<IBlog>({
    blogPosts: [],
    blogHTML: 'Write your blog title here...',
    blogTitle: '',
    blogPhotoName: '',
    blogPhotoFileURL: undefined,
    blogPhotoPreview: null
  })

  const postLoaded = ref<boolean | null>(null)

  function uploadFile(file: File) {
    blog.blogPhotoName = file.name
    blog.blogPhotoFileURL = URL.createObjectURL(file)
  }

  return {
    blog,
    postLoaded,
    uploadFile
  }
})
