import type { IBlog } from '../types'
import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import { db } from '../firebase/firebaseInit'
import { doc, getDoc, getDocs, collection, query, orderBy } from 'firebase/firestore'

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

  function cleanCreatePost() {
    blog.blogHTML = 'Write your blog title here...'
    blog.blogTitle = ''
    blog.blogPhotoFileURL = undefined
    blog.blogPhotoName = ''
  }

  async function getPostsFromDb() {
    const querySnapshot = await getDocs(collection(db, 'posts'))
    querySnapshot.forEach((doc) => {
      if (!blog.blogPosts.some((post) => post.blogId === doc.id)) {
        const data = {
          blogId: doc.data().blogId,
          blogHTML: doc.data().blogHTML,
          blogCoverPhoto: doc.data().blogCoverPhoto,
          blogTitle: doc.data().blogTitle,
          date: doc.data().date,
          blogCoverPhotoName: doc.data().blogCoverPhotoName
        }
        blog.blogPosts.push(data)
      }
      postLoaded.value = true
    })
  }

  return {
    blog,
    postLoaded,
    uploadFile,
    getPostsFromDb,
    cleanCreatePost
  }
})
