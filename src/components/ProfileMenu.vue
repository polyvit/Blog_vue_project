<script setup lang="ts">
import IconSignOut from './icons/IconSignOut.vue'
import IconUserLight from './icons/IconUserLight.vue'
import IconAdmin from './icons/IconAdmin.vue'
import { ref } from 'vue'
import { useUserStore } from '../stores/UserStore'
import { getAuth, signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

const showProfileMenu = ref<boolean>(false)

const toggleProfileMenu = () => {
  showProfileMenu.value = !showProfileMenu.value
}

const signOutHandler = () => {
  const auth = getAuth()
  signOut(auth).then(() => {
    router.push({ name: 'login' })
  })
}
</script>

<template>
  <div @click="toggleProfileMenu" class="profile">
    <span>{{ userStore.profile.profileInitials }}</span>
    <div v-show="showProfileMenu" class="profile-menu">
      <div class="info">
        <p class="initials">{{ userStore.profile.profileInitials }}</p>
        <div class="right">
          <p>{{ userStore.profile.profileFirstName }} {{ userStore.profile.profileLastName }}</p>
          <p>@{{ userStore.profile.profileUsername }}</p>
          <p>{{ userStore.profile.profileEmail }}</p>
        </div>
      </div>
      <div class="options">
        <div class="option">
          <RouterLink class="option" :to="{ name: 'profile' }">
            <IconUserLight class="icon" />
            <p>Profile</p>
          </RouterLink>
        </div>
        <div @click="signOutHandler" class="option">
          <IconSignOut class="icon" />
          <p>Sign Out</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$dark-light-color: #474961;
.profile {
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: #fff;
  background-color: $dark-light-color;

  span {
    pointer-events: none;
  }

  .profile-menu {
    position: absolute;
    top: 60px;
    right: 0;
    width: 250px;
    background-color: $dark-light-color;
    box-shadow:
      0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);

    .info {
      display: flex;
      align-items: center;
      padding: 15px;
      border-bottom: 1px solid #fff;

      .initials {
        position: initial;
        width: 40px;
        height: 40px;
        background-color: #fff;
        color: #303030;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
      }

      .right {
        flex: 1;
        margin-left: 24px;

        p {
          color: #fff;
        }

        p:nth-child(1) {
          font-size: 14px;
        }

        p:nth-child(2),
        p:nth-child(3) {
          font-size: 12px;
        }
      }
    }

    .options {
      padding: 15px;
      .option {
        text-decoration: none;
        color: #fff;
        display: flex;
        align-items: center;
        margin-bottom: 12px;

        .icon {
          width: 18px;
          height: auto;
        }
        p {
          font-size: 14px;
          margin-left: 12px;
        }

        &:last-child {
          margin-bottom: 0px;
        }
      }
    }
  }
}
</style>
