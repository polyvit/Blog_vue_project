<script setup lang="ts">
import IconMenuBurger from './icons/IconMenuBurger.vue'
import ProfileMenu from './ProfileMenu.vue'
import Button from '../kit/Button.vue'
import { computed, ref } from 'vue'
import { onMounted } from 'vue'
import { useUserStore } from '../stores/UserStore'

const authUser = computed(() => useUserStore().user)

const mobile = ref<null | boolean>(null)
const mobileNav = ref<null | boolean>(null)
const windowWidth = ref<null | number>(null)

const checkScreen = () => {
  windowWidth.value = window.innerWidth
  if (windowWidth.value <= 750) {
    mobile.value = true
    return
  }
  mobile.value = false
  mobileNav.value = false
  return
}

const toggleMobileNav = () => {
  mobileNav.value = !mobileNav.value
}

onMounted(() => {
  window.addEventListener('resize', checkScreen)
  checkScreen()
})
</script>

<template>
  <header>
    <nav class="container">
      <div class="branding">
        <RouterLink class="header" :to="{ name: 'home' }">DishonestBlog</RouterLink>
      </div>
      <div class="nav-links">
        <ul v-show="!mobile">
          <RouterLink class="link" :to="{ name: 'home' }">Home</RouterLink>
          <RouterLink class="link" :to="{ name: 'blogs' }">Blogs</RouterLink>
          <RouterLink v-if="authUser" class="link" :to="{ name: 'create-post' }"
            >Create Post</RouterLink
          >
          <RouterLink v-if="!authUser" class="link" :to="{ name: 'login' }"
            >Login/Register</RouterLink
          >
          <Button v-if="!authUser" color="white">
            <RouterLink class="btn_link" :to="{ name: 'login' }">Login/Register</RouterLink>
          </Button>
        </ul>
        <ProfileMenu v-if="authUser" />
        <IconMenuBurger @click="toggleMobileNav" class="menu-icon" v-show="mobile" />
      </div>
    </nav>
    <!-- Mobile menu starts -->
    <transition name="mobile-nav" class="mobile-nav">
      <ul v-show="mobileNav">
        <RouterLink class="link" :to="{ name: 'home' }">Home</RouterLink>
        <RouterLink class="link" :to="{ name: 'blogs' }">Blogs</RouterLink>
        <RouterLink v-if="authUser" class="link" :to="{ name: 'create-post' }"
          >Create Post</RouterLink
        >
        <RouterLink v-if="!authUser" class="link" :to="{ name: 'login' }"
          >Log in/Register</RouterLink
        >
        <Button v-if="!authUser" color="white">
          <RouterLink class="btn_link" :to="{ name: 'login' }">Login/Register</RouterLink>
        </Button>
      </ul>
    </transition>
  </header>
</template>

<style lang="scss" scoped>
$dark-color: #232536;
$white-color: white;
$pink-button: #ff5959;
$black-color: black;

header {
  background-color: $dark-color;
  padding: 0 25px;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  z-index: 99;

  .link {
    font-weight: 500;
    padding: 0 8px;
    transition: 0.3s color ease;
    color: $white-color;

    &:hover {
      color: $pink-button;
    }
    &:visited {
      color: $white-color;
    }
  }
  .btn_link {
    color: $black-color;
    text-decoration: none;
    &:visited {
      color: $black-color;
    }
  }

  nav {
    display: flex;
    padding: 25px 0;

    .branding {
      display: flex;
      align-items: center;

      .header {
        font-weight: 300;
        font-size: 24px;
        text-decoration: none;
        color: $white-color;
      }
    }
    .nav-links {
      position: relative;
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: flex-end;

      ul {
        margin-right: 32px;
        .link:not(:last-child) {
          margin-right: 32px;
        }
      }
    }
  }

  .menu-icon {
    cursor: pointer;
    margin-left: 20px;
    height: 25px;
    width: auto;
  }

  .mobile-nav {
    padding: 20px;
    width: 70%;
    max-width: 250px;
    display: flex;
    flex-direction: column;
    position: fixed;
    height: 100%;
    background-color: $dark-color;
    top: 0;
    left: 0;

    .link {
      padding: 15px 0;
      color: $white-color;
    }
  }

  .mobile-nav-enter-active,
  .mobile-nav-leave-active {
    transition: all 1s ease;
  }

  .mobile-nav-enter-from {
    transform: translateX(-250px);
  }

  .mobile-nav-enter-to {
    transform: translateX(0);
  }
  .mobile-nav-leave-to {
    transform: translateX(-250px);
  }
}
</style>
