import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import type { IBlogCard } from '@/types'

export const usePostsStore = defineStore('postsStore', () => {
  const sampleBlogCards: IBlogCard[] = reactive([
    {
      blogTitle: 'Blog Card #1',
      blogCoverPhoto: 'stock-1',
      blogDate: 'May 1, 2021'
    },
    {
      blogTitle: 'Blog Card #2',
      blogCoverPhoto: 'stock-2',
      blogDate: 'May 1, 2021'
    },
    {
      blogTitle: 'Blog Card #3',
      blogCoverPhoto: 'stock-3',
      blogDate: 'May 1, 2021'
    },
    {
      blogTitle: 'Blog Card #4',
      blogCoverPhoto: 'stock-4',
      blogDate: 'May 1, 2021'
    }
  ])
  const editPost = ref<boolean | null>(null)

  function toggleEditPost(payload: boolean | null) {
    editPost.value = payload
  }

  return { sampleBlogCards, editPost, toggleEditPost }
})
