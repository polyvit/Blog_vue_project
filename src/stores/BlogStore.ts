import type { IBlog, IBlogPost } from '../types'
import { defineStore } from 'pinia'
import { ref, reactive, computed } from 'vue'
import { db } from '../firebase/firebaseInit'
import { doc, deleteDoc, getDocs, collection, query, orderBy } from 'firebase/firestore'

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
  const coverPhotoFile = ref<File | null>(null)

  function resetData() {
    coverPhotoFile.value = null
    blog.blogPhotoName = ''
    blog.blogPhotoFileURL = undefined
    blog.blogHTML = 'Write your blog title here...'
    blog.blogTitle = ''
  }

  function uploadFile(file: File) {
    blog.blogPhotoName = file.name
    blog.blogPhotoFileURL = URL.createObjectURL(file)
    coverPhotoFile.value = file
  }

  function cleanCreatePost() {
    blog.blogHTML = 'Write your blog title here...'
    blog.blogTitle = ''
    blog.blogPhotoFileURL = undefined
    blog.blogPhotoName = ''
  }

  function setBlogState(post: IBlogPost) {
    blog.blogTitle = post?.blogTitle
    blog.blogHTML = post?.blogHTML
    blog.blogPhotoFileURL = post?.blogCoverPhoto
    blog.blogPhotoName = post?.blogCoverPhotoName
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
          authorInitials: doc.data().authorInitials,
          authorFirstName: doc.data().authorFirstName,
          authorLastName: doc.data().authorLastName,
          blogCoverPhotoName: doc.data().blogCoverPhotoName
        }
        blog.blogPosts.push(data)
      }
      postLoaded.value = true
    })
  }

  async function deletePost(id: string) {
    await deleteDoc(doc(db, 'posts', id))
    blog.blogPosts = blog.blogPosts.filter((post) => post.blogId !== id)
  }

  async function updatePost(id: string) {
    blog.blogPosts = blog.blogPosts.filter((post) => post.blogId !== id)
    await getPostsFromDb()
  }

  return {
    blog,
    postLoaded,
    uploadFile,
    getPostsFromDb,
    cleanCreatePost,
    deletePost,
    setBlogState,
    updatePost,
    coverPhotoFile,
    resetData
  }
})
