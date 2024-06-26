<script setup lang="ts">
import Modal from '../components/Modal.vue'
import Button from '../kit/Button.vue'
import { computed, ref } from 'vue'
import { useUserStore } from '../stores/UserStore'
import IconAdmin from '../components/icons/IconAdmin.vue'

const userStore = useUserStore()

const modalMessage = ref<string>('Changes were saved')
const modalActive = ref<boolean>(false)

const closeModal = () => {
  modalActive.value = !modalActive.value
}
const updateProfile = () => {
  userStore.updateUserProfile()
  modalActive.value = !modalActive.value
}

const email = computed(() => {
  return userStore.profile.profileEmail
})
const firstName = computed({
  get() {
    return userStore.profile.profileFirstName
  },
  set(newValue) {
    userStore.updateFirstName(newValue as string)
  }
})
const lastName = computed({
  get() {
    return userStore.profile.profileLastName
  },
  set(newValue) {
    userStore.updateLastName(newValue as string)
  }
})
const username = computed({
  get() {
    return userStore.profile.profileUsername
  },
  set(newValue) {
    userStore.updateUsername(newValue as string)
  }
})
</script>

<template>
  <div class="profile">
    <Modal :modalMessage="modalMessage" v-if="modalActive" @close-modal="closeModal" />
    <div class="container">
      <h2>Account Settings</h2>
      <div class="profile-info">
        <div class="initials">{{ userStore.profile.profileInitials }}</div>
        <div class="admin-badge">
          <IconAdmin class="icon" />
          <span>admin</span>
        </div>
        <div class="input">
          <label for="firstName">First Name:</label>
          <input type="text" id="firstName" v-model="firstName" />
        </div>
        <div class="input">
          <label for="lastName">Last Name:</label>
          <input type="text" id="lastName" v-model="lastName" />
        </div>
        <div class="input">
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="username" />
        </div>
        <div class="input">
          <label for="email">Email:</label>
          <input disabled type="text" id="email" v-model="email" />
        </div>
        <Button @click="updateProfile">Save Changes</Button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.profile {
  position: relative;
  .container {
    max-width: 1000px;
    padding: 60px 25px;

    h2 {
      text-align: center;
      margin-bottom: 16px;
      font-weight: 300;
      font-size: 32px;
    }

    .profile-info {
      border-radius: 8px;
      box-shadow:
        0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
      padding: 32px;
      background-color: #f1f1f1;
      display: flex;
      flex-direction: column;
      max-width: 600px;
      margin: 32px auto;

      .initials {
        position: initial;
        width: 80px;
        height: 80px;
        font-size: 32px;
        background-color: $dark-light-color;
        color: #fff;
        display: flex;
        align-self: center;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
      }

      .admin-badge {
        display: flex;
        align-self: center;
        color: #fff;
        font-size: 14px;
        padding: 8px 24px;
        border-radius: 8px;
        background-color: $dark-light-color;
        margin: 16px 0;
        text-align: center;
        text-transform: capitalize;

        .icon {
          width: 14px;
          height: auto;
          margin-right: 8px;
        }
      }

      .input {
        margin: 16px 0;

        label {
          font-size: 14px;
          display: block;
          padding-bottom: 6px;
        }
        input {
          width: 100%;
          border: none;
          background-color: #f2f7f6;
          padding: 8px;
          height: 50px;
          @media (min-width: 900px) {
          }

          &:focus {
            outline: none;
          }
        }
      }

      button {
        align-self: center;
      }
    }
  }
}
</style>
