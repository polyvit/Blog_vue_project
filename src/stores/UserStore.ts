import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { getAuth, type User } from 'firebase/auth'
import { updateDoc, doc, getDoc, DocumentSnapshot } from 'firebase/firestore'
import { db } from '../firebase/firebaseInit'
import type { IProfile } from '../types'

export const useUserStore = defineStore('userStore', () => {
  let user = ref<User | null>(null)
  const profile = reactive<IProfile>({
    profileEmail: null,
    profileFirstName: null,
    profileLastName: null,
    profileUsername: null,
    profileId: null,
    profileInitials: null
  })

  function updateFirstName(value: string) {
    profile.profileFirstName = value
  }
  function updateLastName(value: string) {
    profile.profileLastName = value
  }
  function updateUsername(value: string) {
    profile.profileUsername = value
  }

  function setProfileInfo(data: DocumentSnapshot) {
    profile.profileEmail = data.data()?.email
    profile.profileFirstName = data.data()?.firstName
    profile.profileLastName = data.data()?.lastName
    profile.profileUsername = data.data()?.username
    profile.profileId = data.id
  }
  function setProfileInitials() {
    profile.profileInitials =
      // @ts-ignore
      profile.profileFirstName.match(/(\b\S)?/g).join('') +
      // @ts-ignore
      profile.profileLastName.match(/(\b\S)?/g).join('')
  }

  function updateUser(newUser: User) {
    user.value = newUser
  }

  async function getCurrentUser() {
    const auth = getAuth()
    if (!auth.currentUser) return
    const dataBase = doc(db, 'users', auth.currentUser.uid)
    const dbResults = await getDoc(dataBase)
    if (dbResults.exists()) {
      setProfileInfo(dbResults)
      setProfileInitials()
    } else {
    }
  }
  async function updateUserProfile() {
    await updateDoc(doc(db, 'users', profile.profileId as string), {
      firstName: profile.profileFirstName,
      lastName: profile.profileLastName,
      username: profile.profileUsername
    })
    setProfileInitials()
  }

  return {
    getCurrentUser,
    updateUser,
    profile,
    user,
    updateFirstName,
    updateLastName,
    updateUsername,
    updateUserProfile
  }
})
