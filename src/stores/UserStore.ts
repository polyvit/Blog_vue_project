import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'
import { getAuth } from 'firebase/auth'
import { updateDoc, doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase/firebaseInit'
import type { IProfile } from '../types'

export const useUserStore = defineStore('userStore', () => {
  let user = ref(null)
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

  // @ts-ignore
  function setProfileInfo(data) {
    profile.profileEmail = data.data().email
    profile.profileFirstName = data.data().firstName
    profile.profileLastName = data.data().lastName
    profile.profileUsername = data.data().username
    profile.profileId = data.id
  }
  function setProfileInitials() {
    profile.profileInitials =
      // @ts-ignore
      profile.profileFirstName.match(/(\b\S)?/g).join('') +
      // @ts-ignore
      profile.profileLastName.match(/(\b\S)?/g).join('')
  }
  // @ts-ignore
  function updateUser(newUser) {
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
